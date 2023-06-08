using ServerC.Models;

namespace ServerC.Interfaces
{

  public interface ITestRunsService
  {
    Task<TestRun> CreateTestRunAsync(CreateTestRunInput input);
    Task<TestRun> GetTestRunByIdAsync(int id);
    Task<IEnumerable<TestRun>> GetAllTestRunsAsync();
    Task<TestRun> UpdateTestRunAsync(int id, CreateTestRunInput input);
    Task<bool> DeleteTestRunAsync(int id);

  }
}
