namespace ATWMealsAPI.Models
{
  public class Meal
  {
    public int Id { get; set; }
    public int MealDBId { get; set; }
    public string Name { get; set; }
    public int CountryId { get; set; }

    public virtual List<MealRating>? MealRatings { get; set; }

    public virtual Country Country { get; set; }
  }
}
