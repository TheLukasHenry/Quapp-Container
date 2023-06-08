
CREATE PROCEDURE dbo.CreateStatus
    @name VARCHAR(50)
AS
BEGIN
    INSERT INTO statuses
        (name)
    VALUES
        (@name)
END;

GO

