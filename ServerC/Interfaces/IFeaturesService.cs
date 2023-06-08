using ServerC.Models;

namespace ServerC.Interfaces
{
  public interface IFeaturesService
  {
    Task<Feature> CreateFeatureAsync(CreateFeatureInput createFeatureInput);
    Task<IEnumerable<Feature>> GetAllFeaturesAsync();
    Task<Feature> GetFeatureByIdAsync(int id);
    Task<IEnumerable<Feature>> GetFeaturesByCompanyIdAsync(int companyId);
    Task<Feature> UpdateFeatureAsync(Feature feature);
    Task<bool> DeleteFeatureAsync(int id);
  }
}
