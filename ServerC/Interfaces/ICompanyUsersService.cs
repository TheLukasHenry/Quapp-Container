using ServerC.Models;

namespace ServerC.Interfaces
{
  public interface ICompanyUsersService
  {
    Task<CompanyUser> AddCompanyUserAsync(CompanyUser companyUser);
    Task<IEnumerable<CompanyUser>> GetCompanyUsersByCompanyIdAsync(int companyId); //Changed from GetCompanyUsersByCompanyId to GetCompanyUsersByCompanyIdAsync
    Task<IEnumerable<CompanyUser>> GetCompanyUsersByUserIdAsync(int userId); //Changed from GetCompanyUsersByUserId to GetCompanyUsersByUserIdAsync
    Task<bool> RemoveCompanyUserAsync(int companyId, int userId); //Changed from RemoveCompanyUser to RemoveCompanyUserAsync
  }
}
