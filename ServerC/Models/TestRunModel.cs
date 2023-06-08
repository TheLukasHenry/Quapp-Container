namespace ServerC.Models
{
  public class TestRun
  {
    public int id { get; set; }
    public string name { get; set; }
    public DateTime date { get; set; }
    public int userId { get; set; }
    public DateTime startTime { get; set; }
    public DateTime endTime { get; set; }
    public int testRunStatus { get; set; }
  }

  public class CreateTestRunInput
  {
    public string name { get; set; }
    public DateTime date { get; set; }
    public int userId { get; set; }
    public DateTime startTime { get; set; }
    public DateTime endTime { get; set; }
    public int testRunStatus { get; set; }
  }
}
