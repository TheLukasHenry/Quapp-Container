
CREATE PROCEDURE dbo.DeleteTestRun
    @id INT
AS
BEGIN
    DELETE FROM testRuns
    WHERE id = @id;
END;

GO

