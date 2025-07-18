using System.Security.Claims;
using DatabaseModels;
using DatabaseModels.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Utilities;

namespace StudentControllers;

[ApiController]
[Authorize(Roles = "HOC_SINH")]
[Route("api/hoc-sinh/[controller]")]
public class KiThiController(AppDbContext context) : ControllerBase
{
  readonly AppDbContext context = context;

  [HttpGet]
  public async Task<IActionResult> LayDanhSachKiThi()
  {
    try
    {
      var userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      var query = await (
        from kt in context.KiThi
        join lh_kt in context.LopHoc_KiThi on kt.Id equals lh_kt.IdKiThi
        join lh in context.LopHoc on lh_kt.IdLopHoc equals lh.Id
        join mmlh in context.MaMoiLopHoc on lh.Id equals mmlh.IdLopHoc
        join lh_nd in context.LopHoc_NguoiDung on mmlh.Id equals lh_nd.IdMaMoi
        join mh in context.MonHoc on kt.IdMonHoc equals mh.Id
        orderby kt.ThoiGianVaoLamBai descending
        where lh_nd.IdNguoiDung == userId
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
      ).Distinct().ToListAsync();
      return Ok(new ResponseFormat
      {
        Data = query,
        Success = true
      });
    }
    catch (Exception err)
    {

      return Ok(new ResponseFormat
      {
        Data = err,
        Success = false
      });
    }
  }
}