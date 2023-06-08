using Microsoft.AspNetCore.Mvc;
using ServerC.Interfaces;
using ServerC.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ServerC.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class FeaturesController : ControllerBase
  {
    private readonly IFeaturesService _featuresService;

    public FeaturesController(IFeaturesService featuresService)
    {
      _featuresService = featuresService;
    }

    [HttpPost]
    public async Task<ActionResult<Feature>> CreateFeature([FromBody] CreateFeatureInput input)
    {
      if (string.IsNullOrEmpty(input.name) || input.companyId <= 0)
      {
        return BadRequest("Feature name cannot be empty and companyId must be valid.");
      }

      Feature createdFeature = await _featuresService.CreateFeatureAsync(input);
      if (createdFeature == null)
      {
        return StatusCode(500, "An error occurred while creating the feature.");
      }

      return Ok(createdFeature);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Feature>>> GetAllFeatures()
    {
      IEnumerable<Feature> features = await _featuresService.GetAllFeaturesAsync();
      return Ok(features);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Feature>> GetFeatureById(int id)
    {
      if (id <= 0)
      {
        return BadRequest("Feature Id must be valid.");
      }

      Feature feature = await _featuresService.GetFeatureByIdAsync(id);
      if (feature == null)
      {
        return NotFound();
      }

      return Ok(feature);
    }

    [HttpGet("company/{companyId}")]
    public async Task<ActionResult<IEnumerable<Feature>>> GetFeaturesByCompany(int companyId)
    {
      IEnumerable<Feature> features = await _featuresService.GetFeaturesByCompanyIdAsync(companyId);
      return Ok(features);
    }

    [HttpPut]
    public async Task<ActionResult<Feature>> UpdateFeature([FromBody] Feature feature)
    {
      if (feature.id <= 0 || string.IsNullOrEmpty(feature.name) || feature.companyId <= 0)
      {
        return BadRequest("Feature Id, name, and companyId must be valid.");
      }

      Feature updatedFeature = await _featuresService.UpdateFeatureAsync(feature);
      if (updatedFeature == null)
      {
        return StatusCode(500, "An error occurred while updating the feature.");
      }

      return Ok(updatedFeature);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFeature(int id)
    {
      if (id <= 0)
      {
        return BadRequest("Feature Id must be valid.");
      }

      bool result = await _featuresService.DeleteFeatureAsync(id);
      if (!result)
      {
        return StatusCode(500, "An error occurred while deleting the feature.");
      }

      return Ok();
    }
  }
}
