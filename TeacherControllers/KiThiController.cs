using System.Security.Claims;
using DatabaseModels;
using DatabaseModels.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Utilities;

namespace TeacherControllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class KiThiController(AppDbContext context) : ControllerBase
{
  readonly AppDbContext context = context;

  async Task<List<object>> GetDanhSachKiThi(int userId)
  {
    var query =
      from kt in context.KiThi
      join mh in context.MonHoc on kt.IdMonHoc equals mh.Id
      where mh.IdGiangVien == userId
      select new
      {
        kt.Id,
        kt.TenKiThi,
        kt.ThoiGianLamBaiThi,
        kt.ThoiGianVaoLamBai,
        kt.IdMonHoc,
        mh.TenMon,
      };
    return [.. await query.ToListAsync()];
  }

  [HttpGet("{idKiThi}")]
  public async Task<IActionResult> LayThongTinChiTietKiThi(int idKiThi)
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      object? kiThi = (await (
        from kt in context.KiThi
        join mh in context.MonHoc on kt.IdMonHoc equals mh.Id
        where
          kt.Id == idKiThi
          && mh.IdGiangVien == userId
        select new
        {
          kt.Id,
          kt.TenKiThi,
          kt.ThoiGianLamBaiThi,
          kt.ThoiGianVaoLamBai,
          kt.IdMonHoc,
          mh.MaMon,
          mh.TenMon,
        }
      ).ToListAsync()).FirstOrDefault();
      if (kiThi == null) throw new Exception("");

      return Ok(new ResponseFormat
      {
        Data = kiThi,
        Success = true,
        Message = ""
      });
    }
    catch (Exception err)
    {

      return BadRequest(new ResponseFormat
      {
        Data = err,
        Success = false,
        Message = ""
      });
    }
  }

  [HttpGet]
  public async Task<IActionResult> LayDanhSachKiThi()
  {
    int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);

    try
    {
      return Ok(new ResponseFormat
      {
        Data = await GetDanhSachKiThi(userId),
        Success = true,
        Message = ""
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Data = err,
        Success = false,
        Message = ""
      });
    }
  }

  [HttpPost]
  [Authorize(Roles = "GIANG_VIEN")]
  public async Task<IActionResult> TaoKiThi(KiThiInput input)
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      KiThi kiThi = new()
      {
        TenKiThi = input.TenKiThi,
        ThoiGianVaoLamBai = TimeZoneInfo.ConvertTimeToUtc(input.ThoiGianVaoLamBai),
        ThoiGianLamBaiThi = input.ThoiGianLamBaiThi,
        IdMonHoc = input.IdMonHoc,
      };

      await context.AddAsync(kiThi);
      await context.SaveChangesAsync();

      return Ok(new ResponseFormat
      {
        Data = await GetDanhSachKiThi(userId),
        Success = true,
        Message = ""
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Data = err,
        Success = false,
        Message = ""
      });
    }
  }

  [HttpPut("{idKiThi}")]
  public async Task<IActionResult> CapNhatKiThi(int idKiThi)
  {
    try
    {
      return Ok(new ResponseFormat
      {
        Data = "",
        Success = true,
        Message = ""
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Data = err,
        Success = false,
        Message = ""
      });
    }
  }

  [HttpDelete("{idKiThi}")]
  public async Task<IActionResult> XoaKiThi(int idKiThi)
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      KiThi? kiThi = await context.KiThi.FirstOrDefaultAsync(i => i.Id == idKiThi);
      if (kiThi == null) throw new Exception("");

      context.KiThi.Remove(kiThi);
      await context.SaveChangesAsync();

      return Ok(new ResponseFormat
      {
        Data = await GetDanhSachKiThi(userId),
        Success = true,
        Message = ""
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Data = err,
        Success = false,
        Message = ""
      });
    }
  }
}

public record KiThiInput
{
  public string? TenKiThi { get; set; }
  public int ThoiGianLamBaiThi { get; set; }
  public DateTime ThoiGianVaoLamBai { get; set; }

  public int IdMonHoc { get; set; }
}