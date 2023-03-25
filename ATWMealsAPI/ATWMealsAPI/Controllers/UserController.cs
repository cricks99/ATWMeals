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

    [HttpGet("id/{id}")]
    public User GetUserById(int id)
    {
      User user = new User();
      user = repo.GetUserById(id);

      if (user != null)
        return user;
      else
        return new User {Id = 0, Name = ""};
    }

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

    [HttpPost("GetUserByPassword")]
    public User GetUserByPassword(User user)
    {
      User returnUser = new User();
      returnUser = repo.GetUserByPassword(user);

      if (returnUser != null)
        return returnUser;
      else
        return new User { Id = -1, Name = "" };
    }

    [HttpPost("add")]
    public User AddUser(User user)
    {
      //don't save any extra info that could be passed with this object
      if (user.Favorites != null)
        user.Favorites = null;
      if (user.Passports != null)
        user.Passports = null;
      if (user.MealRatings != null)
        user.MealRatings = null;

      return repo.AddUser(user);
    }
  }
}
