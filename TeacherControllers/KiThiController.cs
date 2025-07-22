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
[Authorize]
public class KiThiController(AppDbContext context) : ControllerBase
{
  readonly AppDbContext context = context;

  async Task<List<object>> GetDanhSachKiThi(int userId)
  {
    var query =
      from kt in context.KiThi
      join mh in context.MonHoc on kt.IdMonHoc equals mh.Id
      where mh.IdGiangVien == userId
      select new
      {
        kt.Id,
        kt.TenKiThi,
        kt.ThoiGianLamBaiThi,
        kt.ThoiGianVaoLamBai,
        kt.IdMonHoc,
        mh.TenMon,
      };
    return [.. await query.ToListAsync()];
  }

  [HttpGet("{idKiThi}")]
  public async Task<IActionResult> LayThongTinChiTietKiThi(int idKiThi)
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      object? kiThi = (await (
        from kt in context.KiThi
        join mh in context.MonHoc on kt.IdMonHoc equals mh.Id
        where
          kt.Id == idKiThi
          && mh.IdGiangVien == userId
        select new
        {
          kt.Id,
          kt.TenKiThi,
          kt.ThoiGianLamBaiThi,
          kt.ThoiGianVaoLamBai,
          kt.IdMonHoc,
          mh.MaMon,
          mh.TenMon,
        }
      ).ToListAsync()).FirstOrDefault();
      if (kiThi == null) throw new Exception("");

