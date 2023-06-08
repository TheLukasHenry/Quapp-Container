
CREATE PROCEDURE dbo.updateUser
    @id INT,
    @name NVARCHAR(50),
    @email NVARCHAR(100),
    @passwordHash VARBINARY(64)
AS
BEGIN
    UPDATE users
    SET name = @name,
        email = @email,
        passwordHash = @passwordHash
    WHERE id = @id;

    -- Return the updated user details
    SELECT *
    FROM users
    WHERE id = @id;
END;

GO

