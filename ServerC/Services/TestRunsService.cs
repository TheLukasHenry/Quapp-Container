using System.Data;
using Dapper;
using ServerC.Interfaces;
using ServerC.Models;

namespace ServerC.Services
{
  public class TestRunsService : ITestRunsService
  {
    private readonly IDatabaseHelper _databaseHelper;

    public TestRunsService(IDatabaseHelper databaseHelper)
    {
      _databaseHelper = databaseHelper;
    }

    public async Task<TestRun> CreateTestRunAsync(CreateTestRunInput input)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        // connection.Open();

        DynamicParameters parameters = new DynamicParameters();
        parameters.Add("@name", input.name);
        parameters.Add("@date", input.date);
        parameters.Add("@userId", input.userId);
        parameters.Add("@startTime", input.startTime);
        parameters.Add("@endTime", input.endTime);
        parameters.Add("@testRunStatus", input.testRunStatus);

        TestRun createdTestRun = await connection.QuerySingleOrDefaultAsync<TestRun>("dbo.CreateTestRun", parameters, commandType: CommandType.StoredProcedure);
        return createdTestRun;
      }
    }

    public async Task<Feature> CreateFeatureAsync(CreateFeatureInput input)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        DynamicParameters parameters = new DynamicParameters();
        parameters.Add("@Name", input.name);
        parameters.Add("@CompanyId", input.companyId);

        Feature createdFeature = await connection.QuerySingleOrDefaultAsync<Feature>("dbo.CreateFeature", parameters, commandType: CommandType.StoredProcedure);
        return createdFeature;
      }
    }


    public async Task<TestRun> GetTestRunByIdAsync(int id)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        // connection.Open();

        DynamicParameters parameters = new DynamicParameters();
        parameters.Add("@id", id);

        return await connection.QuerySingleOrDefaultAsync<TestRun>("dbo.GetTestRunById", parameters, commandType: CommandType.StoredProcedure);
      }
    }

    public async Task<IEnumerable<TestRun>> GetAllTestRunsAsync()
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        // connection.Open();
        return await connection.QueryAsync<TestRun>("dbo.GetAllTestRuns", commandType: CommandType.StoredProcedure);
      }
    }

    public async Task<TestRun> UpdateTestRunAsync(int id, CreateTestRunInput input)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        // connection.Open();

        DynamicParameters parameters = new DynamicParameters();
        parameters.Add("@id", id);
        parameters.Add("@name", input.name);
        parameters.Add("@date", input.date);
        parameters.Add("@userId", input.userId);
        parameters.Add("@startTime", input.startTime);
        parameters.Add("@endTime", input.endTime);
        parameters.Add("@testRunStatus", input.testRunStatus);

        await connection.ExecuteAsync("dbo.UpdateTestRun", parameters, commandType: CommandType.StoredProcedure);
        return await GetTestRunByIdAsync(id);
      }
    }

    public async Task<bool> DeleteTestRunAsync(int id)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        // connection.Open();

        DynamicParameters parameters = new DynamicParameters();
        parameters.Add("@id", id);

        int affectedRows = await connection.ExecuteAsync("dbo.DeleteTestRun", parameters, commandType: CommandType.StoredProcedure);
        return affectedRows > 0;
      }
    }
  }
}

