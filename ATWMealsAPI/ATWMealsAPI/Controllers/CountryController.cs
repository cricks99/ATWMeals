using ATWMealsAPI.DAL;
using Microsoft.AspNetCore.Mvc;
using ATWMealsAPI.Models;

namespace ATWMealsAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]

  public class CountryController : ControllerBase
  {
    private ATWMealsRepository repo = new ATWMealsRepository();

    [HttpGet()]
    public List<Country> GetAllCountries()
    {
      return repo.GetAllCountries();
    }

    [HttpGet("{id}")]
    public Country GetCountryById(int id)
    {
      return repo.GetCountryById(id);
    }

    [HttpGet("name/{name}")]
    public int GetCountryIdByName(string name)
    {
      return repo.GetCountryIdByName(name);
    }

    //only used on initial load or adding missing countries
    [HttpPost("addList")]
    public void AddCountries(List<Country> countryList)
    {
      foreach(Country country in countryList)
        if (repo.GetCountryByName(country.Name) == null)
          repo.AddCountry(country.Name);
    }
  }
}
