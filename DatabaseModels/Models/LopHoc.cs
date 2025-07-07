using System.ComponentModel.DataAnnotations;

namespace DatabaseModels.Models;

public class MaMoiLopHoc
{
    [Key]
    public int Id { get; set; }
    public Guid? MaMoi { get; set; }
    public DateTime NgayTao { get; set; }

    public int IdLopHoc { get; set; }
    public LopHoc? LopHoc { get; set; }

    public List<LopHoc_NguoiDung>? LopHoc_NguoiDung { get; set; }
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

    public List<MaMoiLopHoc>? MaMoiLopHoc { get; set; }
}

public enum TrangThaiMaMoi
{
    DANG_CHO, DONG_Y, TU_CHOI
}
public class LopHoc_NguoiDung
{
    [Key]
    public int Id { get; set; }
    public DateTime? ThoiGianYeuCau { get; set; }
    public TrangThaiMaMoi TrangThaiMaMoi { get; set; } = TrangThaiMaMoi.DANG_CHO;

    public int IdMaMoi { get; set; }
    public MaMoiLopHoc? MaMoiLopHoc { get; set; }

    public int IdNguoiDung { get; set; }
    public NguoiDung? NguoiDung { get; set; }
}