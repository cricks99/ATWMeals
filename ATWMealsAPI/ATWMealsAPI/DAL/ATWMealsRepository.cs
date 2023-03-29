using ATWMealsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ATWMealsAPI.DAL
{
  public class ATWMealsRepository
  {
    private MealDBContext _dbContext = new MealDBContext();

    public List<Country> GetAllCountries()
    {
      return _dbContext.Countries
        .AsNoTracking()
        .ToList();
    }

    public Country GetCountryById(int id)
    {
      return _dbContext.Countries
        .Where(x => x.Id == id)
        .AsNoTracking()
        .FirstOrDefault();
    }

    public Country GetCountryByName(string name)
    {
      return _dbContext.Countries
        .Where(x => x.Name == name)
        .AsNoTracking()
        .FirstOrDefault();
    }

    public int GetCountryIdByName(string name)
    {
      return _dbContext.Countries
        .Where(x => x.Name == name)
        .AsNoTracking()
        .Select(x => x.Id)
        .FirstOrDefault();
    }

    //only used on initial load or adding missing countries
    public void AddCountry(string newCountry)
    {
      Country country = new Country() { Name = newCountry };

      _dbContext.Countries.Add(country);
      _dbContext.SaveChanges();
    }
        
    public List<Favorite> GetAllFavorites()
    {
      return _dbContext.Favorites
          .AsNoTracking()
          .ToList();
    }

    public List<Favorite> GetFavoritesByUserId(int userId)
    {
      return _dbContext.Favorites
        .Where(x => x.UserId == userId)
        .AsNoTracking()
        .ToList();
    }

    public Favorite GetFavoriteByUserIdByMealId(int userId, int mealId)
    {
      return _dbContext.Favorites
        .Where(x => x.UserId == userId && x.MealId == mealId)
        .AsNoTracking()
        .FirstOrDefault();
    }

    public void AddFavorite(Favorite newFavorite)
    {
      _dbContext.Favorites.Add(newFavorite);
      _dbContext.SaveChanges();
    }

    public void RemoveFavorite(Favorite removeFavorite)
    {
      _dbContext.Favorites.Remove(removeFavorite);
      _dbContext.SaveChanges();
    }

    public List<Meal> GetAllMeals()
    {
      return _dbContext.Meals
        .Include(x => x.Country)
        .Include(x => x.MealRating)
        .AsNoTracking()
        .ToList();
    }

    public List<Meal> GetMealsByCountryId(int countryId)
    {
      return _dbContext.Meals
        .Where(x => x.CountryId == countryId)
        .Include(x => x.Country)
        .Include(x => x.MealRating)
        .AsNoTracking()
        .ToList();
    }

    public Meal GetMealById(int id)
    {
      return _dbContext.Meals
        .Where(x => x.Id == id)
        .Include(x => x.Country)
        .Include(x => x.MealRating)
        .AsNoTracking()
        .FirstOrDefault();
    }

    public Meal GetMealByMealDBId(int id)
    {
      return _dbContext.Meals
        .Where(x => x.MealDBId == id)
        .Include(x => x.Country)
        .Include(x => x.MealRating)
        .AsNoTracking()
        .FirstOrDefault();
    }

    public void AddMeal(Meal newMeal)
    {
      _dbContext.Meals.Add(newMeal);
      _dbContext.SaveChanges();
    }

    public List<MealRating> GetRatingsByMealId(int mealId)
    {
      return _dbContext.MealRatings
        .Where(x => x.MealId == mealId)
        .AsNoTracking()
        .ToList();
    }

    public List<MealRating> GetRatingsByUserId(int id)
    {
      return _dbContext.MealRatings
        .Where(x => x.UserId == id)
        .AsNoTracking()
        .ToList();
    }

    public double GetAverageRatingByMealId(int mealId)
    {
      try
      {
        return Math.Round(_dbContext.MealRatings
          .Where(x => x.MealId == mealId)
          .AsNoTracking()
          .Select(x => x.Rating)
          .Average() * 10) / 10;
      }
      catch
      {
        return 0;
      }
    }

    public void AddMealRating(MealRating newMealRating)
    {
      _dbContext.MealRatings.Add(newMealRating);
      _dbContext.SaveChanges();
    }

    public List<Passport> GetPassportsByUserId(int id)
    {
      return _dbContext.Passports
        .Where(x => x.UserId == id)
        .Include(x => x.Country)
        .AsNoTracking()
        .ToList();
    }

    public void AddPassport(Passport newPassport)
    {
      _dbContext.Passports.Add(newPassport);
      _dbContext.SaveChanges();
    }

    public User GetUserById(int id)
    {
      return _dbContext.Users
        .Where(x => x.Id == id)
        .Include(x => x.Favorites)
        .Include(x => x.Passports)
        .ThenInclude(x => x.Country)
        .Include(x => x.MealRatings)
        .AsNoTracking()
        .FirstOrDefault();
    }

    public User GetUserByName(string name)
    {
      return _dbContext.Users
        .Where(x => x.Name.ToLower() == name.ToLower())
        .Include(x => x.Favorites)
        .Include(x => x.Passports)
        .ThenInclude(x => x.Country)
        .Include(x => x.MealRatings)
        .AsNoTracking()
        .FirstOrDefault();
    }

    public User AddUser(User newUser)
    {
      if (GetUserByName(newUser.Name) == null)
      {
        _dbContext.Users.Add(newUser);
        _dbContext.SaveChanges();

        return GetUserByName(newUser.Name);
      }

      return new User();
    }

    public bool PasswordMatches(User user)
    {
      return _dbContext.Users
        .Where(x => x.Name.ToLower() == user.Name.ToLower()
          && x.Password == user.Password)
        .AsNoTracking()
        .Any();
    }

    public User GetUserByPassword(User user)
    {
      return _dbContext.Users
        .Where(x => x.Name.ToLower() == user.Name.ToLower()
          && x.Password == user.Password)
        .Include(x => x.Favorites)
        .Include(x => x.Passports)
        .ThenInclude(x => x.Country)
        .Include(x => x.MealRatings)
        .AsNoTracking()
        .FirstOrDefault();
    }
  }
}
