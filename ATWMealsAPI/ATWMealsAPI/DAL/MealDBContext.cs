using ATWMealsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ATWMealsAPI.DAL
{
  public class MealDBContext : DbContext
  {
    public MealDBContext()
    {

    }

    public MealDBContext(DbContextOptions options) : base(options)
    {

    }

    public DbSet<Country> Countries { get; set; }
    public DbSet<Favorite> Favorites { get; set; }
    public DbSet<Meal> Meals { get; set; }
    public DbSet<MealRating> MealRatings { get; set; }
    public DbSet<Passport> Passports { get; set; }
    public DbSet<User> Users { get; set; }

    private static IConfigurationRoot _configuration;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      if (!optionsBuilder.IsConfigured)
      {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

        _configuration = builder.Build();
        string cnstr = _configuration.GetConnectionString("ATWMealsDb");
        optionsBuilder.UseSqlServer(cnstr);
      }
    }
  }
}
