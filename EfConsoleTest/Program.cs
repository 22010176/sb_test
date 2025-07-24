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
        from kt in context.KiThi
        join mh in context.MonHoc on kt.IdMonHoc equals mh.Id
        // where
        //   kt.Id == idKiThi
        //   && mh.IdGiangVien == userId
        select new
        {
          kt.Id,
          kt.TenKiThi,
          IdMonHoc = mh.Id,
          BoCauHoi = (
            from bch in context.BoCauHoi
            where bch.IdMonHoc == mh.Id
            orderby bch.Id
            select new
            {
              bch.Id,
              bch.TenBoCauHoi,
              CauHoi = (
                from ch in context.CauHoi
                join chkt in context.CauHoiKiThi on ch.Id equals chkt.IdCauHoi
                where ch.IdBoCauHoi == bch.Id
                orderby chkt.Id
                select new
                {
                  chkt.Id,
                  chkt.NoiDung,
                  CoTrongDe = chkt.IdKiThi == kt.Id,
                  LoaiCauHoi = chkt.LoaiCauHoi.ToString(),
                  chkt.DoKho,
                  ch.ThoiGianCapNhatCuoi,
                  DapAn = (
                    from da in context.DapAnCauHoiKiThi
                    where da.IdCauHoi == chkt.Id
                    orderby da.Id
                    select new
                    {
                      da.Id,
                      da.NoiDung,
                      da.DungSai
                    }
                  ).ToList()
                }
              ).ToList(),
            }
          ).ToList()
        }
).ToList();
string json = JsonSerializer.Serialize(a,
    new JsonSerializerOptions()
    {
      WriteIndented = true,
      PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    });

File.WriteAllText("cau_hinh_cau_hoi_ki_thi.json", json);