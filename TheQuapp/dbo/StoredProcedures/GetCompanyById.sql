
CREATE PROCEDURE dbo.GetCompanyById
    @id INT
AS
BEGIN
    SELECT *
    FROM companies
    WHERE id = @id;
END;

GO

