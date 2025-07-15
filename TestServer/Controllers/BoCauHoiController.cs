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
public class BoCauHoiController(AppDbContext context) : ControllerBase
{
  readonly AppDbContext context = context;
  readonly Random random = new();

  public static async Task<List<BoCauHoi>> LayDanhSachBoCauHoi(AppDbContext context, int userId)
  {
    var query = (
      from bch in context.BoCauHoi
      join mh in context.MonHoc on bch.IdMonHoc equals mh.Id
      where mh.IdGiangVien == userId
      select bch
    );
    return await query.ToListAsync();
  }

  [HttpGet]
  public async Task<IActionResult> Get()
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      List<MonHoc> monHoc = await MonHocController.LayDanhSachMonHoc(context, userId);
      var query =
        from mh in context.MonHoc
        where mh.IdGiangVien == userId
        select new
        {
          mh.Id,
          mh.TenMon,
          mh.ThoiGianCapNhatCuoi,
          BoCauHoi = (
            from bch in context.BoCauHoi
            where bch.IdMonHoc == mh.Id
            select bch
          ).ToList()
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
  public async Task<IActionResult> Generate(int soLuong)
  {
    try
    {
      int id = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);

      List<MonHoc> monHoc = await MonHocController.LayDanhSachMonHoc(context, id);
      List<BoCauHoi> boCauHoi = [];

      foreach (var mon in monHoc)
      {
        for (int i = 0; i < soLuong; ++i)
        {
          boCauHoi.Add(new()
          {
            IdMonHoc = mon.Id,
            TenBoCauHoi = RandomUtils.GenerateString(random.Next(5, 15)),
            ThoiGianCapNhatCuoi = DateTime.UtcNow
          });
        }
      }

      await context.BoCauHoi.AddRangeAsync(boCauHoi);
      await context.SaveChangesAsync();

      return Ok(new ResponseFormat
      {
        Data = boCauHoi,
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