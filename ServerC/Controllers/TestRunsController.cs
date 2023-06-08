using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ServerC.Interfaces;
using ServerC.Models;

namespace ServerC.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class TestRunsController : ControllerBase
  {
    private readonly ITestRunsService _testRunsService;

    public TestRunsController(ITestRunsService testRunsService)
    {
      _testRunsService = testRunsService;
    }

    [HttpPost]
    public async Task<ActionResult<TestRun>> CreateTestRun([FromBody] CreateTestRunInput input)
    {
      TestRun testRun = await _testRunsService.CreateTestRunAsync(input);
      return CreatedAtAction(nameof(GetTestRunById), new { id = testRun.id }, testRun);

    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TestRun>> GetTestRunById(int id)
    {
      TestRun testRun = await _testRunsService.GetTestRunByIdAsync(id);

      if (testRun == null)
      {
        return NotFound();
      }

      return testRun;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TestRun>>> GetAllTestRuns()
    {
      var testRuns = await _testRunsService.GetAllTestRunsAsync();
      return Ok(testRuns);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<TestRun>> UpdateTestRun(int id, CreateTestRunInput input)
    {
      TestRun testRun = await _testRunsService.UpdateTestRunAsync(id, input);

      if (testRun == null)
      {
        return NotFound();
      }

      return testRun;
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTestRun(int id)
    {
      bool isDeleted = await _testRunsService.DeleteTestRunAsync(id);

      if (!isDeleted)
      {
        return NotFound();
      }

      return NoContent();
    }
  }
}
