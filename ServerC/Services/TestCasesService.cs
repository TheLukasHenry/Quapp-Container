using Dapper;
using ServerC.Interfaces;
using ServerC.Models;
using System.Data;

namespace ServerC.Services
{
  public class TestCasesService : ITestCasesService
  {
    private readonly IDatabaseHelper _databaseHelper;

    public TestCasesService(IDatabaseHelper databaseHelper)
    {
      _databaseHelper = databaseHelper;
    }

    public async Task<TestCase> CreateTestCaseAsync(CreateTestCaseInput input)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        DynamicParameters parameters = new DynamicParameters();
        parameters.Add("@featureId", input.featureId, DbType.Int32);
        parameters.Add("@name", input.name, DbType.String);

        // Add parameters conditionally
        if (input.sortOrder.HasValue)
        {
          parameters.Add("@sortOrder", input.sortOrder.Value, DbType.Int32);
        }

        if (input.parentId.HasValue)
        {
          parameters.Add("@parentId", input.parentId.Value, DbType.Int32);
        }

        TestCase createdTestCase = await connection.QuerySingleOrDefaultAsync<TestCase>("dbo.CreateTestCase", parameters, commandType: CommandType.StoredProcedure);
        return createdTestCase;
      }
    }



    public async Task<IEnumerable<TestCase>> GetAllTestCasesAsync()
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        return await connection.QueryAsync<TestCase>("GetAllTestCases", commandType: CommandType.StoredProcedure);
      }
    }

    public async Task<IEnumerable<TestCase>> GetAllTestCasesByFeatureIdAsync(int featureId)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        return await connection.QueryAsync<TestCase>("GetAllTestCasesByFeatureId", new { featureId }, commandType: CommandType.StoredProcedure);
      }
    }

    public async Task<TestCase> GetTestCaseByIdAsync(int id)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        return await connection.QuerySingleOrDefaultAsync<TestCase>("GetTestCaseById", new { id }, commandType: CommandType.StoredProcedure);
      }
    }

    public async Task<TestCase> UpdateTestCaseAsync(UpdateTestCaseInput input)
    {
      using (var connection = _databaseHelper.GetConnection())
      {


        DynamicParameters parameters = new DynamicParameters();
        parameters.Add("@id", input.id, DbType.Int32);
        parameters.Add("@name", input.name, DbType.String);
        parameters.Add("@sortOrder", input.sortOrder, DbType.Int32);
        parameters.Add("@parentId", input.parentId, DbType.Int32);
        parameters.Add("@featureId", input.featureId, DbType.Int32);

        TestCase updatedTestCase = await connection.QuerySingleOrDefaultAsync<TestCase>("dbo.UpdateTestCase", parameters, commandType: CommandType.StoredProcedure);
        return updatedTestCase;
      }
    }

    public async Task UpdateTestCasesAsync(List<UpdateTestCaseInput> input)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        foreach (var testCase in input)
        {
          var parameters = new DynamicParameters();
          parameters.Add("@id", testCase.id, DbType.Int32);
          parameters.Add("@parentId", testCase.parentId, DbType.Int32);
          parameters.Add("@sortOrder", testCase.sortOrder, DbType.Int32);

          await connection.ExecuteAsync("dbo.updateTestCase", parameters, commandType: CommandType.StoredProcedure);
        }
      }
    }


    public async Task<int> DeleteTestCaseAsync(int id)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        return await connection.ExecuteAsync("DeleteTestCase", new { id }, commandType: CommandType.StoredProcedure);
      }
    }

    public async Task MoveTestCasesAsync(string testCaseIdsList, int amountOfRowsToMove)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        DynamicParameters parameters = new DynamicParameters();
        parameters.Add("@testCaseIdsList", testCaseIdsList, DbType.String);
        parameters.Add("@amountOfRowsToMove", amountOfRowsToMove, DbType.Int32);

        await connection.ExecuteAsync("dbo.MoveTestcases", parameters, commandType: CommandType.StoredProcedure);
      }
    }

    public async Task UpdateTestCasesOffsetAsync(string operation, string testCaseIdList)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        DynamicParameters parameters = new DynamicParameters();
        parameters.Add("@operation", operation, DbType.String);
        parameters.Add("@testCaseIdList", testCaseIdList, DbType.String);

        await connection.ExecuteAsync("dbo.UpdateTestCasesOffset", parameters, commandType: CommandType.StoredProcedure);
      }
    }
  }
}
