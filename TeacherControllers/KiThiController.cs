using System.Collections;
using System.Security.Claims;
using DatabaseModels;
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
  public async Task<IActionResult> TaoKiThi()
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
  public async Task<IActionResult> LayDanhSachKiThi(int idKiThi)
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
}