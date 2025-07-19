using System.Collections;
using DatabaseModels;
using DatabaseModels.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Utilities;

namespace TeacherControllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class LopHoc_KiThiController(AppDbContext context) : ControllerBase
{
  readonly AppDbContext context = context;

  async Task<IList> LayDanhSachLopHoc(int idKiThi)
  {
    var query =
      from kt in context.KiThi
      join mh in context.MonHoc on kt.IdMonHoc equals mh.Id
      where kt.Id == idKiThi
      select new
      {
        kt.Id,
        kt.TenKiThi,
        kt.ThoiGianLamBaiThi,
        kt.ThoiGianVaoLamBai,
        kt.MonHoc,
        mh.TenMon,
        LopHoc = (
          from lh in context.LopHoc
          join kt_lh in context.LopHoc_KiThi on kt.Id equals kt_lh.IdKiThi
          where lh.Id == kt_lh.IdLopHoc
          select new
          {
            kt_lh.Id,
            lh.MaLop,
            lh.TenLop,
            lh.MoTa,
            HocSinh = (
              from mm in context.MaMoiLopHoc
              join lh_nd in context.LopHoc_NguoiDung on mm.Id equals lh_nd.IdMaMoi
              join hs in context.NguoiDung on lh_nd.IdNguoiDung equals hs.Id
              where
                mm.IdLopHoc == lh.Id
                && lh_nd.TrangThaiMaMoi == TrangThaiMaMoi.DONG_Y
              orderby hs.HoTen ascending
              select new
              {
                hs.Id,
                hs.HoTen,
                GioiTinh = hs.GioiTinh.ToString(),
                hs.Email,
                hs.SoDienThoai,
                hs.NgaySinh,
              }
            ).ToList()
          }
        ).ToList()
      };
    return await query.ToListAsync();
  }

  [HttpGet("{idKiThi}/danh-sach-lop")]
  public async Task<IActionResult> Get(int idKiThi)
  {
    try
    {
      return Ok(new ResponseFormat
      {
        Data = await LayDanhSachLopHoc(idKiThi),
        Message = "",
        Success = true
      });
    }
    catch (Exception err)
    {
      return Ok(new ResponseFormat
      {
        Data = err,
        Message = "",
        Success = false
      });
    }
  }

  [HttpPost("{idKiThi}")]
  public async Task<IActionResult> Post(int idKiThi, [FromBody] List<PostInput> inputs)
  {
    try
    {
      List<LopHoc_KiThi> lopHoc_KiThi = [];
      foreach (var input in inputs)
      {
        lopHoc_KiThi.Add(new()
        {
          IdKiThi = input.IdKiThi,
          IdLopHoc = input.IdLopHoc
        });
      }

      await context.LopHoc_KiThi.AddRangeAsync(lopHoc_KiThi);
      await context.SaveChangesAsync();
      return Ok(new ResponseFormat
      {
        Data = await LayDanhSachLopHoc(idKiThi),
        Message = "",
        Success = true
      });
    }
    catch (Exception err)
    {
      return Ok(new ResponseFormat
      {
        Data = err,
        Message = "",
        Success = false
      });
    }
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    try
    {
      LopHoc_KiThi? lopHoc_KiThi = await context.LopHoc_KiThi.FirstOrDefaultAsync(i => i.Id == id);
      if (lopHoc_KiThi == null) throw new Exception();

      int idKiThi = lopHoc_KiThi.IdKiThi;

      context.LopHoc_KiThi.Remove(lopHoc_KiThi);
      await context.SaveChangesAsync();
      return Ok(new ResponseFormat
      {
        Data = await LayDanhSachLopHoc(idKiThi),
        Message = "",
        Success = true
      });
    }
    catch (Exception err)
    {
      return Ok(new ResponseFormat
      {
        Data = err,
        Message = "",
        Success = false
      });
    }
  }
}

public record PostInput
{
  public int IdLopHoc { get; set; }
  public int IdKiThi { get; set; }
}