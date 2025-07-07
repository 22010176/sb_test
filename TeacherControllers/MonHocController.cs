using System.Security.Claims;
using DatabaseModels;
using DatabaseModels.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace TeacherControllers;

[ApiController]
[Authorize(Roles = "GIANG_VIEN")]
[Route("api/[controller]")]
public class MonHocController(AppDbContext context) : ControllerBase
{
  readonly AppDbContext context = context;

  async Task<List<object>> GetMonHoc(int userId)
  {
    var query =
      from lh in context.MonHoc
      where lh.IdGiangVien == userId
      orderby lh.ThoiGianCapNhatCuoi descending
      select new
      {
        lh.Id,
        lh.MaMon,
        lh.TenMon,
        lh.ThoiGianCapNhatCuoi
      };

    return [.. await query.ToListAsync()];
  }

  [HttpGet]
  public async Task<IActionResult> GetMonHocAsync()
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      return Ok(new
      {
        Message = "Lấy danh sách môn học thành công!",
        Success = true,
        Data = await GetMonHoc(userId)
      });
    }
    catch (Exception err)
    {
      // "Lấy danh sách môn học thất bại!"
      return BadRequest(new
      {
        Message = err,
        Success = false,
        Data = new List<object>()
      });
    }
  }



  [HttpGet("{id}")]
  public async Task<IActionResult> GetMonHocByIdAsync(int id)
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      MonHoc? monHoc = await context.MonHoc.FirstOrDefaultAsync(i => i.Id == id);

      if (monHoc == null) throw new Exception("Lớp học không tồn tại!");
      if (monHoc.IdGiangVien != userId) throw new Exception("Người dùng không hợp lệ!");

      return Ok(new
      {
        Message = "Lấy môn học thành công!",
        Success = true,
        Data = new List<MonHoc>()
        {
          monHoc
        }
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
  public async Task<IActionResult> PostMonHocAsync(MonHocInput input)
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      MonHoc? monHoc = new()
      {
        TenMon = input.TenMon,
        IdGiangVien = userId,
      };

      await context.MonHoc.AddAsync(monHoc);
      await context.SaveChangesAsync();

      monHoc = await context.MonHoc.FirstOrDefaultAsync(i => i.Id == monHoc.Id);
      if (monHoc == null) throw new Exception("Lớp học không tồn tại!");

      monHoc.MaMon = $"MH-{monHoc.Id.ToString().PadLeft(9, '0')}";
      await context.SaveChangesAsync();

      return Ok(new
      {
        Message = "Tạo môn học thành công!",
        Success = true,
        Data = await GetMonHoc(userId)
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

  [HttpPut("{id}")]
  public async Task<IActionResult> PutMonHocAsync(int id, MonHocInput input)
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      MonHoc? monHoc = await context.MonHoc.FirstOrDefaultAsync(i => i.Id == id);
      if (monHoc == null) throw new Exception("Lớp học không tồn tại!");
      if (monHoc.IdGiangVien != userId) throw new Exception("Người dùng không hợp lệ!");

      monHoc.TenMon = input.TenMon;
      monHoc.ThoiGianCapNhatCuoi = DateTime.UtcNow;
      await context.SaveChangesAsync();

      return Ok(new
      {
        Message = "Sửa môn học thành công!",
        Success = true,
        Data = await GetMonHoc(userId)
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
  public async Task<IActionResult> DeleteMonHocAsync(int id)
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      MonHoc? monHoc = await context.MonHoc.FirstOrDefaultAsync(i => i.Id == id);
      if (monHoc == null) throw new Exception("Lớp học không tồn tại!");
      if (monHoc.IdGiangVien != userId) throw new Exception("Người dùng không hợp lệ!");

      context.MonHoc.Remove(monHoc);
      await context.SaveChangesAsync();

      return Ok(new
      {
        Message = "Xóa môn học thành công!",
        Success = true,
        Data = await GetMonHoc(userId)
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

public record MonHocInput
{
  public string? TenMon { get; set; }
}