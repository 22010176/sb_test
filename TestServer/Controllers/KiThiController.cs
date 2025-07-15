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