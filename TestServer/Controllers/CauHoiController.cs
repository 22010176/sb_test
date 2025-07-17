using System.Collections;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using DatabaseModels;
using DatabaseModels.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Utilities;

namespace TestServer.Controllers;

public class CauHoiType
{
  public int Id { get; set; }
  public int IdBoCauHoi { get; set; }
  public double? DoKho { get; set; }
  public string? NoiDung { get; set; }
  public LoaiCauHoi LoaiCauHoi { get; set; }
  public List<DapAnCauHoi>? DapAnCauHoi { get; set; }
}

[ApiController]
[Authorize]
[Route("test/[controller]")]
public class CauHoiController(AppDbContext context) : ControllerBase
{
  readonly AppDbContext context = context;
  readonly Random random = new();

  public static async Task<List<CauHoiType>> LayDanhSachCauHoi(AppDbContext context, int userId)
  {
    var query = (
      from ch in context.CauHoi
      join bch in context.BoCauHoi on ch.IdBoCauHoi equals bch.Id
      join mh in context.MonHoc on bch.IdMonHoc equals mh.Id
      where mh.IdGiangVien == userId
      orderby ch.DoKho ascending
      select new CauHoiType()
      {
        Id = ch.Id,
        IdBoCauHoi = ch.IdBoCauHoi,
        DoKho = ch.DoKho,
        NoiDung = ch.NoiDung,
        LoaiCauHoi = ch.LoaiCauHoi,
        DapAnCauHoi = (
          from da in context.DapAnCauHoi
          where da.IdCauHoi == ch.Id
          select da
        ).ToList()
      }
    );
    return await query.ToListAsync();
  }

  [HttpGet]
  public async Task<IActionResult> Get()
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      var query =
        from mh in context.MonHoc
        where mh.IdGiangVien == userId
        select new
        {
          mh.Id,
          mh.MaMon,
          mh.TenMon,
          BoCauHoi = (
            from bch in context.BoCauHoi
            where bch.IdMonHoc == mh.Id
            select new
            {
              bch.Id,
              bch.TenBoCauHoi,
              CauHoi = (
                from ch in context.CauHoi
                where ch.IdBoCauHoi == bch.Id
                select new
                {
                  ch.Id,
                  ch.NoiDung,
                  ch.DoKho,
                  LoaiCauHoi = ch.LoaiCauHoi.ToString(),
                  DapAn = (
                    from da in context.DapAnCauHoi
                    where da.IdCauHoi == ch.Id
                    select da
                  ).ToList()
                }
              ).ToList()
            }
          ).ToList()
        };
      return Ok(new
      {
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

  [HttpPost]
  public async Task<IActionResult> Generate(int soLuong)
  {
    try
    {
      int id = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);

      List<BoCauHoi> boCauHoi = await BoCauHoiController.LayDanhSachBoCauHoi(context, id);
      List<CauHoi> cauHoi = [];
      foreach (var bch in boCauHoi)
      {
        for (int i = 0; i < soLuong; ++i)
        {
          cauHoi.Add(new()
          {
            IdBoCauHoi = bch.Id,
            NoiDung = RandomUtils.GenerateString(random.Next(20, 50)),
            DoKho = random.Next(3),
            LoaiCauHoi = (LoaiCauHoi)random.Next(2),
            ThoiGianCapNhatCuoi = DateTime.UtcNow
          });
        }
      }

      await context.CauHoi.AddRangeAsync(cauHoi);
      await context.SaveChangesAsync();

      // Them dap an
      List<DapAnCauHoi> dapAnCauHoi = [];
      foreach (var ch in cauHoi)
      {
        int soLuongDapAn = random.Next(3, 6);
        int dungSai = 0;
        for (int i = 0; i < soLuongDapAn; ++i)
        {
          bool _dungSai = dungSai == 0 || (
            ch.LoaiCauHoi == LoaiCauHoi.NHIEU_DAP_AN && random.Next(2) == 1
          );
          dapAnCauHoi.Add(new()
          {
            IdCauHoi = ch.Id,
            NoiDung = RandomUtils.GenerateString(random.Next(10, 50)),
            DungSai = _dungSai
          });
          if (_dungSai) ++dungSai;
        }
      }
      await context.DapAnCauHoi.AddRangeAsync(dapAnCauHoi);
      await context.SaveChangesAsync();

      return Ok(new ResponseFormat
      {
        Data = cauHoi,
        Success = true
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Success = false,
        Data = err
      });
    }
  }

  [HttpDelete]
  public async Task<IActionResult> Xoa()
  {
    try
    {
      int userId = int.Parse(User.FindFirst(ClaimTypes.UserData)!.Value);
      context.BoCauHoi.RemoveRange(
        from bch in context.BoCauHoi
        join mh in context.MonHoc on bch.IdMonHoc equals mh.Id
        where mh.IdGiangVien == userId
        select bch
      );
      await context.SaveChangesAsync();
      return Ok(new ResponseFormat
      {
        Success = true
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Success = false,
        Data = err
      });
    }
  }
}

