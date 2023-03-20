using ATWMealsAPI.DAL;
using Microsoft.AspNetCore.Mvc;
using ATWMealsAPI.Models;

namespace ATWMealsAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]

  public class MealController : ControllerBase
  {
    private ATWMealsRepository repo = new ATWMealsRepository();

    [HttpGet("{id}")]
    public Meal GetMealById(int id)
    {
      Meal meal = repo.GetMealById(id);
      if (meal != null)
        meal.AvgRating = repo.GetAverageRatingByMealId(meal.Id);

      return meal;
    }

    [HttpGet("mealDBId/{mealDBId}")]
    public Meal GetMealByMealDBId(int mealDBId)
    {
      Meal meal = repo.GetMealByMealDBId(mealDBId);
      if (meal != null)
        meal.AvgRating = repo.GetAverageRatingByMealId(meal.Id);

      return meal;
    }

    [HttpGet("country/{countryId}")]
    public List<Meal> GetMealsByContryId(int countryId)
    {
      List<Meal> meals = new List<Meal>();

      foreach (Meal meal in repo.GetMealsByCountryId(countryId))
      {
        meal.AvgRating = repo.GetAverageRatingByMealId(meal.Id);
        meals.Add(meal);
      }

      return meals;
    }

    [HttpGet("minimum/{minRating}")]
    public List<Meal> GetMinimumAverageMealRatings(double minRating)
    {
      List<Meal> meals = new List<Meal>();
      double rating;

      foreach (Meal meal in repo.GetAllMeals())
      {
        rating = repo.GetAverageRatingByMealId(meal.Id);

        if (rating >= minRating)
        {
          meal.AvgRating = rating;
          meals.Add(meal);
        }
      }

      return meals;
    }

    [HttpGet("minimum/{minRating}/{countryId}")]
    public List<Meal> GetMinimumAverageMealRatings(double minRating, int countryId)
    {
      List<Meal> meals = new List<Meal>();
      double rating;

      foreach (Meal meal in repo.GetMealsByCountryId(countryId))
      {
        rating = repo.GetAverageRatingByMealId(meal.Id);
        if (rating >= minRating)
        {
          meal.AvgRating = rating;
          meals.Add(meal);
        }
      }

      return meals;
    }

    [HttpPost("add")]
    public void AddMeal(Meal meal)
    {
      //don't save any extra info that could be passed with this object
      if (meal.Country != null)
        meal.Country = null;
      meal.AvgRating = 0;

      repo.AddMeal(meal);
    }
  }
}
