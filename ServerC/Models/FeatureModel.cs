

namespace ServerC.Models
{
  public class Feature
  {
    public int id { get; set; }

    public string name { get; set; }

    public int companyId { get; set; }
  }

  public class CreateFeatureInput
  {
    public string name { get; set; }

    public int companyId { get; set; }
  }
}
