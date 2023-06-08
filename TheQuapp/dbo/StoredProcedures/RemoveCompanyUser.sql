
CREATE PROCEDURE RemoveCompanyUser
    @companyId INT,
    @userId INT
AS
BEGIN
    DELETE FROM companyUsers
WHERE companyId = @companyId AND userId = @userId
END;

GO

