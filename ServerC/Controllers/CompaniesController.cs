using Microsoft.AspNetCore.Mvc;
using ServerC.Models;
using ServerC.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace ServerC.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class CompaniesController : ControllerBase
  {
    private readonly ICompaniesService _companiesService;

    public CompaniesController(ICompaniesService companiesService)
    {
      _companiesService = companiesService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Company>>> GetAllCompanies()
    {
      IEnumerable<Company> companies = await _companiesService.GetAllCompaniesAsync();
      return Ok(companies);
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<Company>> GetCompany(int id) // Changed from GetCompanyById to GetCompany
    {
      Company company = await _companiesService.GetCompanyByIdAsync(id);
      if (company == null)
      {
        return NotFound();
      }

      return company;
    }

    [HttpPost]
    public async Task<ActionResult<Company>> CreateCompany(string name)
    {
      if (string.IsNullOrEmpty(name)) // Changed from CompanyName to Name
      {
        return BadRequest("Name cannot be empty."); // Changed from CompanyName to Name
      }

      Company createdCompany = await _companiesService.CreateCompanyAsync(name); // Changed from CompanyName to Name
      if (createdCompany == null)
      {
        return StatusCode(500, "An error occurred while creating the company.");
      }

      return Ok(createdCompany);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCompany(int id, [FromBody] Company company) // Changed from UpdateCompanyById to UpdateCompany
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);
      if (id != company.id) // Changed from CompanyID to Id
      {
        return BadRequest("Id in the URL does not match the Id in the request body."); // Changed from CompanyID to Id
      }

      Company updatedCompany = await _companiesService.UpdateCompanyAsync(company);
      if (updatedCompany == null)
      {
        return StatusCode(500, "An error occurred while updating the company.");
      }

      return Ok(updatedCompany);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCompany(int id) // Changed from DeleteCompanyById to DeleteCompany
    {
      bool isDeleted = await _companiesService.DeleteCompanyAsync(id);
      if (!isDeleted)
      {
        return StatusCode(500, "An error occurred while deleting the company.");
      }

      return NoContent();
    }
  }
}
