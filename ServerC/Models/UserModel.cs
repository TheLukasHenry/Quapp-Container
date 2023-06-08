using System.ComponentModel.DataAnnotations;

namespace ServerC.Models
{
  public class User
  {
    public int id { get; set; }
    public string name { get; set; }
    public string email { get; set; }
    public byte[] passwordHash { get; set; }
  }

  public class CreateUserInput
  {
    public string name { get; set; }

    public string email { get; set; }

    public string password { get; set; }
  }

  public class UpdateUserInput : CreateUserInput
  {
    public int id { get; set; }
  }
}
