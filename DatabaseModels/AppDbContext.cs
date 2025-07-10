using DatabaseModels.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace DatabaseModels;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
  public string ConnectionString { get; } = options.Extensions.OfType<RelationalOptionsExtension>().FirstOrDefault()?.ConnectionString!;

  public DbSet<NguoiDung> NguoiDung { get; set; }
  public DbSet<LopHoc> LopHoc { get; set; }
  public DbSet<LopHoc_NguoiDung> LopHoc_NguoiDung { get; set; }

  public DbSet<MonHoc> MonHoc { get; set; }
  public DbSet<BoCauHoi> BoCauHoi { get; set; }
  public DbSet<CauHoi> CauHoi { get; set; }
  public DbSet<DapAnCauHoi> DapAnCauHoi { get; set; }
  public DbSet<MaMoiLopHoc> MaMoiLopHoc { get; set; }
  public DbSet<KiThi> KiThi { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);

    var nguoiDung = modelBuilder.Entity<NguoiDung>();
    var lopHoc = modelBuilder.Entity<LopHoc>();
    var lopHoc_NguoiDung = modelBuilder.Entity<LopHoc_NguoiDung>();

    var monHoc = modelBuilder.Entity<MonHoc>();
    var boCauHoi = modelBuilder.Entity<BoCauHoi>();
    var cauHoi = modelBuilder.Entity<CauHoi>();
    var dapAnCauHoi = modelBuilder.Entity<DapAnCauHoi>();

    nguoiDung.HasIndex(t => t.Email).IsUnique(true);
    nguoiDung.HasIndex(t => t.SoDienThoai).IsUnique(true);
    nguoiDung
    .Property(t => t.ThoiGianTao)
    .HasDefaultValueSql("CURRENT_TIMESTAMP")
    .ValueGeneratedOnAdd();

    lopHoc_NguoiDung.HasIndex(t => new { t.IdMaMoi, t.IdNguoiDung }).IsUnique(true);
    lopHoc_NguoiDung
    .Property(t => t.ThoiGianYeuCau)
    .HasDefaultValueSql("CURRENT_TIMESTAMP")
    .ValueGeneratedOnAdd();

    lopHoc.HasIndex(t => t.MaLop).IsUnique(true);
    lopHoc
    .Property(t => t.ThoiGianTao)
    .HasDefaultValueSql("CURRENT_TIMESTAMP")
    .ValueGeneratedOnAdd();

    monHoc.HasIndex(t => t.MaMon).IsUnique(true);
    monHoc
    .Property(t => t.ThoiGianCapNhatCuoi)
    .HasDefaultValueSql("CURRENT_TIMESTAMP")
    .ValueGeneratedOnAddOrUpdate();

    boCauHoi
    .Property(t => t.ThoiGianCapNhatCuoi)
    .HasDefaultValueSql("CURRENT_TIMESTAMP")
    .ValueGeneratedOnAddOrUpdate();

    cauHoi
    .Property(t => t.ThoiGianCapNhatCuoi)
    .HasDefaultValueSql("CURRENT_TIMESTAMP")
    .ValueGeneratedOnAddOrUpdate();
  }
}
