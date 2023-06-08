
CREATE PROCEDURE dbo.DeleteUser
    @id INT
AS
BEGIN
    DELETE FROM users WHERE id = @id;
END;

GO

