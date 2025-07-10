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
}

