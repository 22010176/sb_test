using DatabaseModels;
using DatabaseModels.Models;
using Microsoft.AspNetCore.Mvc;
using Utilities;

namespace TestServer.Controllers;

[ApiController]
[Route("test/[controller]")]
public class GenerateController(AppDbContext context) : ControllerBase
{
  readonly AppDbContext context = context;
  readonly Random random = new();

  async Task<List<NguoiDung>> TaoNguoiDung(int soLuong, LoaiNguoiDung loaiNguoiDung)
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
    await context.NguoiDung.AddRangeAsync(nguoiDung);
    await context.SaveChangesAsync();
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
    await context.LopHoc.AddRangeAsync(lopHoc);
    await context.SaveChangesAsync();

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
    await context.MonHoc.AddRangeAsync(monHoc);
    await context.SaveChangesAsync();

    foreach (var mon in monHoc) mon.MaMon = $"MH-{mon.Id.ToString().PadLeft(9, '0')}";

    await context.SaveChangesAsync();
    return monHoc;
  }

  async Task<List<BoCauHoi>> TaoBoCauHoi(int soLuong, int idMonHoc)
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

    await context.BoCauHoi.AddRangeAsync(boCauHoi);
    await context.SaveChangesAsync();
    return boCauHoi;
  }

  async Task<List<CauHoi>> TaoCauHoi(int soLuong, int idBoCauHoi)
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
    await context.CauHoi.AddRangeAsync(cauHoi);
    await context.SaveChangesAsync();

    return cauHoi;
  }

  async Task<List<DapAnCauHoi>> TaoDapAn(CauHoi ch)
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

    await context.DapAnCauHoi.AddRangeAsync(dapAnCauHoi);
    await context.SaveChangesAsync();
    return dapAnCauHoi;
  }

  async Task<List<KiThi>> TaoKiThi(int soLuong, int idMonHoc)
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
    await context.KiThi.AddRangeAsync(kiThi);
    await context.SaveChangesAsync();
    return kiThi;
  }

  async Task<List<MaMoiLopHoc>> TaoMaMoi(int soLuong, int IdLopHoc)
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
    await context.AddRangeAsync(maMoiLopHoc);
    await context.SaveChangesAsync();
    return maMoiLopHoc;
  }

  async Task<List<LopHoc_NguoiDung>> ThemHocSinh(int soLuong, int idMaMoi, List<NguoiDung> nguoiDung)
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
    await context.LopHoc_NguoiDung.AddRangeAsync(lopHoc_NguoiDung);
    await context.SaveChangesAsync();
    return lopHoc_NguoiDung;
  }

  [HttpDelete]
  public async Task<IActionResult> Delete()
  {
    context.RemoveRange([.. context.NguoiDung]);
    await context.SaveChangesAsync();
    return Ok();
  }

  [HttpPost]
  public async Task<ActionResult> GenerateAllData(int scale)
  {
    // 1 gv
    NguoiDung nguoiDung = (await TaoNguoiDung(1, LoaiNguoiDung.GIANG_VIEN))[0];
    List<NguoiDung> hocSinh = await TaoNguoiDung(100, LoaiNguoiDung.HOC_SINH);

    // lop hoc
    List<LopHoc> lopHoc = await TaoLopHoc(10 * scale, nguoiDung.Id);

    // Ma moi lop hoc
    List<MaMoiLopHoc> maMoiLopHoc = [];
    foreach (var lh in lopHoc) maMoiLopHoc.AddRange(await TaoMaMoi(2, lh.Id));
    foreach (var mm in maMoiLopHoc) await ThemHocSinh(50, mm.Id, hocSinh);

    // mon hoc
    List<MonHoc> monHoc = await TaoMonHoc(10 * scale, nguoiDung.Id);

    // bo cau hoi
    List<BoCauHoi> boCauHoi = [];
    // Ki thi
    List<KiThi> kiThi = [];
    foreach (var mon in monHoc)
    {
      boCauHoi.AddRange(await TaoBoCauHoi(scale * 10, mon.Id));
      kiThi.AddRange(await TaoKiThi(scale * 10, mon.Id));
    }

    // Cau hoi
    List<CauHoi> cauHoi = [];
    foreach (var bch in boCauHoi) cauHoi.AddRange(await TaoCauHoi(scale * 50, bch.Id));

    // Dap an
    List<DapAnCauHoi> dapAnCauHoi = [];
    foreach (var ch in cauHoi) dapAnCauHoi.AddRange(await TaoDapAn(ch));

    // Cau hinh cau hoi
    List<CauHinhCauHoiKiThi> cauHinhCauHoiKiThi = [];

    // 


    return Ok();
  }
}