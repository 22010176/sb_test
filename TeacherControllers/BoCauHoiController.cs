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
public partial class BoCauHoiController(AppDbContext context) : ControllerBase
{
  readonly AppDbContext context = context;

  async Task<List<object>> GetBoCauHoi(int idMonHoc)
  {
    var query = (
  from bch in context.BoCauHoi
  join mh in context.MonHoc on bch.IdMonHoc equals mh.Id
  where bch.IdMonHoc == idMonHoc
  orderby bch.ThoiGianCapNhatCuoi descending
  select new
  {
    bch.Id,
    bch.TenBoCauHoi,
    bch.IdMonHoc,
    bch.ThoiGianCapNhatCuoi,
    mh.TenMon,
    CauHoiDe = (
      from ch in context.CauHoi
      where ch.IdBoCauHoi == bch.Id && ch.DoKho == 0
      select new
      {
        ch.Id,
        ch.NoiDung,
      }
    ).Count(),
    CauHoiTrungBinh = (
      from ch in context.CauHoi
      where ch.IdBoCauHoi == bch.Id && ch.DoKho == 1
      select new
      {
        ch.Id,
        ch.NoiDung,
      }
    ).Count(),
    CauHoiKho = (
      from ch in context.CauHoi
      where ch.IdBoCauHoi == bch.Id && ch.DoKho == 2
      select new
      {
        ch.Id,
        ch.NoiDung,
      }
    ).Count(),
  }
);

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

  [HttpGet("{monHocId}/{boCauHoiId}")]
  public async Task<IActionResult> GetBoCauHoiAsync(int monHocId, int boCauHoiId)
  {
    try
    {
      MonHoc? monHoc = await CheckInput(monHocId);

      var query = (
        from bch in context.BoCauHoi
        join mh in context.MonHoc on bch.IdMonHoc equals mh.Id
        where bch.IdMonHoc == monHocId && bch.Id == boCauHoiId
        orderby bch.ThoiGianCapNhatCuoi descending
        select new
        {
          bch.Id,
          bch.TenBoCauHoi,
          bch.ThoiGianCapNhatCuoi,
          bch.IdMonHoc,
          mh.TenMon,
          mh.MaMon,
        }
      );
      return Ok(new
      {
        Message = "Lấy bộ câu hỏi thành công",
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
        Data = await GetBoCauHoi(monHocId)
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

