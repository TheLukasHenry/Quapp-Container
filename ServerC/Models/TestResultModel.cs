namespace ServerC.Models
{
  public class TestResult
  {
    public int testResultId { get; set; }
    public int? featureId { get; set; }
    public string resultsJson { get; set; }
    public int? userId { get; set; }
    public DateTime? date { get; set; }
  }

  public class CreateTestResultInput
  {
    public int? featureId { get; set; }
    public string resultsJson { get; set; }
    public int? userId { get; set; }
    public DateTime? date { get; set; }
  }

  public class UpdateTestResultInput
  {
    public int testResultId { get; set; }
    public int? featureId { get; set; }
    public string resultsJson { get; set; }
    public int? userId { get; set; }
    public DateTime? date { get; set; }
  }

  public class UpdateSingleTestResultInput
  {
    public int testResultId { get; set; }
    public string singleResultJson { get; set; }
  }
}

