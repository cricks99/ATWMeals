using ATWMealsAPI.DAL;
using Microsoft.AspNetCore.Mvc;
using ATWMealsAPI.Models;

namespace ATWMealsAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]

  public class MealRatingController : ControllerBase
  {
    private ATWMealsRepository repo = new ATWMealsRepository();

    [HttpGet("{mealId}")]
    public List<MealRating> GetRatingsByMealId(int mealId)
    {
      return repo.GetRatingsByMealId(mealId);
    }

    [HttpGet("user/{userId}")]
    public List<MealRating> GetRatingsByUserId(int userId)
    {
      return repo.GetRatingsByUserId(userId);
    }

    [HttpGet("average/{mealId}")]
    public double GetAverageRatingByMealId(int mealId)
    {
      return repo.GetAverageRatingByMealId(mealId);
    }

    [HttpPost("add")]
    public void AddMealRating(MealRating mealRating)
    {
      repo.AddMealRating(mealRating);
    }
  }
}
