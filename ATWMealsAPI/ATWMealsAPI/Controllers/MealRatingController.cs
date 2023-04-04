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
      List<MealRating> mealRatings = new List<MealRating>();

      foreach(MealRating mealRating in repo.GetRatingsByMealId(mealId))
      {
        mealRating.CountryName = repo.GetCountryName(mealId);
        mealRatings.Add(mealRating);
      }

      return mealRatings;
    }

    [HttpGet("user/{userId}")]
    public List<MealRating> GetRatingsByUserId(int userId)
    {
      List<MealRating> mealRatings = new List<MealRating>();

      foreach (MealRating mealRating in repo.GetRatingsByUserId(userId))
      {
        mealRating.CountryName = repo.GetCountryName(mealRating.MealId);
        mealRatings.Add(mealRating);
      }

      return mealRatings;
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
