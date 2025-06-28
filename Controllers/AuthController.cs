using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

using DatabaseModels;
using DatabaseModels.Models;
using Utilities;

namespace Controllers;

public class RegisterInput
{
  public string? HoTen { get; set; }
  public GioiTinh? GioiTinh { get; set; }
  public DateTime NgaySinh { get; set; }
  public string? SoDienThoai { get; set; }
  public string? Email { get; set; }
  public string? MatKhau { get; set; }
  public LoaiNguoiDung? LoaiNguoiDung { get; set; }
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
public class AuthController(AppDbContext context, IConfiguration configuration) : ControllerBase
{
  readonly AppDbContext context = context;
  readonly IConfiguration configuration = configuration;

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
    NguoiDung nguoiDung = await CheckLoginInput(input, input.LoaiNguoiDung);
    if (!AuthUtilities.CheckingPassword(nguoiDung.MatKhau!, input.MatKhau!)) return Unauthorized(new
    {
      Message = "Không hợp lệ!",
      Success = false,
      Data = "",
    });
    Console.WriteLine($"{configuration["Jwt:Key"]}");
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

  [HttpPost("dang-ky")]
  public async Task<IActionResult> RegisterAsync([FromBody] RegisterInput input)
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

    try
    {
      await context.NguoiDung.AddAsync(nguoiDung);
      await context.SaveChangesAsync();
    }
    catch (Exception)
    {
      throw;
    }
    return Ok(new
    {
      Message = "Tạo tài khoản thành công!",
      Success = true
    });
  }
}

