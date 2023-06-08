using Microsoft.AspNetCore.Mvc;
using ServerC.Interfaces;
using ServerC.Models;

namespace ServerC.Controllers
{
  [Route("[controller]")]
  [ApiController]
  public class TestCasesController : ControllerBase
  {
    private readonly ITestCasesService _testCasesService;

    public TestCasesController(ITestCasesService testCasesService)
    {
      _testCasesService = testCasesService;
    }

    [HttpPost]
    public async Task<ActionResult<TestCase>> CreateTestCase([FromBody] CreateTestCaseInput input)
    {
      if (string.IsNullOrEmpty(input.name) || input.featureId <= 0)
      {
        return BadRequest("TestCase Id, name, and featureId must be valid.");
      }

      TestCase createdTestCase = await _testCasesService.CreateTestCaseAsync(input);
      if (createdTestCase == null)
      {
        return StatusCode(500, "An error occurred while creating the TestCase.");
      }

      return Ok(createdTestCase);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TestCase>>> GetAllTestCases()
    {
      IEnumerable<TestCase> testCases = await _testCasesService.GetAllTestCasesAsync();
      return Ok(testCases);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TestCase>> GetTestCaseById(int id)
    {
      if (id <= 0)
      {
        return BadRequest("TestCase Id must be valid.");
      }

      TestCase testCase = await _testCasesService.GetTestCaseByIdAsync(id);
      if (testCase == null)
      {
        return NotFound();
      }

      return Ok(testCase);
    }

    [HttpGet("feature/{featureId}")]
    public async Task<ActionResult<IEnumerable<TestCase>>> GetAllTestCasesByFeatureId(int featureId)
    {
      if (featureId <= 0)
      {
        return BadRequest("Feature Id must be valid.");
      }

      IEnumerable<TestCase> testCases = await _testCasesService.GetAllTestCasesByFeatureIdAsync(featureId);
      return Ok(testCases);
    }

    [HttpPut]
    public async Task<ActionResult<TestCase>> UpdateTestCase([FromBody] UpdateTestCaseInput input)
    {
      if (input.id <= 0)
      {
        return BadRequest("TestCase Id, name, and featureId must be valid.");
      }

      TestCase updatedTestCase = await _testCasesService.UpdateTestCaseAsync(input);
      if (updatedTestCase == null)
      {
        return StatusCode(500, "An error occurred while updating the TestCase.");
      }

      return Ok(updatedTestCase);
    }

    [HttpPut("updateTestCases")]
    public async Task<IActionResult> UpdateTestCases([FromBody] List<UpdateTestCaseInput> input)
    {
      try
      {
        await _testCasesService.UpdateTestCasesAsync(input);
        return Ok();
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"Internal server error: {ex}");
      }
    }





    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTestCase(int id)
    {
      int result = await _testCasesService.DeleteTestCaseAsync(id);
      if (result == 0)
        return NotFound();

      return NoContent();
    }

    [HttpPost("move")]
    public async Task<IActionResult> MoveTestCases(string testCaseIdsList, int amountOfRowsToMove)
    {
      await _testCasesService.MoveTestCasesAsync(testCaseIdsList, amountOfRowsToMove);
      return Ok();
    }

    [HttpPost("updateOffset")]
    public async Task<IActionResult> UpdateTestCasesOffset(string operation, string testCaseIdList)
    {
      await _testCasesService.UpdateTestCasesOffsetAsync(operation, testCaseIdList);
      return Ok();
    }
  }
}
