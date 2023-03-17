namespace ATWMealsAPI.Models
{
  public class MealRating
  {
    public int Id { get; set; }
    public int Rating { get; set; }
    public int MealId { get; set; }
    public int UserId { get; set; }
    
    public virtual Meal Meal { get; set; }

    public virtual User User { get; set; }
  }
}
