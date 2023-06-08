using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using ServerC.Models; // Assuming JwtSettings class is in this namespace


namespace ServerC.Services
{
  public class JwtTokenHelper
  {
    public string GenerateJwtToken(string userEmail, JwtSettings jwtSettings)
    {
      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes(jwtSettings.Secret);

      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Email, userEmail) }),
        Expires = DateTime.UtcNow.AddHours(6),
        Issuer = jwtSettings.Issuer,
        Audience = jwtSettings.Audience,
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
      };

      var token = tokenHandler.CreateToken(tokenDescriptor);
      return tokenHandler.WriteToken(token);
    }
  }
}