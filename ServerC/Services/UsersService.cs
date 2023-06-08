using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using ServerC.Models;
using ServerC.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace ServerC.Services
{
  public class UsersService : IUsersService
  {
    private readonly IDatabaseHelper _databaseHelper;
    private readonly PasswordHasher<User> _passwordHasher;

    public UsersService(IDatabaseHelper databaseHelper, PasswordHasher<User> passwordHasher)
    {
      _databaseHelper = databaseHelper;
      _passwordHasher = passwordHasher;
    }

    public async Task<User> CreateUserAsync(CreateUserInput input)
    {
      User user = new User
      {
        name = input.name,
        email = input.email,
      };

      user.passwordHash = System.Text.Encoding.ASCII.GetBytes(_passwordHasher.HashPassword(user, input.password));

      using (var connection = _databaseHelper.GetConnection())
      {
        await connection.ExecuteAsync("dbo.CreateUser",
            new { user.name, user.email, user.passwordHash },
            commandType: CommandType.StoredProcedure);
        return await GetUserByEmailAsync(user.email);
      }
    }

    public async Task<User> GetUserByIdAsync(int id)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        return await connection.QuerySingleOrDefaultAsync<User>("dbo.GetUserById",
            new { id },
            commandType: CommandType.StoredProcedure);
      }
    }

    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        IEnumerable<User> users = await connection.QueryAsync<User>("dbo.GetAllUsers",
            commandType: CommandType.StoredProcedure);
        return users;
      }
    }

    public async Task<User> UpdateUserAsync(UpdateUserInput input)
    {
      try
      {
        using (var connection = _databaseHelper.GetConnection())
        {
          User user = await GetUserByIdAsync(input.id);
          var passwordHash = System.Text.Encoding.ASCII.GetBytes(_passwordHasher.HashPassword(user, input.password));

          using (var command = connection.CreateCommand())
          {
            command.CommandText = "dbo.UpdateUser";
            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@id", input.id);
            command.Parameters.AddWithValue("@name", input.name);
            command.Parameters.AddWithValue("@email", input.email);
            command.Parameters.AddWithValue("@passwordHash", passwordHash);

            await connection.OpenAsync();

            using (var reader = await command.ExecuteReaderAsync())
            {
              if (reader.Read())
              {
                User updatedUser = new User
                {
                  id = reader.GetInt32(0),
                  name = reader.GetString(1),
                  email = reader.GetString(2),
                  passwordHash = (byte[])reader[3]
                };

                return updatedUser;
              }
            }
          }
        }
      }
      catch (Exception ex)
      {
        Console.WriteLine("Exception caught: " + ex.Message);
        throw;
      }

      return null;
    }

    public async Task<bool> DeleteUserAsync(int id)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        int affectedRows = await connection.ExecuteAsync("dbo.DeleteUser",
            new { id },
            commandType: CommandType.StoredProcedure);
        return affectedRows > 0;
      }
    }

    public async Task<User> GetUserByEmailAsync(string email)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        return await connection.QuerySingleOrDefaultAsync<User>("dbo.GetUserByEmail",
            new { email },
            commandType: CommandType.StoredProcedure);
      }
    }
  }
}



