using System.ComponentModel.DataAnnotations;

namespace DatabaseModels.Models;

public class KiThi
{
  [Key]
  public int Id { get; set; }
  public string? TenKiThi { get; set; }
  public int ThoiGianLamBaiThi { get; set; }
  public DateTime ThoiGianVaoLamBai { get; set; }

  public int IdMonHoc { get; set; }
  public MonHoc? MonHoc { get; set; }

  public List<LopHoc_KiThi>? LopHoc_KiThi { get; set; }
  public List<CauHinhCauHoiKiThi>? CauHinhCauHoiKiThi { get; set; }
  public List<CauHoiKiThi>? CauHoiKiThi { get; set; }
}

public class LopHoc_KiThi
{
  [Key]
  public int Id { get; set; }

  public int IdLopHoc { get; set; }
  public LopHoc? LopHoc { get; set; }

  public int IdKiThi { get; set; }
  public KiThi? KiThi { get; set; }
}

public class CauHinhCauHoiKiThi
{
  [Key]
  public int Id { get; set; }
  public double DoKho { get; set; }
  public int SoCauHoiTrongDe { get; set; }
  public double TongDiem { get; set; }

  public int IdKiThi { get; set; }
  public KiThi? KiThi { get; set; }
}


public class CauHoiKiThi
{
  [Key]
  public int Id { get; set; }
  public string? NoiDung { get; set; }
  public double? DoKho { get; set; }
  public LoaiCauHoi LoaiCauHoi { get; set; }
  public DateTime? ThoiGianCapNhatCuoi { get; set; }

  public int IdCauHoi { get; set; }
  public CauHoi? CauHoi { get; set; }

  public int IdKiThi { get; set; }
  public KiThi? KiThi { get; set; }

  public List<DapAnCauHoiKiThi>? DapAnCauHoi { get; set; }
}

public class DapAnCauHoiKiThi
{
  [Key]
  public int Id { get; set; }
  public string? NoiDung { get; set; }
  public bool? DungSai { get; set; }

  public int IdDapAnCauHoi { get; set; }
  public DapAnCauHoi? DapAnCauHoi { get; set; }

  public int IdCauHoi { get; set; }
  public CauHoiKiThi? CauHoi { get; set; }
}