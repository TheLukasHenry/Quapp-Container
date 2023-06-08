
CREATE PROCEDURE dbo.DeleteCompany
    @id INT
AS
BEGIN
    DELETE FROM companies
    WHERE id = @id;
END;

GO

