using System.Collections;
using System.Security.Claims;
using DatabaseModels;
using DatabaseModels.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Utilities;

namespace TeacherControllers;

[ApiController]
[Route("api/[controller]")]
public class LopHocController(AppDbContext context) : ControllerBase
{
  readonly AppDbContext context = context;

  private async Task<IList> GetLopHoc(int userId)
  {
    var query =
      from lh in context.LopHoc
      where lh.IdGiangVien == userId
      orderby lh.ThoiGianTao descending
      select new
      {
        lh.Id,
        lh.MaLop,
        lh.TenLop,
        lh.MoTa,
        lh.ThoiGianTao
      };

    return await query.ToListAsync();
  }

  async Task<LopHoc> CheckInput(int lopId, int userId)
  {
    LopHoc? lopHoc = await context.LopHoc.FirstOrDefaultAsync(i => i.Id == lopId);

    if (lopHoc == null) throw new Exception("Lớp học không tồn tại!");
    if (lopHoc.IdGiangVien != userId) throw new Exception("Không có quyền sửa lớp học này!");

    return lopHoc;
  }

  [HttpGet("{idLopHoc}")]
  [Authorize]
  public async Task<IActionResult> LayThongTinLopChiTiet(int idLopHoc)
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      LopHoc lopHoc = await CheckInput(idLopHoc, userId);
      return Ok(new ResponseFormat
      {
        Data = lopHoc,
        Success = true,
        Message = ""
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

  [HttpGet("{idLopHoc}/danh-sach-lop")]
  [Authorize]
  public async Task<IActionResult> LayDanhSachLopLopChiTiet(int idLopHoc)
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      await CheckInput(idLopHoc, userId);

      var query =
        from lh in context.LopHoc
        where lh.Id == idLopHoc
        select new
        {
          lh.Id,
          lh.MaLop,
          lh.MoTa,
          lh.ThoiGianTao,
          HocSinh = (
            from hs in context.NguoiDung
            join mm in context.MaMoiLopHoc on lh.Id equals mm.IdLopHoc
            join lh_nn in context.LopHoc_NguoiDung on mm.Id equals lh_nn.IdMaMoi
            where
              lh_nn.IdNguoiDung == hs.Id
              && lh_nn.TrangThaiMaMoi == TrangThaiMaMoi.DONG_Y
            select new
            {
              lh_nn.Id,
              hs.HoTen,
              hs.Email,
              GioiTinh = hs.GioiTinh.ToString(),
              hs.NgaySinh,
              hs.SoDienThoai
            }).ToList()
        };
      return Ok(new ResponseFormat
      {
        Data = await query.ToListAsync(),
        Success = true,
        Message = ""
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

  [HttpGet("{idLopHoc}/cho-duyet")]
  [Authorize]
  public async Task<IActionResult> LayDanhSachChoDuyet(int idLopHoc)
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      await CheckInput(idLopHoc, userId);

      var query =
        from lh in context.LopHoc
        join mm in context.MaMoiLopHoc on lh.Id equals mm.IdLopHoc
        join lh_nn in context.LopHoc_NguoiDung on mm.Id equals lh_nn.IdMaMoi
        join hs in context.NguoiDung on lh_nn.IdNguoiDung equals hs.Id
        where
          lh.Id == idLopHoc
          && lh_nn.TrangThaiMaMoi == TrangThaiMaMoi.DANG_CHO
        orderby lh_nn.ThoiGianYeuCau descending
        select new
        {
          lh_nn.Id,
          hs.HoTen,
          hs.Email,
          GioiTinh = hs.GioiTinh.ToString(),
          hs.NgaySinh,
          hs.SoDienThoai
        };
      return Ok(new ResponseFormat
      {
        Data = await query.ToListAsync(),
        Success = true,
        Message = ""
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

  [HttpGet]
  [Authorize(Roles = "GIANG_VIEN")]
  public async Task<IActionResult> GetLopHocAsync()
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);

      return Ok(new
      {
        Message = "Lấy danh sách lớp học thành công!",
        Success = true,
        Data = await GetLopHoc(userId)
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

  [HttpPost("{id}")]
  [Authorize(Roles = "GIANG_VIEN")]
  public async Task<IActionResult> GetInviteLink(int id)
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      LopHoc? lopHoc = await CheckInput(id, userId);

      MaMoiLopHoc? maMoiLopHoc = await context.MaMoiLopHoc.FirstOrDefaultAsync(i => i.IdLopHoc == id);
      if (maMoiLopHoc != null) return Ok(new
      {
        Message = "Lấy mã mời thành công",
        Success = true,
        Data = maMoiLopHoc.MaMoi
      });

      maMoiLopHoc = new()
      {
        MaMoi = Guid.NewGuid(),
        NgayTao = DateTime.UtcNow,
        IdLopHoc = lopHoc.Id
      };
      await context.MaMoiLopHoc.AddAsync(maMoiLopHoc);
      await context.SaveChangesAsync();

      return Ok(new
      {
        Message = "Lấy mã mời thành công",
        Success = true,
        Data = maMoiLopHoc.MaMoi
      });

    }
    catch (Exception err)
    {
      return BadRequest(new
      {
        Message = "Lấy mã mời thất bại!",
        Success = false,
        Data = err
      });
    }
  }

  [HttpPost]
  [Authorize(Roles = "GIANG_VIEN")]
  public async Task<IActionResult> PostLopHoc(LopHocInput input)
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      LopHoc? lopHoc = new()
      {
        TenLop = input.TenLop,
        MoTa = input.MoTa,
        IdGiangVien = userId
      };

      await context.LopHoc.AddAsync(lopHoc);
      await context.SaveChangesAsync();

      lopHoc = await context.LopHoc.FirstOrDefaultAsync(i => i.Id == lopHoc.Id);
      if (lopHoc == null) throw new Exception("Lớp học không tồn tại!");

      lopHoc.MaLop = $"LH-{lopHoc.Id.ToString().PadLeft(9, '0')}";
      await context.SaveChangesAsync();

      return Ok(new
      {
        Message = "Tạo lớp học thành công!",
        Success = true,
        Data = await GetLopHoc(userId)
      });
    }
    catch (Exception err)
    {
      return BadRequest(new
      {
        err.Message,
        Success = false,
        Data = new List<object>()
      });
    }
  }

  [HttpPut("{id}")]
  [Authorize(Roles = "GIANG_VIEN")]
  public async Task<IActionResult> PutLopHocAsync(int id, [FromBody] LopHocInput input)
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      LopHoc? lopHoc = await CheckInput(id, userId);

      lopHoc.TenLop = input.TenLop;
      lopHoc.MoTa = input.MoTa;
      await context.SaveChangesAsync();

      return Ok(new
      {
        Message = "Sửa lớp học thành công!",
        Success = true,
        Data = await GetLopHoc(lopHoc.IdGiangVien)
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

  [HttpDelete("{id}")]
  [Authorize(Roles = "GIANG_VIEN")]
  public async Task<IActionResult> DeleteLopHocAsync(int id)
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      LopHoc? lopHoc = await CheckInput(id, userId);

      context.LopHoc.Remove(lopHoc);
      await context.SaveChangesAsync();
      return Ok(new
      {
        Message = "Xóa lớp học thành công!",
        Success = true,
        Data = await GetLopHoc(lopHoc.IdGiangVien)
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
}

public record LopHocInput
{
  public string? TenLop { get; set; }
  public string? MoTa { get; set; }
}