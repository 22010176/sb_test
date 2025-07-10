using System.Security.Cryptography.X509Certificates;
using DatabaseModels;
using DatabaseModels.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Utilities;

namespace TeacherControllers;

[ApiController]
[Route("api/[controller]")]
public class LopHoc_HocSinhController(AppDbContext context) : ControllerBase
{
  readonly AppDbContext context = context;

  [HttpPost]
  [Authorize]
  public async Task<IActionResult> MoiHocSinhBangSoDienThoai(AddByPhoneInput input)
  {
    try
    {
      NguoiDung? nguoiDung = await context.NguoiDung.FirstOrDefaultAsync(i => i.SoDienThoai == input.SoDienThoai);
      LopHoc? lopHoc = await context.LopHoc.FirstOrDefaultAsync(i => i.Id == input.IdLopHoc);

      if (nguoiDung == null) throw new Exception("");
      if (lopHoc == null) throw new Exception("");

      Guid guid = Guid.NewGuid();
      MaMoiLopHoc maMoiLopHoc = new()
      {
        NgayTao = DateTime.UtcNow,
        IdLopHoc = lopHoc.Id,
        MaMoi = guid
      };

      await context.MaMoiLopHoc.AddAsync(maMoiLopHoc);
      await context.SaveChangesAsync();

      maMoiLopHoc = await context.MaMoiLopHoc.FirstAsync(i => i.MaMoi == guid);
      LopHoc_NguoiDung lopHoc_NguoiDung = new()
      {
        ThoiGianYeuCau = DateTime.UtcNow,
        TrangThaiMaMoi = TrangThaiMaMoi.DONG_Y,
        IdMaMoi = maMoiLopHoc.Id,
        IdNguoiDung = nguoiDung.Id
      };
      await context.LopHoc_NguoiDung.AddAsync(lopHoc_NguoiDung);
      await context.SaveChangesAsync();
      return Ok(new ResponseFormat
      {
        Data = "",
        Message = "",
        Success = false
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Data = err,
        Message = "",
        Success = false
      });
    }
  }

  [HttpPut]
  [Authorize]
  public async Task<IActionResult> Update(UpdateInput input)
  {
    try
    {
      LopHoc_NguoiDung? lopHoc_NguoiDung = await context.LopHoc_NguoiDung.FirstOrDefaultAsync(i => i.Id == input.Id);
      if (lopHoc_NguoiDung == null) throw new Exception("");

      lopHoc_NguoiDung.TrangThaiMaMoi = input.TrangThaiMaMoi;
      await context.SaveChangesAsync();

      return Ok(new ResponseFormat
      {
        Data = "",
        Message = "",
        Success = true
      });
    }
    catch (Exception err)
    {
      return BadRequest(new ResponseFormat
      {
        Data = err,
        Message = "",
        Success = false
      });
    }
  }

  [HttpDelete("{id}")]
  [Authorize(Roles = "GIANG_VIEN")]
  public async Task<IActionResult> DeleteHocSinh(int id)
  {
    try
    {
      LopHoc_NguoiDung? lopHoc_NguoiDung = await context.LopHoc_NguoiDung.FirstOrDefaultAsync(i => i.Id == id);
      if (lopHoc_NguoiDung == null) throw new Exception("");

      context.LopHoc_NguoiDung.Remove(lopHoc_NguoiDung);
      await context.SaveChangesAsync();

      return Ok(new ResponseFormat
      {
        Message = "",
        Data = "",
        Success = true
      });
    }
    catch (Exception err)
    {
      return Ok(new ResponseFormat
      {
        Message = "",
        Data = err,
        Success = false
      });
    }
  }
}

public record UpdateInput
{
  public int Id { get; set; }
  public TrangThaiMaMoi TrangThaiMaMoi { get; set; }
}


public record AddByPhoneInput
{
  public int IdLopHoc { get; set; }
  public string? SoDienThoai { get; set; }
}