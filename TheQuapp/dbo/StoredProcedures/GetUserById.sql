
CREATE PROCEDURE dbo.GetUserById
    @id INT
AS
BEGIN
    SELECT *
    FROM users
    WHERE id = @id
END;

GO

