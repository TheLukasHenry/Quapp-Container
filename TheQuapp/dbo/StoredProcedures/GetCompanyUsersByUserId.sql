
CREATE PROCEDURE GetCompanyUsersByUserId
    @userId INT
AS
BEGIN
    SELECT *
    FROM companyUsers
    WHERE userId = @userId
END;

GO

