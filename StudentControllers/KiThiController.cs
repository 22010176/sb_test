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
public class KiThiController(AppDbContext context) : ControllerBase
{
  readonly AppDbContext context = context;

  [HttpPost("{idKiThi}/tham-gia")]
  public async Task<IActionResult> ThamGiaKiThi(int idKiThi)
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      var kiThi = await context.KiThi.FirstOrDefaultAsync(i => i.Id == idKiThi);
      if (kiThi == null) throw new Exception("Kỳ thi không tồn tại.");

      if (kiThi.ThoiGianVaoLamBai > DateTime.Now) throw new Exception("Chưa đến thời gian vào làm bài thi.");

      List<CauHoiKiThi> cauHoiKiThi = await context.CauHoiKiThi
        .Where(ch => ch.IdKiThi == idKiThi)
        .Include(ch => ch.DapAnCauHoi)
        .ToListAsync();

      List<CauHinhCauHoiKiThi> cauHinhCauHoiKiThi = await context.CauHinhCauHoiKiThi
        .Where(ch => ch.IdKiThi == idKiThi)
        .ToListAsync();

      int totalCauHoi = cauHinhCauHoiKiThi.Sum(ch => ch.SoCauHoiTrongDe);

      var danhSachCauHoi = await (
        from chts in context.CauHoiThiSinh
        join ch in context.CauHoiKiThi on chts.IdCauHoi equals ch.Id
        where chts.IdThiSinh == userId && ch.IdKiThi == idKiThi
        select new
        {
          chts.Id,
          chts.SoThutu,
          TrangThai = chts.TrangThai.ToString(),
          ch.NoiDung,
          ch.DoKho,
          ch.IdCauHoi,
          DapAn = (
            from da in context.DapAnCauHoi
            where da.IdCauHoi == ch.Id
            select new
            {
              da.Id,
              da.NoiDung
            }
          ).ToList(),
        }
      ).ToListAsync();
      if (danhSachCauHoi.Count > 0) return Ok(new
      {
        Success = true,
        Data = danhSachCauHoi,
      });

      List<CauHoiThiSinh> cauHoiThiSinh = [];
      int _i = 0;
      foreach (var cauHinh in cauHinhCauHoiKiThi)
      {
        List<CauHoiKiThi> cauHoiTheoDoKho = [.. cauHoiKiThi.Where(ch => ch.DoKho == cauHinh.DoKho)];
        for (int i = 0; i < cauHinh.SoCauHoiTrongDe; i++)
        {
          var cauHoi = RandomUtils.PickRand(ref cauHoiTheoDoKho);
          if (cauHoi == null) continue;

          cauHoiThiSinh.Add(new CauHoiThiSinh
          {
            IdCauHoi = cauHoi.Id,
            SoThutu = ++_i,
            IdThiSinh = userId
          });
        }
      }
      await context.CauHoiThiSinh.AddRangeAsync(cauHoiThiSinh);
      await context.SaveChangesAsync();

      return Ok(new
      {
        Success = true,
        Message = "Tham gia kỳ thi thành công."
      });
    }
    catch (Exception ex)
    {
      return BadRequest(new ResponseFormat
      {
        Success = false,
        Message = "",
        Data = ex
      });
    }
  }

  [HttpGet("{idKiThi}/danh-sach-cau-hoi")]
  public async Task<IActionResult> LayDanhSachCauHoi(int idKiThi)
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      var danhSachCauHoi = await (
        from chts in context.CauHoiThiSinh
        join ch in context.CauHoiKiThi on chts.IdCauHoi equals ch.Id
        where chts.IdThiSinh == userId && ch.IdKiThi == idKiThi
        select new
        {
          chts.Id,
          chts.SoThutu,
          TrangThai = chts.TrangThai.ToString(),
          ch.NoiDung,
          ch.DoKho,
          ch.IdCauHoi,
          DapAn = (
            from da in context.DapAnCauHoiKiThi
            where da.IdCauHoi == ch.Id
            select new
            {
              da.Id,
              da.NoiDung
            }
          ).ToList(),
        }
      ).ToListAsync();

      return Ok(new ResponseFormat
      {
        Data = danhSachCauHoi,
        Success = true
      });
    }
    catch (Exception err)
    {
      return Ok(new ResponseFormat
      {
        Data = err,
        Success = false
      });
    }
  }

  [HttpGet]
  public async Task<IActionResult> LayDanhSachKiThi()
  {
    try
    {
      var userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      var query = await (
        from kt in context.KiThi
        join lh_kt in context.LopHoc_KiThi on kt.Id equals lh_kt.IdKiThi
        join lh in context.LopHoc on lh_kt.IdLopHoc equals lh.Id
        join mmlh in context.MaMoiLopHoc on lh.Id equals mmlh.IdLopHoc
        join lh_nd in context.LopHoc_NguoiDung on mmlh.Id equals lh_nd.IdMaMoi
        join mh in context.MonHoc on kt.IdMonHoc equals mh.Id
        orderby kt.ThoiGianVaoLamBai descending
        where lh_nd.IdNguoiDung == userId
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
      ).Distinct().ToListAsync();
      return Ok(new ResponseFormat
      {
        Data = query,
        Success = true
      });
    }
    catch (Exception err)
    {

      return Ok(new ResponseFormat
      {
        Data = err,
        Success = false
      });
    }
  }
}