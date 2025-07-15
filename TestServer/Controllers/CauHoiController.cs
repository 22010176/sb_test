using System.Security.Claims;
using System.Threading.Tasks;
using DatabaseModels;
using DatabaseModels.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Utilities;

namespace TestServer.Controllers;

[ApiController]
[Authorize]
[Route("test/[controller]")]
public class CauHoiController(AppDbContext context) : ControllerBase
{
  readonly AppDbContext context = context;
  readonly Random random = new();

  [HttpGet]
  public async Task<IActionResult> Get()
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      // List<MonHoc> monHoc = await MonHocController.LayDanhSachMonHoc(context, userId);
      // var query =
      //   from mh in context.MonHoc

      //   select new
      //   {
      //     mh.Id,
      //     mh.TenMon,
      //     mh.ThoiGianCapNhatCuoi,
      //     BoCauHoi = (
      //       from bch in context.BoCauHoi
      //       where bch.IdMonHoc == mh.Id
      //       select bch
      //     ).ToList()
      //   };
      return Ok(new
      {
        Success = true,
        // Data = await query.ToListAsync()
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
  public async Task<IActionResult> Generate(int soLuong)
  {
    try
    {
      int id = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);

      List<BoCauHoi> boCauHoi = await BoCauHoiController.LayDanhSachBoCauHoi(context, id);
      List<CauHoi> cauHoi = [];
      foreach (var bch in boCauHoi)
      {
        for (int i = 0; i < soLuong; ++i)
        {
          cauHoi.Add(new()
          {
            IdBoCauHoi = bch.Id,
            NoiDung = RandomUtils.GenerateString(random.Next(20, 50)),
            DoKho = random.Next(3),
            LoaiCauHoi = (LoaiCauHoi)random.Next(2),
            ThoiGianCapNhatCuoi = DateTime.UtcNow
          });
        }
      }

      await context.CauHoi.AddRangeAsync(cauHoi);
      await context.SaveChangesAsync();

      // Them dap an

      return Ok(new ResponseFormat
      {
        Data = cauHoi,
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
  public async Task<IActionResult> Xoa()
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);


      context.BoCauHoi.RemoveRange(
        from bch in context.BoCauHoi
        join mh in context.MonHoc on bch.IdMonHoc equals mh.Id
        where mh.IdGiangVien == userId
        select bch
      );
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