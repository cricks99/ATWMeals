using ATWMealsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ATWMealsAPI.DAL
{
  public class ATWMealsRepository
  {
    private MealDBContext _dbContext = new MealDBContext();

    public List<Country> GetAllCountries()
    {
      return _dbContext.Countries.ToList();
    }

    public void setUnsetFavorite(int userId, int mealId)
    {
      Favorite favorite = _dbContext.Favorites.FirstOrDefault(x => x.UserId == userId && x.MealId == mealId);

      if (favorite == null)
      {
        favorite = new Favorite();
        favorite.UserId = userId;
        favorite.MealId = mealId;

        _dbContext.Favorites.Add(favorite);
      }
      else
        _dbContext.Favorites.Remove(favorite);

      _dbContext.SaveChanges();
    }

    public User GetUserByName(string name)
    {
      return _dbContext.Users.Where(x => x.Name == name).Include("Favorite").Include("Passports").Include("MealRatings").FirstOrDefault();
    }
  }
}
