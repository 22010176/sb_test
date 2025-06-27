using DatabaseModels;
using Microsoft.AspNetCore.Mvc;

namespace Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherController(AppDbContext context) : ControllerBase
{
  readonly AppDbContext context = context;

  [HttpGet]
  public IActionResult GetWeather()
  {

    return Ok(new { temp = "32°C", status = "Sunny" });
  }
}