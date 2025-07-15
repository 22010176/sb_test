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
public class MonHocController(AppDbContext context) : ControllerBase
{
  readonly AppDbContext context = context;
  readonly Random random = new();

  public static async Task<List<MonHoc>> LayDanhSachMonHoc(AppDbContext context, int userId)
  {
    return await context.MonHoc.Where(i => i.IdGiangVien == userId).ToListAsync();
  }

  [HttpGet]
  public async Task<IActionResult> GetMonHoc()
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      List<MonHoc> monHoc = await LayDanhSachMonHoc(context, userId);
      return Ok(new
      {
        Success = true,
        Data = monHoc
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
  public async Task<IActionResult> GenerateMonHoc(int soLuong)
  {
    try
    {
      int id = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      List<MonHoc> monHoc = [];
      for (int i = 0; i < soLuong; ++i)
      {
        monHoc.Add(new()
        {
          IdGiangVien = id,
          TenMon = RandomUtils.GenerateString(random.Next(5, 15)),
          ThoiGianCapNhatCuoi = DateTime.UtcNow,
        });
      }
      await context.MonHoc.AddRangeAsync(monHoc);
      await context.SaveChangesAsync();

      foreach (var mon in monHoc)
      {
        mon.MaMon = $"MH-{mon.Id.ToString().PadLeft(9, '0')}";
      }
      await context.SaveChangesAsync();

      return Ok(new ResponseFormat
      {
        Data = monHoc,
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
  public async Task<IActionResult> XoaMonHoc()
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      List<MonHoc> monHoc = await context.MonHoc.Where(i => i.IdGiangVien == userId).ToListAsync();

      context.MonHoc.RemoveRange(monHoc);
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