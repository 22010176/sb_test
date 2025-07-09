using System.Collections;
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
public class LopHocController(AppDbContext context) : ControllerBase
{
  readonly AppDbContext context = context;

  async Task<IList> DanhSachLopHoc(int userId)
  {
    var query =
      from lh_nd in context.LopHoc_NguoiDung
      join mm in context.MaMoiLopHoc on lh_nd.IdMaMoi equals mm.Id
      join lh in context.LopHoc on mm.IdLopHoc equals lh.Id
      join nd in context.NguoiDung on lh.IdGiangVien equals nd.Id
      where
        lh_nd.TrangThaiMaMoi == TrangThaiMaMoi.DONG_Y
        && lh_nd.IdNguoiDung == userId
      orderby lh_nd.ThoiGianYeuCau descending
      select new
      {
        lh_nd.Id,
        lh.MaLop,
        lh.TenLop,
        lh.IdGiangVien,
        TenGiangVien = nd.HoTen,
        HocSinh = (
          from hs in context.NguoiDung
          join _lh_nd in context.LopHoc_NguoiDung on hs.Id equals _lh_nd.IdNguoiDung
          join _mm in context.MaMoiLopHoc on _lh_nd.IdMaMoi equals _mm.Id
          where
            hs.LoaiNguoiDung == LoaiNguoiDung.HOC_SINH
            && _mm.IdLopHoc == lh.Id
          select new
          {
            hs.HoTen,
            GioiTinh = hs.GioiTinh.ToString(),
            hs.NgaySinh,
            hs.SoDienThoai,
            hs.Email
          }
        ).ToList()
      };
    return await query.ToListAsync();
  }

  [HttpGet]
  public async Task<IActionResult> GetDanhSachLopHoc()
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      return Ok(new
      {
        Message = "",
        Success = true,
        Data = await DanhSachLopHoc(userId)
      });
    }
    catch (Exception err)
    {
      return BadRequest(new
      {
        Message = "",
        Success = false,
        Data = err
      });
    }
  }

  [HttpPost("{maMoi}")]
  public async Task<IActionResult> ThamGiaLopHoc(Guid maMoi)
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      MaMoiLopHoc? maMoiLopHoc = await context.MaMoiLopHoc.FirstOrDefaultAsync(i => i.MaMoi == maMoi);
      if (maMoiLopHoc == null) throw new Exception("Không tìm thấy lớp học");

      LopHoc_NguoiDung lopHoc_NguoiDung = new()
      {
        IdMaMoi = maMoiLopHoc.Id,
        IdNguoiDung = userId,
        ThoiGianYeuCau = DateTime.UtcNow,
        TrangThaiMaMoi = TrangThaiMaMoi.DANG_CHO
      };
      await context.LopHoc_NguoiDung.AddAsync(lopHoc_NguoiDung);
      await context.SaveChangesAsync();

      return Ok(new ResponseFormat
      {
        Message = "",
        Success = true,
        Data = await DanhSachLopHoc(userId)
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Message = "Tham gia lớp học thất bại",
        Success = false,
        Data = err
      });
    }
  }

  [HttpDelete("{idLopHoc}")]
  public async Task<IActionResult> RoiLopHoc(int idLopHoc)
  {
    try
    {
      return Ok(new ResponseFormat
      {
        Message = "",
        Success = true,
        Data = new List<object>()
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Message = "",
        Success = false,
        Data = err
      });
    }
  }
}
