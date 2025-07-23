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
  from lh in context.LopHoc
  where lh.IdGiangVien == 605
  orderby lh.ThoiGianTao descending
  select new
  {
    lh.Id,
    lh.MaLop,
    lh.TenLop,
    lh.MoTa,
    lh.ThoiGianTao,
    lh.IdGiangVien,
    SoLuongSinhVien = (
      from mm in context.MaMoiLopHoc
      join lh_nd in context.LopHoc_NguoiDung on mm.Id equals lh_nd.IdMaMoi
      where
        mm.IdLopHoc == lh.Id
        && lh_nd.TrangThaiMaMoi == TrangThaiMaMoi.DONG_Y
      select lh_nd
    ).Count()
  }
).ToList();
string json = JsonSerializer.Serialize(a,
    new JsonSerializerOptions()
    {
      WriteIndented = true,
      PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    });

File.WriteAllText("cau_hinh_cau_hoi_ki_thi.json", json);