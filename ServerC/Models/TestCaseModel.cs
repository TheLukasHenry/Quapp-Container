namespace ServerC.Models
{
  public class TestCase
  {
    public int id { get; set; }
    public int featureId { get; set; }
    public string name { get; set; }

    public int sortOrder { get; set; }
    public int parentId { get; set; }

  }
  public class CreateTestCaseInput
  {
    public int featureId { get; set; }
    public string name { get; set; }

    public int? sortOrder { get; set; }
    public int? parentId { get; set; }

  }

  public class UpdateTestCaseInput
  {
    public int id { get; set; }

    public int? featureId { get; set; }
    public string? name { get; set; }

    public int? sortOrder { get; set; }
    public int? parentId { get; set; }


  }
}
