using DatabaseModels;
using DatabaseModels.Migrations;
using DatabaseModels.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Utilities;

namespace TestServer.Controllers;

[ApiController]
[Route("test/[controller]")]
public class GenerateController(AppDbContext context) : ControllerBase
{
  readonly AppDbContext context = context;
  readonly Random random = new();

  async Task<List<NguoiDung>> TaoNguoiDung(int soLuong, LoaiNguoiDung loaiNguoiDung, bool updateDatabase = false)
  {
    List<NguoiDung> nguoiDung = [];
    for (int i = 0; i < soLuong; ++i)
    {
      nguoiDung.Add(new()
      {
        HoTen = RandomUtils.GenerateString(random.Next(25)),
        GioiTinh = random.Next(2) == 0 ? GioiTinh.NAM : GioiTinh.NU,
        NgaySinh = TimeZoneInfo.ConvertTimeToUtc(RandomUtils.GenerateDate(new DateTime(1950, 1, 1))),
        SoDienThoai = RandomUtils.GeneratePhoneNumber(),
        Email = RandomUtils.GenerateRandomEmail(),
        LoaiNguoiDung = loaiNguoiDung,
        MatKhau = AuthUtilities.PasswordHashing("a"),
        ThoiGianTao = DateTime.UtcNow
      });
    }
    // await context.NguoiDung.AddRangeAsync(nguoiDung);
    // await context.SaveChangesAsync();
    if (updateDatabase) await DatabaseUtilities.BulkInsertAsync(context, nguoiDung);
    return nguoiDung;
  }

  async Task<List<LopHoc>> TaoLopHoc(int soLuong, int idNguoiDung)
  {
    List<LopHoc> lopHoc = [];
    for (int i = 0; i < soLuong; ++i)
    {
      lopHoc.Add(new()
      {
        IdGiangVien = idNguoiDung,
        TenLop = RandomUtils.GenerateString(random.Next(5, 20)),
        MoTa = RandomUtils.GenerateString(random.Next(100)),
        ThoiGianTao = DateTime.UtcNow
      });
    }
    // await context.LopHoc.AddRangeAsync(lopHoc);
    // await context.SaveChangesAsync();
    await DatabaseUtilities.BulkInsertAsync(context, lopHoc);

    foreach (var lop in lopHoc) lop.MaLop = $"LH-{lop.Id.ToString().PadLeft(9, '0')}";
    await context.SaveChangesAsync();
    return lopHoc;
  }

  async Task<List<MonHoc>> TaoMonHoc(int soLuong, int idNguoiDung)
  {
    List<MonHoc> monHoc = [];
    for (int i = 0; i < soLuong; ++i)
    {
      monHoc.Add(new()
      {
        IdGiangVien = idNguoiDung,
        TenMon = RandomUtils.GenerateString(random.Next(5, 15)),
        ThoiGianCapNhatCuoi = DateTime.UtcNow,
      });
    }
    // await context.MonHoc.AddRangeAsync(monHoc);
    // await context.SaveChangesAsync();
    await DatabaseUtilities.BulkInsertAsync(context, monHoc);

    foreach (var mon in monHoc) mon.MaMon = $"MH-{mon.Id.ToString().PadLeft(9, '0')}";

    await context.SaveChangesAsync();
    return monHoc;
  }

  async Task<List<BoCauHoi>> TaoBoCauHoi(int soLuong, int idMonHoc, bool insertDatabase = false)
  {
    List<BoCauHoi> boCauHoi = [];
    for (int i = 0; i < soLuong; ++i)
    {
      boCauHoi.Add(new()
      {
        IdMonHoc = idMonHoc,
        TenBoCauHoi = RandomUtils.GenerateString(random.Next(5, 15)),
        ThoiGianCapNhatCuoi = DateTime.UtcNow
      });
    }

    // await context.BoCauHoi.AddRangeAsync(boCauHoi);
    // await context.SaveChangesAsync();
    if (insertDatabase) await DatabaseUtilities.BulkInsertAsync(context, boCauHoi);
    return boCauHoi;
  }

  async Task<List<CauHoi>> TaoCauHoi(int soLuong, int idBoCauHoi, bool insertDatabase = false)
  {
    List<CauHoi> cauHoi = [];
    for (int i = 0; i < soLuong; ++i)
    {
      cauHoi.Add(new()
      {
        IdBoCauHoi = idBoCauHoi,
        NoiDung = RandomUtils.GenerateString(random.Next(20, 50)),
        DoKho = random.Next(3),
        LoaiCauHoi = (LoaiCauHoi)random.Next(2),
        ThoiGianCapNhatCuoi = DateTime.UtcNow
      });
    }
    // await context.CauHoi.AddRangeAsync(cauHoi);
    // await context.SaveChangesAsync();
    if (insertDatabase) await DatabaseUtilities.BulkInsertAsync(context, cauHoi);
    return cauHoi;
  }

