using ATWMealsAPI.DAL;
using Microsoft.AspNetCore.Mvc;
using ATWMealsAPI.Models;

namespace ATWMealsAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]

  public class UserController : ControllerBase
  {
    private ATWMealsRepository repo = new ATWMealsRepository();

    [HttpGet("{userName}")]
    public User GetUserByName(string userName)
    {
      return repo.GetUserByName(userName);
    }

    [HttpPost("ValidPassword")]
    public bool PasswordMatches(User user)
    {
      return repo.PasswordMatches(user);
    }

    [HttpPost("add")]
    public void AddUser(User user)
    {
      //don't save any extra info that could be passed with this object
      if (user.Favorites != null)
        user.Favorites = null;
      if (user.Passports != null)
        user.Passports = null;
      if (user.MealRatings != null)
        user.MealRatings = null;

      repo.AddUser(user);
    }
  }
}
