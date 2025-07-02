using System.Security.Claims;
using DatabaseModels;
using DatabaseModels.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Controllers;

[ApiController]
[Authorize(Roles = "GIANG_VIEN")]
[Route("api/[controller]")]
public class BoCauHoiController(AppDbContext context) : ControllerBase
{
  readonly AppDbContext context = context;

  async Task<List<object>> GetBoCauHoi(int boCauHoi)
  {
    var query =
      from lh in context.BoCauHoi
      where lh.IdMonHoc == boCauHoi
      orderby lh.ThoiGianCapNhatCuoi descending
      select new
      {
        lh.Id,
        lh.TenBoCauHoi,
        lh.ThoiGianCapNhatCuoi
      };

    return [.. await query.ToListAsync()];
  }

  async Task<MonHoc> CheckInput(int monHocId)
  {
    int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
    MonHoc? monHoc = await context.MonHoc.FirstOrDefaultAsync(i => i.Id == monHocId);

    if (monHoc == null) throw new Exception("Môn học không tồn tại!");
    if (monHoc.IdGiangVien != userId) throw new Exception("Người dùng không hợp lệ!");
    return monHoc;
  }

  [HttpGet("{monHocId}")]
  public async Task<IActionResult> GetBoCauHoiAsync(int monHocId)
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      MonHoc? monHoc = await CheckInput(monHocId);

      return Ok(new
      {
        Message = "Lấy danh sách bộ câu hỏi thành công!",
        Success = true,
        Data = await GetBoCauHoi(userId)
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

  [HttpPost("{IdHocPhan}")]
  public async Task<IActionResult> PostBoCauHoiAsync(int IdHocPhan, [FromBody] BoCauHoiInput input)
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      MonHoc? monHoc = await CheckInput(IdHocPhan);

      BoCauHoi? boCauHoi = new()
      {
        TenBoCauHoi = input.TenBoCauHoi,
        IdMonHoc = IdHocPhan,
        ThoiGianCapNhatCuoi = DateTime.UtcNow
      };

      await context.BoCauHoi.AddAsync(boCauHoi);
      await context.SaveChangesAsync();

      return Ok(new
      {
        Message = "Tạo bộ câu hỏi thành công!",
        Success = true,
        Data = await GetBoCauHoi(IdHocPhan)
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

  [HttpPut("{IdHocPhan}/{id}")]
  public async Task<IActionResult> PutBoCauHoiAsync(int IdHocPhan, int id, [FromBody] BoCauHoiInput input)
  {
    try
    {
      MonHoc? monHoc = await CheckInput(IdHocPhan);
      BoCauHoi? boCauHoi = await context.BoCauHoi.FirstOrDefaultAsync(i => i.Id == id);

      if (boCauHoi == null) throw new Exception("Bộ câu hỏi không tồn tại!");
      if (boCauHoi.IdMonHoc != IdHocPhan) throw new Exception("Bộ câu hỏi không tồn tại!");

      boCauHoi.TenBoCauHoi = input.TenBoCauHoi;
      boCauHoi.ThoiGianCapNhatCuoi = DateTime.UtcNow;
      await context.SaveChangesAsync();

      return Ok(new
      {
        Message = "Sửa bộ câu hỏi thành công!",
        Success = true,
        Data = await GetBoCauHoi(IdHocPhan)
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

  [HttpDelete("{IdHocPhan}/{id}")]
  public async Task<IActionResult> DeleteBoCauHoiAsync(int IdHocPhan, int id)
  {
    try
    {
      MonHoc? monHoc = await CheckInput(IdHocPhan);
      BoCauHoi? boCauHoi = await context.BoCauHoi.FirstOrDefaultAsync(i => i.Id == id);

      if (boCauHoi == null) throw new Exception("Bộ câu hỏi không tồn tại!");
      if (boCauHoi.IdMonHoc != IdHocPhan) throw new Exception("Bộ câu hỏi không tồn tại!");

      context.BoCauHoi.Remove(boCauHoi);
      await context.SaveChangesAsync();

      return Ok(new
      {
        Message = "Xóa bộ câu hỏi thành công!",
        Success = true,
        Data = await GetBoCauHoi(IdHocPhan)
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

public record BoCauHoiInput
{
  public string? TenBoCauHoi { get; set; }
}

