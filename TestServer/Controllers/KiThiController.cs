using System.Collections;
using System.Security.Claims;
using System.Threading.Tasks;
using DatabaseModels;
using DatabaseModels.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Utilities;

namespace TestServer.Controllers;

[ApiController]
[Authorize]
[Route("test/[controller]")]
public class KiThiController(AppDbContext context) : ControllerBase
{
  readonly AppDbContext context = context;
  readonly Random random = new();

  [HttpGet]
  public async Task<IActionResult> GetKiThi()
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
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
      return Ok(new
      {
        Success = true,
        Data = await query.ToListAsync()
      });
    }
    catch (Exception err)
    {
      return BadRequest(new
      {
        Message = err,
        Success = false,
        Data = new List<object>()
      });
    }
  }

  [HttpPost]
  public async Task<IActionResult> GenerateKiThi(int soLuongKiThi)
  {
    try
    {
      int id = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);

      List<KiThi> kiThi = [];
      List<MonHoc> monHoc = await MonHocController.LayDanhSachMonHoc(context, id);

      // Them kiThi
      foreach (var mh in monHoc)
      {
        for (int i = 0; i < soLuongKiThi; ++i)
        {
          kiThi.Add(new()
          {
            TenKiThi = RandomUtils.GenerateString(random.Next(10, 20)),
            ThoiGianLamBaiThi = random.Next(15, 90),
            ThoiGianVaoLamBai = TimeZoneInfo.ConvertTimeToUtc(RandomUtils.GenerateDate(new DateTime(2000, 1, 1))),
            IdMonHoc = mh.Id
          });
        }
      }
      await context.KiThi.AddRangeAsync(kiThi);
      await context.SaveChangesAsync();

      List<CauHinhCauHoiKiThi> cauHinhKiThi = [];
      foreach (var kt in kiThi)
      {
        double diem = 0;
        for (int i = 0; i < 3; ++i)
        {
          double _diem = i < 2 ? random.NextDouble() * 3.33 : 10.0 - diem;
          cauHinhKiThi.Add(new()
          {
            DoKho = i,
            IdKiThi = kt.Id,
            TongDiem = _diem,
            SoCauHoiTrongDe = random.Next(20)
          });
          diem += _diem;
        }
      }
      await context.CauHinhCauHoiKiThi.AddRangeAsync(cauHinhKiThi);
      await context.SaveChangesAsync();

      return Ok(new ResponseFormat
      {
        Data = await (
          from kt in context.KiThi
          join mh in context.MonHoc on kt.IdMonHoc equals mh.Id
          where mh.IdGiangVien == id
          select new
          {
            kt,
            mh,
            CauHinh = (
              from ch in context.CauHinhCauHoiKiThi
              where ch.IdKiThi == kt.Id
              select ch
            ).ToList(),
          }
        ).ToListAsync(),
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
  public async Task<IActionResult> XoaKiThi()
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);

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