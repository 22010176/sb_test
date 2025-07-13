using System.ComponentModel.DataAnnotations;
using System.Data.Common;

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