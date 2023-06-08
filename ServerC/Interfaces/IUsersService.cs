using ServerC.Models;

namespace ServerC.Interfaces
{
  public interface IUsersService
  {
    Task<User> CreateUserAsync(CreateUserInput input);
    Task<User> GetUserByIdAsync(int id);
    Task<IEnumerable<User>> GetAllUsersAsync();
    Task<User> UpdateUserAsync(UpdateUserInput input);
    Task<bool> DeleteUserAsync(int id);
    Task<User> GetUserByEmailAsync(string email);
  }
}
