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
        Success = true
      });
    }
  }
}

public record UpdateInput
{
  public int Id { get; set; }
  public TrangThaiMaMoi TrangThaiMaMoi { get; set; }
}