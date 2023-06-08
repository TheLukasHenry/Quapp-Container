using Dapper;
using ServerC.Interfaces;
using ServerC.Models;
using System.Data;

namespace ServerC.Services
{
  public class FeaturesService : IFeaturesService
  {
    private readonly IDatabaseHelper _databaseHelper;

    public FeaturesService(IDatabaseHelper databaseHelper)
    {
      _databaseHelper = databaseHelper;
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

    public async Task<IEnumerable<Feature>> GetAllFeaturesAsync()
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        const string query = "EXEC GetAllFeatures";
        IEnumerable<Feature> features = await connection.QueryAsync<Feature>(query);
        return features;
      }
    }

    public async Task<Feature> GetFeatureByIdAsync(int id)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        DynamicParameters parameters = new DynamicParameters();
        parameters.Add("@Id", id);

        Feature feature = await connection.QuerySingleOrDefaultAsync<Feature>("dbo.GetFeatureById", parameters, commandType: CommandType.StoredProcedure);
        return feature;
      }
    }

    public async Task<IEnumerable<Feature>> GetFeaturesByCompanyIdAsync(int companyId)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        DynamicParameters parameters = new DynamicParameters();
        parameters.Add("@CompanyId", companyId);

        IEnumerable<Feature> features = await connection.QueryAsync<Feature>("dbo.GetFeaturesByCompany", parameters, commandType: CommandType.StoredProcedure);
        return features;
      }
    }

    public async Task<Feature> UpdateFeatureAsync(Feature feature)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        DynamicParameters parameters = new DynamicParameters();
        parameters.Add("@Id", feature.id, DbType.Int32);
        parameters.Add("@Name", feature.name, DbType.String);
        parameters.Add("@CompanyId", feature.companyId, DbType.Int32);

        Feature updatedFeature = await connection.QuerySingleOrDefaultAsync<Feature>("dbo.UpdateFeature", parameters, commandType: CommandType.StoredProcedure);
        return updatedFeature;
      }
    }

    public async Task<bool> DeleteFeatureAsync(int id)
    {
      using (var connection = _databaseHelper.GetConnection())
      {
        // Delete all associated records from the TestRunCases table
        DynamicParameters deleteTestRunCasesParameters = new DynamicParameters();
        deleteTestRunCasesParameters.Add("@Id", id, DbType.Int32);
        await connection.ExecuteAsync(
            "DELETE FROM TestRunCases WHERE TestCaseId IN (SELECT TestCaseId FROM TestCases WHERE FeatureId = @Id)",
            deleteTestRunCasesParameters
        );

        // Delete all associated records from the TestCases table
        DynamicParameters deleteTestCasesParameters = new DynamicParameters();
        deleteTestCasesParameters.Add("@Id", id, DbType.Int32);
        await connection.ExecuteAsync("DELETE FROM TestCases WHERE FeatureId = @Id", deleteTestCasesParameters);

        // Delete the feature
        DynamicParameters deleteFeatureParameters = new DynamicParameters();
        deleteFeatureParameters.Add("@Id", id, DbType.Int32);
        int affectedRows = await connection.ExecuteAsync("dbo.DeleteFeature", deleteFeatureParameters, commandType: CommandType.StoredProcedure);
        return affectedRows > 0;
      }
    }
  }
}
