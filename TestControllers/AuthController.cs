using System.Threading.Tasks;
using DatabaseModels;
using DatabaseModels.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Utilities;

namespace TestControllers;

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
          ThoiGianTao = RandomUtils.GenerateDate(DateTime.Now)
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
