using System.Data;
using Dapper;
using ServerC.Interfaces;
using ServerC.Models;

namespace ServerC.Services
{
  public class CompanyUsersService : ICompanyUsersService
  {
    private readonly IDatabaseHelper _databaseHelper;

    public CompanyUsersService(IDatabaseHelper databaseHelper)
    {
      _databaseHelper = databaseHelper;
    }

    public async Task<CompanyUser> AddCompanyUserAsync(CompanyUser companyUser)
    {
      using (IDbConnection connection = _databaseHelper.GetConnection())
      {
        await connection.ExecuteAsync("[dbo].[AddCompanyUser]",
            new { CompanyId = companyUser.companyId, UserId = companyUser.userId }, //Changed from CompanyID and UserID to CompanyId and UserId respectively
            commandType: CommandType.StoredProcedure);

        return companyUser;
      }
    }

    public async Task<IEnumerable<CompanyUser>> GetCompanyUsersByCompanyIdAsync(int companyId)
    {
      using (IDbConnection connection = _databaseHelper.GetConnection())
      {

        DynamicParameters parameters = new DynamicParameters();
        parameters.Add("@CompanyId", companyId); //Changed from @CompanyID to @CompanyId

        return await connection.QueryAsync<CompanyUser>("[dbo].[GetCompanyUsersByCompanyId]",
            parameters, commandType: CommandType.StoredProcedure);

      }
    }

    public async Task<IEnumerable<CompanyUser>> GetCompanyUsersByUserIdAsync(int userId)
    {
      using (IDbConnection connection = _databaseHelper.GetConnection())
      {
        DynamicParameters parameters = new DynamicParameters();
        parameters.Add("@UserId", userId); //Changed from @UserID to @UserId

        return await connection.QueryAsync<CompanyUser>("[dbo].[GetCompanyUsersByUserId]",
            parameters, commandType: CommandType.StoredProcedure);
      }
    }

    public async Task<bool> RemoveCompanyUserAsync(int companyId, int userId)
    {
      using (IDbConnection connection = _databaseHelper.GetConnection())
      {
        DynamicParameters parameters = new DynamicParameters();
        parameters.Add("@CompanyId", companyId); //Changed from @CompanyID to @CompanyId
        parameters.Add("@UserId", userId); //Changed from @UserID to @UserId

        int affectedRows = await connection.ExecuteAsync("[dbo].[RemoveCompanyUser]",
            parameters, commandType: CommandType.StoredProcedure);

        return affectedRows > 0;
      }
    }
  }
}
