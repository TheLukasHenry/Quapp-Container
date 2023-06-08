using ServerC.Models;

namespace ServerC.Interfaces
{
  public interface ITestRunCasesService
  {
    Task<TestRunCase> CreateTestRunCaseAsync(CreateTestRunCaseInput createTestRunCaseInput);
    Task<IEnumerable<TestRunCase>> GetTestRunCasesByTestRunIdAsync(int testRunId);
    Task<bool> UpdateTestRunCaseAsync(TestRunCase testRunCase);
    Task<bool> DeleteTestRunCaseAsync(int id);
    Task<TestRunCase> GetTestRunCaseByIdAsync(int id);
  }
}
