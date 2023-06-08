
using Microsoft.Data.SqlClient;
using ServerC.Interfaces;



namespace ServerC.Services
{
    public class DatabaseHelper : IDatabaseHelper
    {
        private readonly IConfiguration _configuration;

        public DatabaseHelper(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public SqlConnection GetConnection()
        {
            string connectionString = _configuration.GetConnectionString("MainDatabase");
            return new SqlConnection(connectionString);
        }
    }
}