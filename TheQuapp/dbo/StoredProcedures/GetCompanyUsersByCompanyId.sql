
CREATE PROCEDURE dbo.GetCompanyUsersByCompanyId
    @companyId INT
AS
BEGIN
    SELECT *
    FROM companyUsers
    WHERE companyId = @companyId;
END;

GO

