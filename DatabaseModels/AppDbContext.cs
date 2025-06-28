using DatabaseModels.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace DatabaseModels;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
  public string ConnectionString { get; } = options.Extensions.OfType<RelationalOptionsExtension>().FirstOrDefault()?.ConnectionString!;

  public DbSet<NguoiDung> NguoiDung { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);
  }
}
