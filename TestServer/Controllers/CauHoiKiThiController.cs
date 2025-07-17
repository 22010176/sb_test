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
public class CauHoiKiThiController(AppDbContext context) : ControllerBase
{
  readonly AppDbContext context = context;
  readonly Random random = new();

  [HttpGet]
  public async Task<IActionResult> GetCauHoi()
  {
    try
    {
      int id = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      var query = await (
        from kt in context.KiThi
        join mh in context.MonHoc on kt.IdMonHoc equals mh.Id
        where mh.IdGiangVien == id
        select new
        {
          KiThi = kt,
          MonHoc = mh,
          CauHoiKiThi = (
            from chkt in context.CauHoiKiThi
            where chkt.IdKiThi == kt.Id
            select new
            {
              CauHoi = chkt,
              DapAn = (
                from dachkt in context.DapAnCauHoiKiThi
                where dachkt.IdCauHoi == chkt.Id
                select dachkt
              ).ToList()
            }
          ).ToList()
        }
      ).ToListAsync();
      return Ok(new ResponseFormat
      {
        Data = query
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Data = err,
        Success = false
      });

    }
  }

  [HttpPost]
  public async Task<IActionResult> TaoCauHoi(int soLuongCauHoi)
  {
    try
    {
      int id = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      List<KiThi> kiThi = await (
        from kt in context.KiThi
        join mh in context.MonHoc on kt.IdMonHoc equals mh.Id
        where mh.IdGiangVien == id
        select kt
      ).ToListAsync();

      // var CauHoi = (

      // )


      return Ok(new ResponseFormat
      {
        Data = kiThi
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Data = err,
        Success = false
      });
    }
  }

}