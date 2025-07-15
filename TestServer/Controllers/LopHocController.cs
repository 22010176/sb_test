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
public class LopHocController(AppDbContext context) : ControllerBase
{
  readonly AppDbContext context = context;
  readonly Random random = new();

  public static async Task<List<LopHoc>> LayDanhSachLopHoc(AppDbContext context, int userId)
  {
    return await context.LopHoc.Where(i => i.IdGiangVien == userId).ToListAsync();
  }

  [HttpGet]
  public async Task<IActionResult> GetLopHoc()
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      List<LopHoc> lopHoc = await context.LopHoc.Where(i => i.IdGiangVien == userId).ToListAsync();
      return Ok(new
      {
        Message = "Lấy danh sách lớp học thành công!",
        Success = true,
        Data = lopHoc
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
  public async Task<IActionResult> GenerateLopHoc(int soLuong)
  {
    try
    {
      int id = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      List<LopHoc> lopHoc = [];
      for (int i = 0; i < soLuong; ++i)
      {
        lopHoc.Add(new()
        {
          IdGiangVien = id,
          TenLop = RandomUtils.GenerateString(random.Next(5, 20)),
          MoTa = RandomUtils.GenerateString(random.Next(100)),
          ThoiGianTao = DateTime.UtcNow
        });
      }

      await context.LopHoc.AddRangeAsync(lopHoc);
      await context.SaveChangesAsync();

      foreach (var lop in lopHoc)
      {
        lop.MaLop = $"LH-{lop.Id.ToString().PadLeft(9, '0')}";
      }
      await context.SaveChangesAsync();

      return Ok(new ResponseFormat
      {
        Data = lopHoc,
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
  public async Task<IActionResult> XoaLopHoc()
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      List<LopHoc> lopHoc = await context.LopHoc.Where(i => i.IdGiangVien == userId).ToListAsync();

      context.LopHoc.RemoveRange(lopHoc);
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