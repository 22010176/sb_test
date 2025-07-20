using System.ComponentModel.DataAnnotations;

namespace DatabaseModels.Models;

public enum TrangThaiBaiLam
{
  DaTraLoi,
  ChuaTraLoi,
  DanhDau
}

public class CauHoiThiSinh
{
  [Key]
  public int Id { get; set; }
  public int SoThutu { get; set; }
  public TrangThaiBaiLam TrangThai { get; set; } = TrangThaiBaiLam.ChuaTraLoi;

  public int IdCauHoi { get; set; }
  public CauHoiKiThi? CauHoi { get; set; }

  public int IdThiSinh { get; set; }
  public NguoiDung? ThiSinh { get; set; }
}

public class DapAnThiSinh
{
  [Key]
  public int Id { get; set; }
  public int IdCauHoiThiSinh { get; set; }
  public CauHoiThiSinh? CauHoiThiSinh { get; set; }

  public int IdDapAn { get; set; }
  public DapAnCauHoiKiThi? DapAn { get; set; }
}