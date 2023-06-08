using System;
using System.Threading.Tasks;
using ServerC.Interfaces;
using ServerC.Models;
using Microsoft.AspNetCore.Identity;

namespace ServerC.Services
{
  public class LoginService
  {
    private readonly IUsersService _usersService;
    private readonly PasswordHasher<User> _passwordHasher;
    private readonly JwtTokenHelper _jwtTokenHelper;
    private readonly JwtSettings _jwtSettings;

    public LoginService(IUsersService usersService, PasswordHasher<User> passwordHasher, JwtTokenHelper jwtTokenHelper, JwtSettings jwtSettings)
    {
      _usersService = usersService;
      _passwordHasher = passwordHasher;
      _jwtTokenHelper = jwtTokenHelper;
      _jwtSettings = jwtSettings;
    }

    // public async Task<string> LoginAsync(string email, string password)
    // {
    //   var user = await _usersService.GetUserByEmailAsync(email);

    //   if (user == null)
    //   {
    //     return null;
    //   }

    //   var hashedPassword = _passwordHasher.HashPassword(user, password);
    //   var passwordVerificationResult = _passwordHasher.VerifyHashedPassword(user, hashedPassword, password);

    //   if (passwordVerificationResult == PasswordVerificationResult.Success)
    //   {
    //     return _jwtTokenHelper.GenerateJwtToken(email, _jwtSettings);
    //   }

    //   return null;
    // }

    public async Task<string> LoginAsync(string email)
    {
      var user = await _usersService.GetUserByEmailAsync(email);

      if (user == null)
      {
        return null;
      }


      return _jwtTokenHelper.GenerateJwtToken(email, _jwtSettings);


      return null;
    }

    public async Task<string> RegisterAsync(User newUser, string password)
    {
      var createUserInput = new CreateUserInput
      {
        name = newUser.name,
        email = newUser.email,
        password = password
      };

      var createdUser = await _usersService.CreateUserAsync(createUserInput);

      if (createdUser != null)
      {
        return _jwtTokenHelper.GenerateJwtToken(createdUser.email, _jwtSettings);
      }

      return null;
    }
  }
}
