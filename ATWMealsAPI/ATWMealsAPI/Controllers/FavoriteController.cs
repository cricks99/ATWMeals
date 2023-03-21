using ATWMealsAPI.DAL;
using Microsoft.AspNetCore.Mvc;
using ATWMealsAPI.Models;

namespace ATWMealsAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]

  public class FavoriteController : ControllerBase
  {
    private ATWMealsRepository repo = new ATWMealsRepository();

    [HttpGet("{userId}")]
    public List<Favorite> GetFavoritesByUserId(int userId)
    {
      return repo.GetFavoritesByUserId(userId);
    }

    [HttpGet("{userId}/{mealId}")]
    public Favorite GetFavoritesByUserIdByMealId(int userId, int mealId)
    {
      return repo.GetFavoriteByUserIdByMealId(userId, mealId);
    }

    [HttpPost("setUnset/{userId}/{mealId}")]
    public void SetUnsetFavorite(int userId, int mealId)
    {
      Favorite favorite = repo.GetFavoriteByUserIdByMealId(userId, mealId);

      if (favorite == null)
        repo.AddFavorite(new Favorite { UserId = userId, MealId = mealId });
      else
        repo.RemoveFavorite(favorite);
    }
  }
}
