using System.Security.Claims;
using DatabaseModels;
using DatabaseModels.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Controllers;

[Route("api/[controller]")]
public partial class CauHoiController(AppDbContext context) : ControllerBase
{
  readonly AppDbContext context = context;

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
          select new { da.Id, da.NoiDung, da.DungSai }
        ).ToList()
      };
    return [.. await query.ToListAsync()];
  }

  async Task<CauHoi?> CheckInput(int boCauHoiId, int? cauHoiId = null)
  {
    int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
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
      await CheckInput(boCauHoiId);

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

  [HttpPost("{boCauHoiId}")]
  public async Task<IActionResult> PostCauHoiAsync(int boCauHoiId, [FromBody] List<CauHoiInput> input)
  {

    try
    {
      await CheckInput(boCauHoiId);

      List<CauHoi> cauHoi = [];
      List<DapAnCauHoi> dapAn = [];
      for (int i = 0; i < input.Count; i++)
      {
        CauHoiInput _ch = input[i];
        CauHoi ch = new()
        {
          NoiDung = _ch.NoiDung,
          ThoiGianCapNhatCuoi = DateTime.UtcNow,
          DoKho = _ch.DoKho,
          IdBoCauHoi = boCauHoiId,
        };

        for (int j = 0; j < _ch.DapAn.Count; j++)
        {
          DapAnCauHoiInput _da = _ch.DapAn[j];
          DapAnCauHoi da = new()
          {
            NoiDung = _da.NoiDung,
            DungSai = _da.DungSai,
            IdCauHoi = ch.Id
          };
          dapAn.Add(da);
        }
      }
      await context.CauHoi.AddRangeAsync(cauHoi);
      await context.DapAnCauHoi.AddRangeAsync(dapAn);
      await context.SaveChangesAsync();

      return Ok(new
      {
        Message = "Thêm câu hỏi thành công!",
        Success = true,
        Data = input
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
  public async Task<IActionResult> PutCauHoiAsync(int boCauHoiId, int cauHoiId, [FromBody] CauHoiInput input)
  {
    try
    {
      var cauHoi = await CheckInput(boCauHoiId, cauHoiId);

      cauHoi!.NoiDung = input.NoiDung;
      cauHoi!.DoKho = input.DoKho;
      cauHoi!.ThoiGianCapNhatCuoi = DateTime.UtcNow;
      await context.SaveChangesAsync();

      return Ok(new
      {
        Message = "Sửa câu hỏi thành công",
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

  [HttpDelete("{boCauHoiId}/{cauHoiId}")]
  public async Task<IActionResult> DeleteCauHoiAsync(int boCauHoiId, int cauHoiId)
  {
    try
    {
      var cauHoi = await CheckInput(boCauHoiId);
      var dapAn = await context.DapAnCauHoi.Where(i => i.IdCauHoi == cauHoiId).ToListAsync();

      context.CauHoi.Remove(cauHoi!);
      context.DapAnCauHoi.RemoveRange(dapAn);
      await context.SaveChangesAsync();

      return Ok(new
      {
        Message = "Xóa câu hỏi thành công",
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
  public double? DoKho { get; set; }
  public List<DapAnCauHoiInput> DapAn { get; set; } = [];
}

public record DapAnCauHoiInput
{
  public string? NoiDung { get; set; }
  public bool? DungSai { get; set; }

}