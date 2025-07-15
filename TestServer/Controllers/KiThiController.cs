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
  public async Task<IActionResult> GenerateKiThi(int soLuong)
  {
    try
    {
      int id = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);

      List<KiThi> kiThi = [];
      List<MonHoc> monHoc = await MonHocController.LayDanhSachMonHoc(context, id);

      // Them lopHoc
      foreach (var mh in monHoc)
      {
        for (int i = 0; i < soLuong; ++i)
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

      List<LopHoc> lopHoc = await LopHocController.LayDanhSachLopHoc(context, id);
      foreach (var lh in lopHoc)
      {
        // them lophoc

      }

      return Ok(new ResponseFormat
      {
        Data = kiThi,
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