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
      {
        for (int i = 0; i < user.MealRatings.Count; i++)
        {
          user.MealRatings[i].CountryName = repo.GetCountryName(user.MealRatings[i].MealId);
        }

        return user;
      }
        
      else
        return new User {Id = 0, Name = ""};
    }

    [HttpGet("{userName}")]
    public User GetUserByName(string userName)
    {
      User user = repo.GetUserByName(userName);

      if (user != null)
        for (int i = 0; i < user.MealRatings.Count; i++)
        {
          user.MealRatings[i].CountryName = repo.GetCountryName(user.MealRatings[i].MealId);
        }

      return user;
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
      {
        for (int i = 0; i < returnUser.MealRatings.Count; i++)
        {
          returnUser.MealRatings[i].CountryName = repo.GetCountryName(returnUser.MealRatings[i].MealId);
        }

        return returnUser;
      }
      else
        return new User { Id = -1, Name = "" };
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
