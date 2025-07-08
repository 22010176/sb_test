using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

using DatabaseModels;
using DatabaseModels.Models;
using Utilities;
using MailServices;
using Microsoft.AspNetCore.Authorization;

namespace TeacherControllers;

public record RegisterInput
{
  public string? HoTen { get; set; }
  public GioiTinh? GioiTinh { get; set; }
  public DateTime NgaySinh { get; set; }
  public string? SoDienThoai { get; set; }
  public string? Email { get; set; }
  public string? MatKhau { get; set; }
  public LoaiNguoiDung? LoaiNguoiDung { get; set; }
}

public record UpdateProfileInput
{
  public string? HoTen { get; set; }
  public GioiTinh? GioiTinh { get; set; }
  public DateTime NgaySinh { get; set; }
  public string? SoDienThoai { get; set; }
  public string? Email { get; set; }
}

public record LoginInput
{
  public LoaiNguoiDung LoaiNguoiDung { get; set; }
  public string? Email { get; set; }
  public string? SoDienThoai { get; set; }
  public string? MatKhau { get; set; }
}

[ApiController]
[Route("api/[controller]")]
public class AuthController(AppDbContext context, IConfiguration configuration, IEmailSender emailSender) : ControllerBase
{
  readonly AppDbContext context = context;
  readonly IConfiguration configuration = configuration;
  readonly IEmailSender emailSender = emailSender;

  async Task<NguoiDung> CheckLoginInput(LoginInput input, LoaiNguoiDung loaiNguoiDung)
  {
    if (string.IsNullOrEmpty(input.MatKhau)) throw new Exception("Mật khẩu không được để trống!");
    bool isEmailEmpty = string.IsNullOrEmpty(input.Email);
    bool isSoDienThoaiEmpty = string.IsNullOrEmpty(input.SoDienThoai);
    if (isEmailEmpty && isSoDienThoaiEmpty) throw new Exception("Phải nhập email hoặc số điện thoại!");

    NguoiDung? nguoiDung = await context.NguoiDung.FirstOrDefaultAsync(i => (!isEmailEmpty && i.Email == input.Email) || (!isSoDienThoaiEmpty && i.SoDienThoai == input.SoDienThoai));
    if (nguoiDung == null) throw new Exception("Thông tin cung cấp không hợp lệ!");
    if (nguoiDung.LoaiNguoiDung != loaiNguoiDung) throw new Exception("Loại người dùng không được hỗ trợ!");

    return nguoiDung;
  }

  [HttpPost("dang-nhap")]
  public async Task<IActionResult> LoginAsync(LoginInput input)
  {
    NguoiDung nguoiDung;
    try
    {

      nguoiDung = await CheckLoginInput(input, input.LoaiNguoiDung);
    }
    catch (Exception err)
    {
      return BadRequest(new
      {
        err.Message,
        Success = false,
        Data = ""
      });
    }

    if (!AuthUtilities.CheckingPassword(nguoiDung.MatKhau!, input.MatKhau!))
      return Unauthorized(new
      {
        Message = "Không hợp lệ!",
        Success = false,
        Data = "",
      });

    return Ok(new
    {
      Message = "Đăng nhập thành công!",
      Success = true,
      Data = AuthUtilities.GenerateToken(
        key: configuration["Jwt:Key"]!,
        issuer: configuration["Jwt:Issuer"]!,
        audience: configuration["Jwt:Audience"]!,
        expireTime: int.Parse(configuration["Jwt:ExpireDays"]!),
        claims: [
          new Claim(ClaimTypes.UserData, nguoiDung.Id.ToString()),
          new Claim(ClaimTypes.Role, nguoiDung.LoaiNguoiDung.ToString()!)
        ]
      )
    });
  }

  [HttpPut("sua-tai-khoan")]
  [Authorize]
  public async Task<IActionResult> UpdateProfileAsync([FromBody] UpdateProfileInput input)
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      NguoiDung? nguoiDung = await context.NguoiDung.FirstOrDefaultAsync(i => i.Id == userId);

      if (nguoiDung == null) throw new Exception("Không tìm thấy người dùng!");

      nguoiDung.HoTen = input.HoTen;
      nguoiDung.GioiTinh = input.GioiTinh;
      nguoiDung.NgaySinh = TimeZoneInfo.ConvertTimeToUtc(input.NgaySinh);
      nguoiDung.SoDienThoai = input.SoDienThoai;
      nguoiDung.Email = input.Email;

      await context.SaveChangesAsync();
      return Ok(new
      {
        Message = "Cập nhật thông tin thành công!",
        Success = true,
        Data = new
        {
          nguoiDung.Id,
          nguoiDung.HoTen,
          nguoiDung.GioiTinh,
          nguoiDung.NgaySinh,
          nguoiDung.SoDienThoai,
          nguoiDung.Email,
          nguoiDung.LoaiNguoiDung,
          nguoiDung.ThoiGianTao
        }
      });
    }
    catch (Exception err)
    {
      return BadRequest(new
      {
        err.Message,
        Success = false,
        Data = ""
      });
    }

  }

  [HttpPost("dang-ky")]
  public async Task<IActionResult> RegisterAsync([FromBody] RegisterInput input)
  {
    try
    {
      NguoiDung nguoiDung = new()
      {
        HoTen = input.HoTen,
        GioiTinh = input.GioiTinh,
        NgaySinh = TimeZoneInfo.ConvertTimeToUtc(input.NgaySinh),
        SoDienThoai = input.SoDienThoai,
        Email = input.Email,
        MatKhau = AuthUtilities.PasswordHashing(input.MatKhau!),
        LoaiNguoiDung = input.LoaiNguoiDung,
        ThoiGianTao = DateTime.UtcNow
      };

      // await emailSender.SendEmailAsync(nguoiDung.Email!, "Verify your email",
      //     $"<p>Please confirm your email by <a href=''>clicking here</a>.</p>");
      await context.NguoiDung.AddAsync(nguoiDung);
      await context.SaveChangesAsync();
    }
    catch (Exception err)
    {
      return BadRequest(new
      {
        Message = err,
        Success = false,
        Data = ""
      });
    }
    return Ok(new
    {
      Message = "Tạo tài khoản thành công!",
      Success = true
    });
  }

  [HttpGet("thong-tin-nguoi-dung")]
  [Authorize]
  public async Task<IActionResult> GetProfile()
  {
    string? userId = User.FindFirst(ClaimTypes.UserData)?.Value;
    if (string.IsNullOrEmpty(userId)) return Unauthorized(new
    {
      Message = "Không hợp lệ!",
      Success = false,
      Data = ""
    });

    NguoiDung? nguoiDung = await context.NguoiDung.FirstOrDefaultAsync(i => i.Id.ToString() == userId);
    if (nguoiDung == null) return NotFound(new
    {
      Message = "Không tìm thấy người dùng!",
      Success = false,
      Data = ""
    });

    return Ok(new
    {
      Message = "Lấy thông tin người dùng thành công!",
      Success = true,
      Data = new
      {
        nguoiDung.Id,
        nguoiDung.HoTen,
        nguoiDung.GioiTinh,
        nguoiDung.NgaySinh,
        nguoiDung.SoDienThoai,
        nguoiDung.Email,
        nguoiDung.LoaiNguoiDung,
        nguoiDung.ThoiGianTao
      }
    });
  }
}

