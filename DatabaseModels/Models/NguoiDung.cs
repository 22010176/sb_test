using System.ComponentModel.DataAnnotations;

namespace DatabaseModels.Models;

public enum GioiTinh
{
  NAM, NU, KHAC
}
public enum LoaiNguoiDung
{
  GIANG_VIEN, HOC_SINH
}
public class NguoiDung
{
  [Key]
  public int Id { get; set; }
  public string? HoTen { get; set; }
  public GioiTinh? GioiTinh { get; set; }
  public DateTime? NgaySinh { get; set; }
  public string? SoDienThoai { get; set; }
  public string? Email { get; set; }
  public string? MatKhau { get; set; }
  public DateTime? ThoiGianTao { get; set; }
  public string? HinhAnh { get; set; }
  public LoaiNguoiDung? LoaiNguoiDung { get; set; }

  public List<LopHoc_NguoiDung>? LopHoc_NguoiDung { get; set; }
  public List<LopHoc>? LopHoc { get; set; }
}

public class LopHoc
{
  [Key]
  public int Id { get; set; }
  public string? MaLop { get; set; }
  public string? TenLop { get; set; }
  public string? MoTa { get; set; }
  public DateTime? ThoiGianTao { get; set; }

  public int IdGiangVien { get; set; }
  public NguoiDung? NguoiTao { get; set; }

  public List<LopHoc_NguoiDung>? LopHoc_NguoiDung { get; set; }
}

public enum TrangThai_LH_ND
{
  DANG_CHO, DA_DUYET, DA_HUY,
}
public class LopHoc_NguoiDung
{
  [Key]
  public int Id { get; set; }
  public DateTime? ThoiGianYeuCau { get; set; }
  public TrangThai_LH_ND TrangThai { get; set; } = TrangThai_LH_ND.DANG_CHO;

  public int IdLopHoc { get; set; }
  public LopHoc? LopHoc { get; set; }

  public int IdNguoiDung { get; set; }
  public NguoiDung? NguoiDung { get; set; }
}