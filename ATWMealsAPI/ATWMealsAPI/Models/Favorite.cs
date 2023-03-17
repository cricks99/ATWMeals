using System.Net.Sockets;

namespace ATWMealsAPI.Models
{
  public class Favorite
  {
      public int Id { get; set; }
      public int UserId { get; set; }
      public int MealId { get; set; }

      public virtual User User { get; set; }
      public virtual Meal Meal { get; set; }
  }
}
