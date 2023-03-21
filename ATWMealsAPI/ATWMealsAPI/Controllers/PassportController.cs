using ATWMealsAPI.DAL;
using Microsoft.AspNetCore.Mvc;
using ATWMealsAPI.Models;

namespace ATWMealsAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]

  public class PassportController : ControllerBase
  {
    private ATWMealsRepository repo = new ATWMealsRepository();

    [HttpGet("{userId}")]
    public List<Passport> GetPassportByUserId(int userId)
    {
      return repo.GetPassportsByUserId(userId);
    }

    [HttpPost("add")]
    public void AddPassport(Passport passport)
    {
      repo.AddPassport(passport);
    }
  }
}
