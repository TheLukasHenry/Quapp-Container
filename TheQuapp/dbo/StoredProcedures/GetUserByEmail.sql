
CREATE PROCEDURE dbo.GetUserByEmail
    @email VARCHAR(100)
AS
BEGIN
    SELECT *
    FROM users
    WHERE email = @email
END;

GO