      return Ok(new ResponseFormat
      {
        Data = kiThi,
        Success = true,
        Message = ""
      });
    }
    catch (Exception err)
    {

      return BadRequest(new ResponseFormat
      {
        Data = err,
        Success = false,
        Message = ""
      });
    }
  }

  [HttpGet("{idKiThi}/danh-sach")]
  public async Task<IActionResult> LayDanhSachCauHoi(int idKiThi)
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      var cauHoiKiThi = await (
        from kt in context.KiThi
        join mh in context.MonHoc on kt.IdMonHoc equals mh.Id
        where
          kt.Id == idKiThi
          && mh.IdGiangVien == userId
        select new
        {
          kt.Id,
          kt.TenKiThi,
          IdMonHoc = mh.Id,
          BoCauHoi = (
            from bch in context.BoCauHoi
            where bch.IdMonHoc == mh.Id
            orderby bch.Id
            select new
            {
              bch.Id,
              bch.TenBoCauHoi,
              CauHoi = (
                from chkt in context.CauHoiKiThi
                join ch in context.CauHoi on chkt.IdCauHoi equals ch.Id
                where
                  chkt.IdKiThi == kt.Id
                  && ch.IdBoCauHoi == bch.Id
                orderby chkt.Id
                select new
                {
                  chkt.Id,
                  chkt.NoiDung,
                  LoaiCauHoi = chkt.LoaiCauHoi.ToString(),
                  chkt.DoKho,
                  ch.ThoiGianCapNhatCuoi,
                  DapAn = (
                    from da in context.DapAnCauHoiKiThi
                    where da.IdCauHoi == chkt.Id
                    orderby da.Id
                    select new
                    {
                      da.Id,
                      da.NoiDung,
                      da.DungSai
                    }
                  ).ToList()
                }
              ).ToList(),
            }
          ).ToList()
        }
      ).ToListAsync();

      return Ok(new ResponseFormat
      {
        Data = cauHoiKiThi,
        Success = true,
        Message = ""
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Data = err,
        Success = false,
        Message = ""
      });
    }
  }

  [HttpGet]
  public async Task<IActionResult> LayDanhSachKiThi()
  {
    int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);

    try
    {
      return Ok(new ResponseFormat
      {
        Data = await GetDanhSachKiThi(userId),
        Success = true,
        Message = ""
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Data = err,
        Success = false,
        Message = ""
      });
    }
  }

  [HttpPost("{idKiThi}")]
  public async Task<IActionResult> ThemCauHoi(int idKiThi, CauHoiKiThiInput input)
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      List<CauHoi> cauHoi = await (
        from ch in context.CauHoi
        where input.DanhSachCauHoi!.Contains(ch.Id)
        select ch
      ).ToListAsync();

      List<CauHoiKiThi> cauHoiKiThi = [];
      foreach (var ch in cauHoi)
      {
        cauHoiKiThi.Add(new()
        {
          NoiDung = ch.NoiDung,
          DoKho = ch.DoKho,
          LoaiCauHoi = ch.LoaiCauHoi,
          ThoiGianCapNhatCuoi = DateTime.UtcNow,
          IdCauHoi = ch.Id,
          IdKiThi = idKiThi
        });
      }
      await context.CauHoiKiThi.AddRangeAsync(cauHoiKiThi);
      await context.SaveChangesAsync();

      List<DapAnCauHoiKiThi> dapAnCauHoi = [];
      foreach (var d in cauHoiKiThi)
      {
        List<DapAnCauHoi> _dapAnCauHoi = await (
          from da in context.DapAnCauHoi
          where da.IdCauHoi == d.IdCauHoi
          select da
        ).ToListAsync();
        foreach (var i in _dapAnCauHoi) dapAnCauHoi.Add(new()
        {
          NoiDung = i.NoiDung,
          DungSai = i.DungSai,
          IdDapAnCauHoi = i.Id,
          IdCauHoi = d.Id
        });
      }
      await context.DapAnCauHoiKiThi.AddRangeAsync(dapAnCauHoi);
      await context.SaveChangesAsync();

      return Ok(new ResponseFormat
      {
        Data = cauHoi,
        Success = true,
        Message = ""
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Data = err,
        Success = false,
        Message = ""
      });
    }
  }

  [HttpGet("{idKiThi}/cauHinhCauHoi")]
  public async Task<IActionResult> LayCauHinhCauHoi(int idKiThi)
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      var cauHinh = await context.CauHinhCauHoiKiThi
        .Where(i => i.IdKiThi == idKiThi)
        .Select(i => new
        {
          i.Id,
          i.DoKho,
          i.SoCauHoiTrongDe,
          i.TongDiem
        }).ToListAsync();

      return Ok(new ResponseFormat
      {
        Data = cauHinh,
        Success = true,
        Message = ""
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Data = err,
        Success = false,
        Message = ""
      });
    }
  }

  [HttpPost("{idKiThi}/cauHinhCauHoi")]
  public async Task<IActionResult> TaoCauHinhCauHoi(int idKiThi, [FromBody] List<CauHinhCauHoiKiThiInput> cauHinh)
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      KiThi? kiThi = await context.KiThi.FirstOrDefaultAsync(i => i.Id == idKiThi);
      if (kiThi == null) throw new Exception("");

      foreach (var ch in cauHinh)
      {
        CauHinhCauHoiKiThi? _cauHinh = await context.CauHinhCauHoiKiThi.FirstOrDefaultAsync(i => i.DoKho == ch.DoKho && i.IdKiThi == idKiThi);
        if (_cauHinh == null)
        {
          await context.CauHinhCauHoiKiThi.AddAsync(new()
          {
            IdKiThi = idKiThi,
            DoKho = ch.DoKho,
            SoCauHoiTrongDe = ch.SoCauHoiTrongDe,
            TongDiem = ch.TongDiem
          });
          await context.SaveChangesAsync();
          continue;
        }

        _cauHinh.SoCauHoiTrongDe = ch.SoCauHoiTrongDe;
        _cauHinh.TongDiem = ch.TongDiem;
        await context.SaveChangesAsync();
      }
      await context.SaveChangesAsync();

      return Ok(new ResponseFormat
      {
        Data = await context.CauHinhCauHoiKiThi
          .Where(i => i.IdKiThi == idKiThi)
          .Select(i => new
          {
            i.Id,
            i.DoKho,
            i.SoCauHoiTrongDe,
            i.TongDiem
          }).ToListAsync(),
        Success = true,
        Message = ""
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Data = err,
        Success = false,
        Message = ""
      });
    }
  }

  [HttpPost]
  [Authorize(Roles = "GIANG_VIEN")]
  public async Task<IActionResult> TaoKiThi(KiThiInput input)
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      KiThi kiThi = new()
      {
        TenKiThi = input.TenKiThi,
        ThoiGianVaoLamBai = TimeZoneInfo.ConvertTimeToUtc(input.ThoiGianVaoLamBai),
        ThoiGianLamBaiThi = input.ThoiGianLamBaiThi,
        IdMonHoc = input.IdMonHoc,
      };

      await context.AddAsync(kiThi);
      await context.SaveChangesAsync();

      return Ok(new ResponseFormat
      {
        Data = await GetDanhSachKiThi(userId),
        Success = true,
        Message = ""
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Data = err,
        Success = false,
        Message = ""
      });
    }
  }

  [HttpPut("{idKiThi}")]
  public async Task<IActionResult> CapNhatKiThi(int idKiThi, KiThiInput input)
  {
    try
    {
      KiThi? kiThi = await context.KiThi.FirstOrDefaultAsync(i => i.Id == idKiThi);
      if (kiThi == null) throw new Exception("");

      kiThi.TenKiThi = input.TenKiThi;
      kiThi.IdMonHoc = input.IdMonHoc;
      kiThi.ThoiGianLamBaiThi = input.ThoiGianLamBaiThi;
      kiThi.ThoiGianVaoLamBai = TimeZoneInfo.ConvertTimeToUtc(input.ThoiGianVaoLamBai);
      await context.SaveChangesAsync();

      return Ok(new ResponseFormat
      {
        Data = "",
        Success = true,
        Message = ""
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Data = err,
        Success = false,
        Message = ""
      });
    }
  }

  [HttpDelete("{idKiThi}")]
  public async Task<IActionResult> XoaKiThi(int idKiThi)
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      KiThi? kiThi = await context.KiThi.FirstOrDefaultAsync(i => i.Id == idKiThi);
      if (kiThi == null) throw new Exception("");

      context.KiThi.Remove(kiThi);
      await context.SaveChangesAsync();

      return Ok(new ResponseFormat
      {
        Data = await GetDanhSachKiThi(userId),
        Success = true,
        Message = ""
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Data = err,
        Success = false,
        Message = ""
      });
    }
  }
}

public record KiThiInput
{
  public string? TenKiThi { get; set; }
  public int ThoiGianLamBaiThi { get; set; }
  public DateTime ThoiGianVaoLamBai { get; set; }

  public int IdMonHoc { get; set; }
}

public record CauHoiKiThiInput
{
  public List<int>? DanhSachCauHoi { get; set; }
}

public record CauHinhCauHoiKiThiInput
{
  public int DoKho { get; set; }
  public int SoCauHoiTrongDe { get; set; }
  public int TongDiem { get; set; }
}