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
  public List<MonHoc>? CauHoi { get; set; }
}

