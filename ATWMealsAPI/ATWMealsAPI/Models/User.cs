namespace ATWMealsAPI.Models
{
  public class User
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Password { get; set; }
    public virtual List<Favorite>? Favorites { get; set; }
    public virtual List<Passport>? Passports { get; set; }
    public virtual List<MealRating> MealRatings { get; set; }
  }
}