  async Task<List<DapAnCauHoi>> TaoDapAn(CauHoi ch, bool insertDatabase = false)
  {
    List<DapAnCauHoi> dapAnCauHoi = [];

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

    // await context.DapAnCauHoi.AddRangeAsync(dapAnCauHoi);
    // await context.SaveChangesAsync();
    if (insertDatabase) await DatabaseUtilities.BulkInsertAsync(context, dapAnCauHoi);
    return dapAnCauHoi;
  }

  async Task<List<KiThi>> TaoKiThi(int soLuong, int idMonHoc, bool insertDatabase = false)
  {
    List<KiThi> kiThi = [];
    for (int i = 0; i < soLuong; ++i)
    {
      kiThi.Add(new()
      {
        TenKiThi = RandomUtils.GenerateString(random.Next(10, 15)),
        ThoiGianLamBaiThi = random.Next(10, 300),
        ThoiGianVaoLamBai = TimeZoneInfo.ConvertTimeToUtc(RandomUtils.GenerateDate(new DateTime(2024, 1, 1))),
        IdMonHoc = idMonHoc
      });
    }
    // await context.KiThi.AddRangeAsync(kiThi);
    // await context.SaveChangesAsync();
    if (insertDatabase) await DatabaseUtilities.BulkInsertAsync(context, kiThi);
    return kiThi;
  }

  async Task<List<MaMoiLopHoc>> TaoMaMoi(int soLuong, int IdLopHoc, bool insertDatabase = false)
  {
    List<MaMoiLopHoc> maMoiLopHoc = [];
    for (int i = 0; i < soLuong; ++i)
    {
      maMoiLopHoc.Add(new()
      {
        MaMoi = Guid.NewGuid(),
        IdLopHoc = IdLopHoc,
        NgayTao = DateTime.UtcNow,
      });
    }
    // await context.AddRangeAsync(maMoiLopHoc);
    // await context.SaveChangesAsync();
    if (insertDatabase) await DatabaseUtilities.BulkInsertAsync(context, maMoiLopHoc);
    return maMoiLopHoc;
  }

  async Task<List<LopHoc_NguoiDung>> ThemHocSinh(int soLuong, int idMaMoi, List<NguoiDung> nguoiDung, bool insertDatabase = false)
  {
    List<LopHoc_NguoiDung> lopHoc_NguoiDung = [];
    List<NguoiDung> _nguoiDung = [.. nguoiDung];
    int length = Math.Max(soLuong, _nguoiDung.Count);
    for (int i = 0; i < length; ++i)
    {
      NguoiDung? nd = RandomUtils.PickRand(ref _nguoiDung);
      if (nd == null) continue;
      lopHoc_NguoiDung.Add(new()
      {
        IdMaMoi = idMaMoi,
        IdNguoiDung = nd!.Id,
        ThoiGianYeuCau = DateTime.UtcNow,
        TrangThaiMaMoi = random.Next(2) == 0 ? TrangThaiMaMoi.DANG_CHO : TrangThaiMaMoi.DONG_Y
      });
    }
    // await context.LopHoc_NguoiDung.AddRangeAsync(lopHoc_NguoiDung);
    // await context.SaveChangesAsync();
    if (insertDatabase) await DatabaseUtilities.BulkInsertAsync(context, lopHoc_NguoiDung);
    return lopHoc_NguoiDung;
  }

  async Task<List<CauHinhCauHoiKiThi>> TaoCauHinh(int idKiThi, bool insertDatabase = false)
  {
    List<CauHinhCauHoiKiThi> cauHinhCauHoiKiThi = [];
    double diem = 0;
    for (int i = 0; i < 3; ++i)
    {
      double _diem = i < 2 ? random.NextDouble() * 3.33 : 10.0 - diem;
      cauHinhCauHoiKiThi.Add(new()
      {
        DoKho = i,
        IdKiThi = idKiThi,
        TongDiem = _diem,
        SoCauHoiTrongDe = random.Next(40)
      });
      diem += _diem;
    }
    // await context.CauHinhCauHoiKiThi.AddRangeAsync(cauHinhCauHoiKiThi);
    // await context.SaveChangesAsync();
    if (insertDatabase) await DatabaseUtilities.BulkInsertAsync(context, cauHinhCauHoiKiThi);
    return cauHinhCauHoiKiThi;
  }

