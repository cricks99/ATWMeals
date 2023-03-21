namespace ATWMealsAPI.Models
{
  public class MealRating
  {
    public int Id { get; set; }
    public int Rating { get; set; }
    public int MealId { get; set; }
    public int UserId { get; set; }
  }
}
