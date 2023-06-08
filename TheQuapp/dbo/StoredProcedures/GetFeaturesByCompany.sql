
CREATE PROCEDURE dbo.GetFeaturesByCompany
    @companyId INT
AS
BEGIN
    SELECT *
    FROM features
    WHERE companyId = @companyId;
END;

GO

