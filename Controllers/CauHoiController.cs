using System.Collections;
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
public class CauHoiController(AppDbContext context) : ControllerBase
{
  readonly AppDbContext context = context;

  async Task<IList> GetDanhSachCauHoi(int boCauHoi)
  {
    var query =
      from ch in context.CauHoi
      where ch.IdBoCauHoi == boCauHoi
      select new
      {
        ch.Id,
        ch.DoKho,
        ch.NoiDung,
        ch.ThoiGianCapNhatCuoi,
        DapAn = (
          from da in context.DapAnCauHoi
          where da.IdCauHoi == ch.Id
          select new { da.Id, da.NoiDung, da.DungSai }
        ).ToList()
      };
    return await query.ToListAsync();
  }

  async Task<CauHoi?> CheckInput(int boCauHoiId, int userId, int? cauHoiId = null)
  {

    BoCauHoi? boCauHoi = await context.BoCauHoi.FirstOrDefaultAsync(i => i.Id == boCauHoiId);
    if (boCauHoi == null) throw new Exception("Bộ câu hỏi không tồn tại!");

    MonHoc? monHoc = await context.MonHoc.FirstOrDefaultAsync(i => i.Id == boCauHoi.IdMonHoc);
    if (monHoc == null) throw new Exception("Môn học không tồn tại!");
    if (monHoc.IdGiangVien != userId) throw new Exception("Người dùng không hợp lệ!");

    if (cauHoiId == null) return null;

    CauHoi? cauHoi = await context.CauHoi.FirstOrDefaultAsync(i => i.Id == cauHoiId);
    if (cauHoi == null) throw new Exception("Câu hỏi không tồn tại!");
    return cauHoi;
  }

  [HttpGet("{boCauHoiId}")]
  public async Task<IActionResult> GetDanhSachCauHoiAsync(int boCauHoiId)
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      await CheckInput(boCauHoiId, userId);

      return Ok(new
      {
        Message = "Lấy danh sách câu hỏi thành công!",
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

  [HttpPost("{boCauHoiId}")]
  public async Task<IActionResult> PostCauHoiAsync(int boCauHoiId, [FromBody] CauHoiInput input)
  {

    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      await CheckInput(boCauHoiId, userId);

      List<DapAnCauHoi> dapAn = [];

      CauHoi ch = new()
      {
        NoiDung = input.NoiDung,
        ThoiGianCapNhatCuoi = DateTime.UtcNow,
        DoKho = input.DoKho,
        IdBoCauHoi = boCauHoiId,
      };
      await context.CauHoi.AddAsync(ch);
      await context.SaveChangesAsync();

      ch = await context.CauHoi.FirstAsync(i => i.Id == ch.Id);

      for (int j = 0; j < input.DapAn.Count; j++)
      {
        DapAnCauHoiInput _da = input.DapAn[j];
        DapAnCauHoi da = new()
        {
          NoiDung = _da.NoiDung,
          DungSai = _da.DungSai,
          IdCauHoi = ch.Id
        };
        await context.DapAnCauHoi.AddAsync(da);
      }
      await context.SaveChangesAsync();

      return Ok(new
      {
        Message = "Thêm câu hỏi thành công!",
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
        Data = input
      });
    }
  }

  [HttpPut("{boCauHoiId}/{cauHoiId}")]
  public async Task<IActionResult> PutCauHoiAsync(int boCauHoiId, int cauHoiId, [FromBody] CauHoiPutInput input)
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      var cauHoi = await CheckInput(boCauHoiId, userId, cauHoiId);

      cauHoi!.NoiDung = input.NoiDung;
      cauHoi!.DoKho = input.DoKho;
      cauHoi!.ThoiGianCapNhatCuoi = DateTime.UtcNow;
      await context.SaveChangesAsync();

      List<DapAnCauHoiPutInput> dapAn = input.DapAn;
      for (int i = 0; i < dapAn.Count; i++)
      {
        DapAnCauHoiPutInput _da = dapAn[i];
        if (_da.Id < 0)
        {
          DapAnCauHoi dapAnCauHoi = new()
          {
            NoiDung = _da.NoiDung,
            DungSai = _da.DungSai,
            IdCauHoi = cauHoi.Id,
          };
          await context.DapAnCauHoi.AddAsync(dapAnCauHoi);
        }
        else if (_da.Xoa == true)
        {
          var da = await context.DapAnCauHoi.FirstAsync(i => i.Id == _da.Id);
          context.DapAnCauHoi.Remove(da);
        }
        else
        {
          var da = await context.DapAnCauHoi.FirstAsync(i => i.Id == _da.Id);
          da.NoiDung = _da.NoiDung;
          da.DungSai = _da.DungSai;
        }
      }
      await context.SaveChangesAsync();

      return Ok(new
      {
        Message = "Sửa câu hỏi thành công",
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

  [HttpDelete("{boCauHoiId}/{cauHoiId}")]
  public async Task<IActionResult> DeleteCauHoiAsync(int boCauHoiId, int cauHoiId)
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      var cauHoi = await CheckInput(boCauHoiId, userId, cauHoiId);
      var dapAn = await context.DapAnCauHoi.Where(i => i.IdCauHoi == cauHoiId).ToListAsync();

      if (cauHoi != null) context.CauHoi.Remove(cauHoi);
      if (dapAn.Count > 0) context.DapAnCauHoi.RemoveRange(dapAn);
      await context.SaveChangesAsync();

      return Ok(new
      {
        Message = "Xóa câu hỏi thành công",
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
}
public record CauHoiInput
{
  public string? NoiDung { get; set; }
  public double? DoKho { get; set; }
  public List<DapAnCauHoiInput> DapAn { get; set; } = [];
}

public record DapAnCauHoiInput
{
  public string? NoiDung { get; set; }
  public bool? DungSai { get; set; }

}

public record CauHoiPutInput
{
  public int Id { get; set; }
  public string? NoiDung { get; set; }
  public double? DoKho { get; set; }
  public List<DapAnCauHoiPutInput> DapAn { get; set; } = [];
}

public record DapAnCauHoiPutInput
{
  public int Id { get; set; }
  public string? NoiDung { get; set; }
  public bool? DungSai { get; set; }
  public bool? Xoa { get; set; }
}