using System.Security.Claims;
using DatabaseModels;
using DatabaseModels.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Controllers;

[Route("api/[controller]")]
public partial class BoCauHoiController : ControllerBase
{
  async Task<List<object>> GetDanhSachCauHoi(int boCauHoi)
  {
    var query =
      from ch in context.CauHoi
      where ch.IdBoCauHoi == boCauHoi
      select new
      {
        ch.NoiDung,
        ch.ThoiGianCapNhatCuoi,
        DapAn = (
          from da in context.DapAnCauHoi
          where da.IdCauHoi == ch.Id
          select new
          {
            da.Id,
            da.NoiDung,
            da.DungSai
          }).ToList()
      };
    return [.. await query.ToListAsync()];
  }

  [HttpGet("{boCauHoiId}/cau-hoi")]
  public async Task<IActionResult> GetDanhSachCauHoiAsync(int boCauHoiId)
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      BoCauHoi? boCauHoi = await context.BoCauHoi.FirstOrDefaultAsync(i => i.Id == boCauHoiId);
      if (boCauHoi == null) throw new Exception("Bộ câu hỏi không tồn tại!");

      MonHoc? monHoc = await context.MonHoc.FirstOrDefaultAsync(i => i.Id == boCauHoi.IdMonHoc);
      if (monHoc == null) throw new Exception("Môn học không tồn tại!");
      if (monHoc.IdGiangVien != userId) throw new Exception("Người dùng không hợp lệ!");


      return Ok(new
      {
        Message = "",
        Success = true,
        Data = await GetDanhSachCauHoi(boCauHoiId)
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

  [HttpPost("{boCauHoiId}/cau-hoi")]
  public async Task<IActionResult> PostCauHoiAsync(int boCauHoiId, [FromBody] List<CauHoiInput> input)
  {
    try
    {
      return Ok(new
      {
        Message = "",
        Success = true,
        Data = new List<object>()
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

  [HttpPut("{boCauHoiId}/cau-hoi/{cauHoiId}")]
  public async Task<IActionResult> PutCauHoiAsync(int boCauHoiId, int cauHoiId, [FromBody] CauHoiInput input)
  {
    try
    {
      return Ok(new
      {
        Message = "",
        Success = true,
        Data = new List<object>()
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

  [HttpDelete("{boCauHoiId}/cau-hoi/{cauHoiId}")]
  public async Task<IActionResult> DeleteCauHoiAsync(int boCauHoiId, int cauHoiId)
  {
    try
    {
      return Ok(new
      {
        Message = "",
        Success = true,
        Data = new List<object>()
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
public record CauHoiInput
{
  public string? NoiDung { get; set; }
}

public record DapAnCauHoiInput
{

}