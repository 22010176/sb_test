// See https://aka.ms/new-console-template for more information
using System.Text.Json;
using DatabaseModels;
using DatabaseModels.Models;
using Microsoft.EntityFrameworkCore;

Console.WriteLine("Hello, World!");

var options = new DbContextOptionsBuilder<AppDbContext>()
    .UseNpgsql("Host=localhost;Database=myapp;Username=postgres;Password=admin")
    .Options;
using var context = new AppDbContext(options);
// Ensure database is created
context.Database.EnsureCreated();


var a = (
  from bch in context.BoCauHoi
  join mh in context.MonHoc on bch.IdMonHoc equals mh.Id
  select new
  {
    bch.Id,
    bch.TenBoCauHoi,
    bch.IdMonHoc,
    bch.ThoiGianCapNhatCuoi,
    mh.TenMon,
    CauHoiDe = (
      from ch in context.CauHoi
      where ch.IdBoCauHoi == bch.Id && ch.DoKho == 0
      select new
      {
        ch.Id,
        ch.NoiDung,
      }
    ).Count(),
    CauHoiTrungBinh = (
      from ch in context.CauHoi
      where ch.IdBoCauHoi == bch.Id && ch.DoKho == 1
      select new
      {
        ch.Id,
        ch.NoiDung,
      }
    ).Count(),
    CauHoiKho = (
      from ch in context.CauHoi
      where ch.IdBoCauHoi == bch.Id && ch.DoKho == 2
      select new
      {
        ch.Id,
        ch.NoiDung,
      }
    ).Count(),
  }
).ToList();
string json = JsonSerializer.Serialize(a,
    new JsonSerializerOptions()
    {
      WriteIndented = true,
      PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    });

File.WriteAllText("cau_hinh_cau_hoi_ki_thi.json", json);