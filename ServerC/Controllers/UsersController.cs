using Microsoft.AspNetCore.Mvc;
using ServerC.Interfaces;
using ServerC.Models;

namespace ServerC.Controllers
{
  [Route("[controller]")]
  [ApiController]
  public class UsersController : ControllerBase
  {
    private readonly IUsersService _usersService;

    public UsersController(IUsersService usersService)
    {
      _usersService = usersService;
    }

    [HttpPost]
    public async Task<ActionResult<User>> CreateUser([FromBody] CreateUserInput input)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      User newUser = await _usersService.CreateUserAsync(input);
      if (newUser == null)
        return StatusCode(500);

      return CreatedAtAction(nameof(GetUserById), new { id = newUser.id }, newUser);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
    {
      IEnumerable<User> users = await _usersService.GetAllUsersAsync();
      return Ok(users);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(User), 200)] // Add this line
    public async Task<IActionResult> GetUserById(int id)
    {
      User user = await _usersService.GetUserByIdAsync(id);
      if (user == null)
        return NotFound();

      return Ok(user);
    }


    [HttpPut]
    public async Task<ActionResult<User>> UpdateUser([FromBody] UpdateUserInput input)
    {
      Console.WriteLine("Input: " + input?.ToString() ?? "null");

      Console.WriteLine("ModelState.IsValid: " + ModelState.IsValid);

      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      User user = await _usersService.GetUserByIdAsync(input.id);
      if (user == null)
        return NotFound();

      User result = await _usersService.UpdateUserAsync(input);
      if (result == null)
        return StatusCode(500);

      return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
      bool result = await _usersService.DeleteUserAsync(id);
      if (!result)
        return NotFound();

      return NoContent();
    }

    [HttpGet("email/{email}")]
    public async Task<ActionResult<User>> GetUserByEmail(string email)
    {
      User user = await _usersService.GetUserByEmailAsync(email);
      if (user == null)
        return NotFound();

      return Ok(user);
    }
  }
}
