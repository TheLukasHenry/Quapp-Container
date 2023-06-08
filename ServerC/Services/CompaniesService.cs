using Dapper;
using ServerC.Interfaces;
using ServerC.Models;
using System.Data;

namespace ServerC.Services
{
  public class CompaniesService : ICompaniesService
  {
    private readonly IDatabaseHelper _databaseHelper;

    public CompaniesService(IDatabaseHelper databaseHelper)
    {
      _databaseHelper = databaseHelper;
    }

    public async Task<IEnumerable<Company>> GetAllCompaniesAsync()
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        const string query = "EXEC GetAllCompanies";
        IEnumerable<Company> companies = await connection.QueryAsync<Company>(query);
        return companies;
      }
    }

    public async Task<Company> CreateCompanyAsync(string name)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        DynamicParameters parameters = new DynamicParameters();
        parameters.Add("@Name", name, DbType.String); // Change @CompanyName to @Name

        Company company = await connection.QueryFirstOrDefaultAsync<Company>("dbo.CreateCompany", parameters, commandType: CommandType.StoredProcedure);
        return company;
      }
    }

    public async Task<Company> GetCompanyByIdAsync(int id)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        DynamicParameters parameters = new DynamicParameters();
        parameters.Add("@Id", id); // Change @CompanyID to @Id
        Company company = await connection.QuerySingleOrDefaultAsync<Company>("dbo.GetCompanyById", parameters, commandType: CommandType.StoredProcedure);
        return company;
      }
    }

    public async Task<Company> UpdateCompanyAsync(Company company)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        DynamicParameters parameters = new DynamicParameters();
        parameters.Add("@Id", company.id, DbType.Int32); // Change @CompanyID to @Id
        parameters.Add("@Name", company.name, DbType.String); // Change @CompanyName to @Name

        Company updatedCompany = await connection.QuerySingleOrDefaultAsync<Company>("dbo.UpdateCompany", parameters, commandType: CommandType.StoredProcedure);
        return updatedCompany;
      }
    }

    public async Task<bool> DeleteCompanyAsync(int id)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        DynamicParameters parameters = new DynamicParameters();
        parameters.Add("@Id", id, DbType.Int32); // Change @CompanyID to @Id

        int affectedRows = await connection.ExecuteAsync("dbo.DeleteCompany", parameters, commandType: CommandType.StoredProcedure);
        return affectedRows > 0;
      }
    }
  }
}
