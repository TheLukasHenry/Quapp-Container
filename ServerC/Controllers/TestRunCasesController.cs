using Microsoft.AspNetCore.Mvc;
using ServerC.Interfaces;
using ServerC.Models;

namespace ServerC.Controllers
{
  [Route("[controller]")]
  [ApiController]
  public class TestRunCasesController : ControllerBase
  {
    private readonly ITestRunCasesService _testRunCasesService;

    public TestRunCasesController(ITestRunCasesService testRunCasesService)
    {
      _testRunCasesService = testRunCasesService;
    }

    [HttpPost]
    public async Task<ActionResult<TestRunCase>> CreateTestRunCase([FromBody] CreateTestRunCaseInput input)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      TestRunCase createdTestRunCase = await _testRunCasesService.CreateTestRunCaseAsync(input);
      if (createdTestRunCase == null)
      {
        return StatusCode(500, "An error occurred while creating the TestRunCase.");
      }

      return createdTestRunCase;
      // if (result == null)
      //   return StatusCode(500);

      // return CreatedAtAction(nameof(GetTestRunCaseById);
    }
    // public async Task<ActionResult<TestCase>> CreateTestCase([FromBody] CreateTestCaseInput input)
    // {
    //   if (string.IsNullOrEmpty(input.name) || input.featureId <= 0)
    //   {
    //     return BadRequest("TestCase Id, name, and featureId must be valid.");
    //   }

    //   TestCase createdTestCase = await _testCasesService.CreateTestCaseAsync(input);
    //   if (createdTestCase == null)
    //   {
    //     return StatusCode(500, "An error occurred while creating the TestCase.");
    //   }

    //   return Ok(createdTestCase);
    // }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTestRunCaseById(int id)
    {
      TestRunCase testRunCase = await _testRunCasesService.GetTestRunCaseByIdAsync(id);
      if (testRunCase == null)
        return NotFound();

      return Ok(testRunCase);
    }

    [HttpGet("testrun/{testRunId}")]
    public async Task<IActionResult> GetTestRunCaseByTestRunID(int testRunId)
    {
      IEnumerable<TestRunCase> testRunCases = await _testRunCasesService.GetTestRunCasesByTestRunIdAsync(testRunId);
      return Ok(testRunCases);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTestRunCase(int id, [FromBody] TestRunCase testRunCase)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      if (id != testRunCase.id)
        return BadRequest();

      bool result = await _testRunCasesService.UpdateTestRunCaseAsync(testRunCase);
      if (!result)
        return StatusCode(500);

      return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTestRunCase(int id)
    {
      bool result = await _testRunCasesService.DeleteTestRunCaseAsync(id);
      if (!result)
        return NotFound();

      return NoContent();
    }
  }
}