  async Task<CauHoiKiThi> TaoCauHoiKiThi(CauHoi cauHoi, int idKiThi)
  {
    CauHoiKiThi cauHoiKiThi = new()
    {
      NoiDung = cauHoi.NoiDung,
      DoKho = cauHoi.DoKho,
      LoaiCauHoi = cauHoi.LoaiCauHoi,
      ThoiGianCapNhatCuoi = DateTime.UtcNow,
      IdCauHoi = cauHoi.Id,
      IdKiThi = idKiThi
    };

    await context.CauHoiKiThi.AddAsync(cauHoiKiThi);
    await context.SaveChangesAsync();

    List<DapAnCauHoi> dapAnCauHoi = await (
      from da in context.DapAnCauHoi
      where da.IdCauHoi == cauHoi.Id
      select da
    ).ToListAsync();
    List<DapAnCauHoiKiThi> dapAnCauHoiKiThi = [];
    foreach (var i in dapAnCauHoi) dapAnCauHoiKiThi.Add(new()
    {
      NoiDung = i.NoiDung,
      DungSai = i.DungSai,
      IdDapAnCauHoi = i.Id,
      IdCauHoi = cauHoiKiThi.Id
    });
    await context.DapAnCauHoiKiThi.AddRangeAsync(dapAnCauHoiKiThi);
    await context.SaveChangesAsync();
    return cauHoiKiThi;
  }

