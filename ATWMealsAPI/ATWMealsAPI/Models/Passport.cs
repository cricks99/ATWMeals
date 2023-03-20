namespace ATWMealsAPI.Models
{
  public class Passport
  {
    public int Id { get; set; }
    public int UserId { get; set; }
    public int CountryId { get; set; }
    
    public virtual Country? Country { get; set; }
  }
}
