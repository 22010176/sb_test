using System.ComponentModel.DataAnnotations;

namespace DatabaseModels.Models;

public class MonHoc
{
  [Key]
  public int Id { get; set; }
  public string? MaMon { get; set; }
  public string? TenMon { get; set; }
  public DateTime? ThoiGianCapNhatCuoi { get; set; }


  public int IdGiangVien { get; set; }
  public NguoiDung? NguoiTao { get; set; }

  public List<BoCauHoi>? BoCauHoi { get; set; }
}

public class BoCauHoi
{
  [Key]
  public int Id { get; set; }
  public string? TenBoCauHoi { get; set; }
  public DateTime? ThoiGianCapNhatCuoi { get; set; }

  public int IdMonHoc { get; set; }
  public MonHoc? MonHoc { get; set; }

  public List<CauHoi>? CauHoi { get; set; }
}

public class CauHoi
{
  [Key]
  public int Id { get; set; }
  public string? NoiDung { get; set; }
  public double? DoKho { get; set; }
  public DateTime? ThoiGianCapNhatCuoi { get; set; }

  public int IdBoCauHoi { get; set; }
  public BoCauHoi? BoCauHoi { get; set; }

  public List<DapAnCauHoi>? DapAnCauHoi { get; set; }
}

public class DapAnCauHoi
{
  [Key]
  public int Id { get; set; }
  public string? NoiDung { get; set; }
  public bool? DungSai { get; set; }

  public int IdCauHoi { get; set; }
  public CauHoi? CauHoi { get; set; }
}