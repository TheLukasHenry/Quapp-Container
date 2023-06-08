

using Microsoft.Data.SqlClient;


namespace ServerC.Interfaces
{
    public interface IDatabaseHelper
    {
        SqlConnection GetConnection();
    }
}