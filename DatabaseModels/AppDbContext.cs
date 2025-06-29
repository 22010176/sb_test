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

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);

    var nguoiDung = modelBuilder.Entity<NguoiDung>();
    var lopHoc = modelBuilder.Entity<LopHoc>();
    var lopHoc_NguoiDung = modelBuilder.Entity<LopHoc_NguoiDung>();

    nguoiDung.HasIndex(t => t.Email).IsUnique(true);
    nguoiDung.HasIndex(t => t.SoDienThoai).IsUnique(true);
    nguoiDung.Property(t => t.ThoiGianTao).HasDefaultValue("CURRENT_TIMESTAMP");

    lopHoc_NguoiDung.HasIndex(t => new { t.IdLopHoc, t.IdNguoiDung }).IsUnique(true);
    lopHoc_NguoiDung.Property(t => t.ThoiGianYeuCau).HasDefaultValue("CURRENT_TIMESTAMP");

    lopHoc.HasIndex(t => t.MaLop).IsUnique(true);
    lopHoc.Property(t => t.ThoiGianTao).HasDefaultValue("CURRENT_TIMESTAMP");
  }
}
