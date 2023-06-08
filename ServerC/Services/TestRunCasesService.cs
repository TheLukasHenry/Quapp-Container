using Dapper;
using ServerC.Interfaces;
using ServerC.Models;
using System.Data;

namespace ServerC.Services
{
  public class TestRunCasesService : ITestRunCasesService
  {
    private readonly IDatabaseHelper _databaseHelper;

    public TestRunCasesService(IDatabaseHelper databaseHelper)
    {
      _databaseHelper = databaseHelper;
    }

    public async Task<TestRunCase> CreateTestRunCaseAsync(CreateTestRunCaseInput input)
    {
      using (var connection = _databaseHelper.GetConnection())


      {
        DynamicParameters parameters = new DynamicParameters();
        parameters.Add("@testRunId", input.testRunId, DbType.Int32);
        parameters.Add("@testCaseComment", input.testCaseComment, DbType.String);
        parameters.Add("@testCaseId", input.testCaseId, DbType.Int32);
        parameters.Add("@testCaseStatus", input.testCaseStatus, DbType.Int32);

        TestRunCase createdTestRunCase = await connection.QuerySingleOrDefaultAsync<TestRunCase>("dbo.CreateTestRunCase", parameters, commandType: CommandType.StoredProcedure);
        return createdTestRunCase;
        // return await connection.QuerySingleOrDefaultAsync<TestRunCase>("dbo.CreateTestRunCase", parameters, commandType: CommandType.StoredProcedure);
      }
    }

    public async Task<IEnumerable<TestRunCase>> GetTestRunCasesByTestRunIdAsync(int testRunId)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        return await connection.QueryAsync<TestRunCase>("GetTestRunCasesByTestRunId", new { TestRunId = testRunId }, commandType: CommandType.StoredProcedure);
      }
    }

    public async Task<bool> UpdateTestRunCaseAsync(TestRunCase testRunCase)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        int rowsAffected = await connection.ExecuteAsync("UpdateTestRunCase",
            new
            {
              id = testRunCase.id,
              testRunId = testRunCase.testRunId,
              testCaseId = testRunCase.testCaseId,
              testCaseStatus = testRunCase.testCaseStatus,
              testCaseComment = testRunCase.testCaseComment
            },
            commandType: CommandType.StoredProcedure);

        return rowsAffected > 0;
      }
    }

    public async Task<bool> DeleteTestRunCaseAsync(int id)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        int rowsAffected = await connection.ExecuteAsync("DeleteTestRunCase", new { Id = id }, commandType: CommandType.StoredProcedure);
        return rowsAffected > 0;
      }
    }

    public async Task<TestRunCase> GetTestRunCaseByIdAsync(int id)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        return await connection.QuerySingleOrDefaultAsync<TestRunCase>("GetTestRunCaseById", new
        {
          id = id
        }, commandType: CommandType.StoredProcedure);
      }
    }
  }
}

