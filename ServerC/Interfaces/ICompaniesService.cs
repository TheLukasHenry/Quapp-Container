using ServerC.Models;

namespace ServerC.Interfaces
{
  public interface ICompaniesService
  {
    Task<Company> CreateCompanyAsync(string name); // companyName changed to name
    Task<IEnumerable<Company>> GetAllCompaniesAsync();
    Task<Company> GetCompanyByIdAsync(int id); // id instead of companyId
    Task<Company> UpdateCompanyAsync(Company company);

    Task<bool> DeleteCompanyAsync(int id); // companyId changed to id
  }
}
