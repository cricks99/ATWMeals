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

    [HttpGet("")]
    public List<Meal> GetAllMeals()
    {
      List<Meal> meals = new List<Meal>();

      foreach(Meal meal in repo.GetAllMeals())
      {
        meal.AvgRating = repo.GetAverageRatingByMealId(meal.Id);
        meals.Add(meal);
      }

      return meals;
    }

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

    [HttpPost("add/{mealDBId}/{name}/{countryId}")]
    public int AddMeal(int mealDBId, string name, int countryId)
    {
      Meal meal = new Meal();
      meal.MealDBId = mealDBId;
      meal.Name = name;
      meal.CountryId = countryId;

      repo.AddMeal(meal);

      return repo.GetMealByMealDBId(mealDBId).Id;
    }
  }
}
