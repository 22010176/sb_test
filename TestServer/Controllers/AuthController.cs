using System.Security.Claims;
using System.Threading.Tasks;
using DatabaseModels;
using DatabaseModels.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Utilities;

namespace TestServer.Controllers;

[ApiController]
[Route("test/[controller]")]
public class AuthController(AppDbContext context, IConfiguration configuration) : ControllerBase
{
  readonly AppDbContext context = context;
  readonly IConfiguration configuration = configuration;

  [HttpGet]
  public async Task<IActionResult> GetAllRecord()
  {
    try
    {
      return Ok(new ResponseFormat
      {
        Data = await context.NguoiDung.ToArrayAsync(),
        Success = true
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Success = false,
        Data = err
      });
    }
  }

  [HttpGet("giang-vien")]
  public async Task<IActionResult> GetGiangVien()
  {
    try
    {
      return Ok(new ResponseFormat
      {
        Data = await context.NguoiDung.Select(i => i.LoaiNguoiDung == LoaiNguoiDung.GIANG_VIEN).ToArrayAsync(),
        Success = true
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Success = false,
        Data = err
      });
    }
  }

  [HttpGet("hoc-sinh")]
  public async Task<IActionResult> GetHocSinh()
  {
    try
    {
      return Ok(new ResponseFormat
      {
        Data = await context.NguoiDung.Where(i => i.LoaiNguoiDung == LoaiNguoiDung.HOC_SINH).Select(i => i).ToArrayAsync(),
        Success = true
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Success = false,
        Data = err
      });
    }
  }

  [HttpDelete]
  public async Task<IActionResult> DeleteAllRecord()
  {
    try
    {
      context.RemoveRange(await context.NguoiDung.ToListAsync());
      await context.SaveChangesAsync();
      return Ok(new ResponseFormat
      {
        Success = true
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Success = false,
        Data = err
      });
    }
  }

  [HttpGet("token")]
  public async Task<IActionResult> GetToken()
  {
    try
    {
      NguoiDung? nguoiDung = await context.NguoiDung.FirstOrDefaultAsync();

      if (nguoiDung == null) throw new Exception("Phải tạo người dùng trước!");

      return Ok(AuthUtilities.GenerateToken(
        key: configuration["Jwt:Key"]!,
        issuer: configuration["Jwt:Issuer"]!,
        audience: configuration["Jwt:Audience"]!,
        expireTime: int.Parse(configuration["Jwt:ExpireDays"]!),
        claims: [
          new Claim(ClaimTypes.UserData, nguoiDung!.Id.ToString()),
          new Claim(ClaimTypes.Role, nguoiDung.LoaiNguoiDung.ToString()!)
      ]));
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Success = false,
        Data = err
      });
    }
  }

  [HttpPost("hoc-sinh")]
  public async Task<IActionResult> GenerateHocSinh(int soLuong)
  {
    try
    {
      Random random = new();
      List<NguoiDung> nguoiDung = [];
      for (int i = 0; i < soLuong; ++i)
      {
        nguoiDung.Add(new()
        {
          HoTen = RandomUtils.GenerateString(random.Next(25)),
          GioiTinh = random.Next(2) == 0 ? GioiTinh.NAM : GioiTinh.NU,
          NgaySinh = TimeZoneInfo.ConvertTimeToUtc(RandomUtils.GenerateDate(new DateTime(1950, 1, 1))),
          SoDienThoai = RandomUtils.GeneratePhoneNumber(),
          Email = RandomUtils.GenerateRandomEmail(),
          LoaiNguoiDung = LoaiNguoiDung.HOC_SINH,
          MatKhau = AuthUtilities.PasswordHashing("a"),
          ThoiGianTao = DateTime.UtcNow
        });
      }
      await context.NguoiDung.AddRangeAsync(nguoiDung);
      await context.SaveChangesAsync();
      return Ok(new ResponseFormat
      {
        Success = true
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Success = false,
        Data = err
      });
    }
  }

  [HttpPost("giang-vien")]
  public async Task<IActionResult> GenerateGiangVien(int soLuong)
  {
    try
    {
      Random random = new();
      List<NguoiDung> nguoiDung = [];
      for (int i = 0; i < soLuong; ++i)
      {
        nguoiDung.Add(new()
        {
          HoTen = RandomUtils.GenerateString(random.Next(25)),
          GioiTinh = random.Next(2) == 0 ? GioiTinh.NAM : GioiTinh.NU,
          NgaySinh = TimeZoneInfo.ConvertTimeToUtc(RandomUtils.GenerateDate(new DateTime(1950, 1, 1))),
          SoDienThoai = RandomUtils.GeneratePhoneNumber(),
          Email = RandomUtils.GenerateRandomEmail(),
          LoaiNguoiDung = LoaiNguoiDung.GIANG_VIEN,
          MatKhau = AuthUtilities.PasswordHashing("a"),
          ThoiGianTao = DateTime.UtcNow
        });
      }
      await context.NguoiDung.AddRangeAsync(nguoiDung);
      await context.SaveChangesAsync();
      return Ok(new ResponseFormat
      {
        Success = true
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Success = false,
        Data = err
      });
    }
  }
}
