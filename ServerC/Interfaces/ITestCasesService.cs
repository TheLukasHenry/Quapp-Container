using ServerC.Models;


namespace ServerC.Interfaces
{
  public interface ITestCasesService
  {
    Task<TestCase> CreateTestCaseAsync(CreateTestCaseInput createTestCaseInput);
    Task<IEnumerable<TestCase>> GetAllTestCasesAsync();
    Task<IEnumerable<TestCase>> GetAllTestCasesByFeatureIdAsync(int featureId);
    Task<TestCase> GetTestCaseByIdAsync(int id);
    Task<TestCase> UpdateTestCaseAsync(UpdateTestCaseInput updateTestCaseInput);
    Task<int> DeleteTestCaseAsync(int id);

    Task UpdateTestCasesAsync(List<UpdateTestCaseInput> updateTestCasesInput);
    Task MoveTestCasesAsync(string testCaseIdsList, int amountOfRowsToMove);
    Task UpdateTestCasesOffsetAsync(string operation, string testCaseIdList);
  }
}
