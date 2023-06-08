
CREATE PROCEDURE dbo.GetTestRunByID
    @id INT
AS
BEGIN
    SELECT *
    FROM testRuns
    WHERE id = @id;
END;

GO

