namespace ATWMealsAPI.Models
{
  public class Passport
  {
    public int Id { get; set; }
    public int UserId { get; set; }
    
    public virtual User User { get; set; }
    public virtual Country Country { get; set; }
  }
}