  async Task<List<CauHoiKiThi>> TaoCauHoiChoKiThi(int soLuong, int idKiThi, List<CauHoi> cauHoi, bool insertDatabase = false)
  {
    List<CauHoiKiThi> cauHoiKiThi = [];
    List<CauHoi> _cauHoi = [.. cauHoi];
    for (int i = 0; i < soLuong; ++i)
    {
      CauHoi? ch = RandomUtils.PickRand(ref _cauHoi);
      if (ch == null) break;

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

    if (insertDatabase) await DatabaseUtilities.BulkInsertAsync(context, cauHoiKiThi);
    return cauHoiKiThi;
  }
  async Task<List<DapAnCauHoiKiThi>> TaoDapAnChoCauHoiKiThi(int idCauHoiKiThi, bool insertDatabase = false)
  {
    List<DapAnCauHoi> dapAnCauHoi = await (
      from chkt in context.CauHoiKiThi
      join dach in context.DapAnCauHoi on chkt.IdCauHoi equals dach.IdCauHoi
      select dach
    ).ToListAsync();
    List<DapAnCauHoiKiThi> dapAnCauHoiKiThi = [];
    foreach (var i in dapAnCauHoi) dapAnCauHoiKiThi.Add(new()
    {
      NoiDung = i.NoiDung,
      DungSai = i.DungSai,
      IdDapAnCauHoi = i.Id,
      IdCauHoi = idCauHoiKiThi
    });
    if (insertDatabase) await DatabaseUtilities.BulkInsertAsync(context, dapAnCauHoiKiThi);
    return dapAnCauHoiKiThi;
  }

  async Task<List<LopHoc_KiThi>> ThemLopHoc_KiThi(int soLuong, int idLopHoc, List<KiThi> kiThi, bool insertDatabase = false)
  {
    List<LopHoc_KiThi> lopHoc_KiThi = [];
    List<KiThi> _kiThi = [.. kiThi];
    for (int i = 0; i < soLuong; ++i)
    {
      KiThi? kt = RandomUtils.PickRand(ref _kiThi);
      if (kt == null) break;

      lopHoc_KiThi.Add(new()
      {
        IdKiThi = kt.Id,
        IdLopHoc = idLopHoc
      });
    }

    if (insertDatabase) await DatabaseUtilities.BulkInsertAsync(context, lopHoc_KiThi);
    return lopHoc_KiThi;
  }

  [HttpDelete]
  public async Task<IActionResult> Delete()
  {
    context.NguoiDung.RemoveRange([.. context.NguoiDung]);
    context.MonHoc.RemoveRange([.. context.MonHoc]);
    context.LopHoc.RemoveRange([.. context.LopHoc]);
    context.KiThi.RemoveRange([.. context.KiThi]);
    context.MaMoiLopHoc.RemoveRange([.. context.MaMoiLopHoc]);
    context.LopHoc_NguoiDung.RemoveRange([.. context.LopHoc_NguoiDung]);
    context.LopHoc_KiThi.RemoveRange([.. context.LopHoc_KiThi]);
    context.BoCauHoi.RemoveRange([.. context.BoCauHoi]);
    context.CauHoi.RemoveRange([.. context.CauHoi]);
    context.DapAnCauHoi.RemoveRange([.. context.DapAnCauHoi]);
    context.CauHoiKiThi.RemoveRange([.. context.CauHoiKiThi]);
    context.DapAnCauHoiKiThi.RemoveRange([.. context.DapAnCauHoiKiThi]);
    await context.SaveChangesAsync();

    return Ok();
  }

  [HttpPost]
  public async Task<ActionResult> GenerateAllData(int scale)
  {
    // 1 gv
    NguoiDung nguoiDung = (await TaoNguoiDung(1, LoaiNguoiDung.GIANG_VIEN, true))[0];
    List<NguoiDung> hocSinh = await TaoNguoiDung(100 * scale, LoaiNguoiDung.HOC_SINH, true);

    // lop hoc
    List<LopHoc> lopHoc = await TaoLopHoc(5 * scale, nguoiDung.Id);

    // mon hoc
    List<MonHoc> monHoc = await TaoMonHoc(5 * scale, nguoiDung.Id);

    // Ma moi lop hoc
    List<MaMoiLopHoc> maMoiLopHoc = [];
    foreach (var lh in lopHoc) maMoiLopHoc.AddRange(await TaoMaMoi(2, lh.Id));
    await DatabaseUtilities.BulkInsertAsync(context, maMoiLopHoc);

    // lop hoc, nguoi dung
    List<LopHoc_NguoiDung> lopHoc_NguoiDung = [];
    foreach (var mm in maMoiLopHoc) lopHoc_NguoiDung.AddRange(await ThemHocSinh(50, mm.Id, hocSinh));
    await DatabaseUtilities.BulkInsertAsync(context, lopHoc_NguoiDung);

    // bo cau hoi
    List<BoCauHoi> boCauHoi = [];
    // Ki thi
    List<KiThi> kiThi = [];
    foreach (var mon in monHoc)
    {
      boCauHoi.AddRange(await TaoBoCauHoi(scale * 3, mon.Id));
      kiThi.AddRange(await TaoKiThi(scale * 3, mon.Id));
    }
    await DatabaseUtilities.BulkInsertAsync(context, boCauHoi);
    await DatabaseUtilities.BulkInsertAsync(context, kiThi);

    // Cau hoi
    List<CauHoi> cauHoi = [];
    foreach (var bch in boCauHoi) cauHoi.AddRange(await TaoCauHoi(scale * 20, bch.Id));
    await DatabaseUtilities.BulkInsertAsync(context, cauHoi);

    List<DapAnCauHoi> dapAnCauHoi = [];
    foreach (var ch in cauHoi) dapAnCauHoi.AddRange(await TaoDapAn(ch));
    await DatabaseUtilities.BulkInsertAsync(context, dapAnCauHoi);

    // cau hoi ki thi
    List<CauHinhCauHoiKiThi> cauHinhCauHoiKiThi = [];
    List<CauHoiKiThi> cauHoiKiThi = [];
    foreach (var i in kiThi)
    {
      cauHinhCauHoiKiThi.AddRange(await TaoCauHinh(i.Id));
      cauHoiKiThi.AddRange(await TaoCauHoiChoKiThi(20 * scale, i.Id, cauHoi));
    }
    await DatabaseUtilities.BulkInsertAsync(context, cauHinhCauHoiKiThi);
    await DatabaseUtilities.BulkInsertAsync(context, cauHoiKiThi);

    // dap an cau hoi ki thi
    List<DapAnCauHoiKiThi> dapAnCauHoiKiThi = [];
    foreach (var i in cauHoiKiThi) dapAnCauHoiKiThi.AddRange(await TaoDapAnChoCauHoiKiThi(i.Id));
    await DatabaseUtilities.BulkInsertAsync(context, dapAnCauHoiKiThi);

    // lop hoc ki thi
    List<LopHoc_KiThi> lopHoc_KiThi = [];
    foreach (var i in lopHoc) lopHoc_KiThi.AddRange(await ThemLopHoc_KiThi(5 * scale, i.Id, kiThi));
    await DatabaseUtilities.BulkInsertAsync(context, lopHoc_KiThi);

    return Ok(new ResponseFormat
    {
      Data = nguoiDung
    });
  }
}