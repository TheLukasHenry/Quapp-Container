
CREATE PROCEDURE dbo.CreateUser
    @name VARCHAR(50),
    @email VARCHAR(100),
    @passwordHash VARBINARY(64)
AS
BEGIN
    INSERT INTO users
        (name, email, passwordHash)
    VALUES
        (@name, @email, @passwordHash)
END;

GO

