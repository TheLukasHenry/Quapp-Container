using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ServerC.Models;
using ServerC.Services;

namespace ServerC.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class LoginController : ControllerBase
  {
    private readonly LoginService _loginService;

    public LoginController(LoginService loginService)
    {
      _loginService = loginService;
    }

    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
      // var token = await _loginService.LoginAsync(request.Email, request.Password);
      var token = await _loginService.LoginAsync(request.Email);

      if (token == null)
      {
        return Unauthorized();
      }

      return Ok(new { Token = token });
    }
  }

  public class LoginRequest
  {
    public string Email { get; set; }
    public string Password { get; set; }
  }
}
