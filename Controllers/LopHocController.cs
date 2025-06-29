using System.Collections;
using System.Security.Claims;
using DatabaseModels;
using DatabaseModels.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Controllers;

[ApiController]
[Authorize]
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

  async Task<LopHoc> CheckInput(int lopId)
  {
    int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
    LopHoc? lopHoc = await context.LopHoc.FirstOrDefaultAsync(i => i.Id == lopId);

    if (lopHoc == null) throw new Exception("Lớp học không tồn tại!");
    if (lopHoc.IdGiangVien != userId) throw new Exception("Không có quyền sửa lớp học này!");

    return lopHoc;
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
      LopHoc? lopHoc = await CheckInput(id);

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
      LopHoc? lopHoc = await CheckInput(id);

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