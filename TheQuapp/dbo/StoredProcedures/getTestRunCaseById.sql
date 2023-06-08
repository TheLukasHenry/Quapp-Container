
CREATE PROCEDURE getTestRunCaseById
    @id INT
AS
BEGIN
    SELECT *
    FROM testRunCases
    WHERE id = @id;
END;

GO

