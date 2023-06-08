namespace ServerC.Models
{
  public class TestRunCase
  {
    public int id { get; set; }
    public int testRunId { get; set; }
    public int testCaseId { get; set; }
    public int testCaseStatus { get; set; }
    public string? testCaseComment { get; set; }
  }
  public class CreateTestRunCaseInput
  {
    public int testRunId { get; set; }
    public int testCaseId { get; set; }
    public int testCaseStatus { get; set; }
    public string? testCaseComment { get; set; }
  }
}
