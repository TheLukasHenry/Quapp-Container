
using Microsoft.AspNetCore.Mvc;
using ServerC.Services;

namespace ServerC.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class ExampleController : ControllerBase
  {
    private readonly DatabaseHelper _databaseHelper;

    public ExampleController(DatabaseHelper databaseHelper)
    {
      _databaseHelper = databaseHelper;
    }

  }
}
