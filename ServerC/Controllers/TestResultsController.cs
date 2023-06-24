using Microsoft.AspNetCore.Mvc;
using ServerC.Interfaces;
using ServerC.Models;

namespace ServerC.Controllers
{
  [Route("[controller]")]
  [ApiController]
  public class TestResultsController : ControllerBase
  {
    private readonly ITestResultsService _testResultsService;

    public TestResultsController(ITestResultsService testResultsService)
    {
      _testResultsService = testResultsService;
    }

    [HttpPost]
    public async Task<ActionResult<TestResult>> CreateTestResult([FromBody] CreateTestResultInput input)
    {
      if (input.featureId <= 0 || input.userId <= 0 || string.IsNullOrEmpty(input.resultsJson))
      {
        return BadRequest("TestResult featureId, userId, and resultsJson must be valid.");
      }

      TestResult createdTestResult = await _testResultsService.CreateTestResultAsync(input);
      if (createdTestResult == null)
      {
        return StatusCode(500, "An error occurred while creating the TestResult.");
      }

      return Ok(createdTestResult);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TestResult>>> GetAllTestResults()
    {
      IEnumerable<TestResult> testResults = await _testResultsService.GetAllTestResultsAsync();
      return Ok(testResults);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<IEnumerable<TestResult>>> GetTestResultById(int id)
    {
      if (id <= 0)
      {
        return BadRequest("TestResult Id must be valid.");
      }

      IEnumerable<TestResult> testResult = await _testResultsService.GetTestResultsByFeatureIdAsync(id);
      if (testResult == null)
      {
        return NotFound();
      }

      return Ok(testResult);
    }


    [HttpPut]
    public async Task<ActionResult<TestResult>> UpdateTestResult([FromBody] UpdateTestResultInput input)
    {
      if (input.testResultId <= 0 || input.featureId <= 0 || input.userId <= 0 || string.IsNullOrEmpty(input.resultsJson))
      {
        return BadRequest("TestResult testResultId, featureId, userId, and resultsJson must be valid.");
      }

      TestResult updatedTestResult = await _testResultsService.UpdateTestResultAsync(input);
      if (updatedTestResult == null)
      {
        return StatusCode(500, "An error occurred while updating the TestResult.");
      }

      return Ok(updatedTestResult);
    }

    [HttpPut("UpdateSingleTestResult")]
    public async Task<ActionResult<TestResult>> UpdateSingleTestResult([FromBody] UpdateSingleTestResultInput input)
    {
      if (string.IsNullOrEmpty(input.singleResultJson))
      {
        return BadRequest("TestResult testResultId, featureId, userId, and resultsJson must be valid.");
      }

      TestResult updatedTestResult = await _testResultsService.UpdateSingleTestResultAsync(input);
      return Ok(updatedTestResult);
    }
    // Add other methods here...
  }
}
