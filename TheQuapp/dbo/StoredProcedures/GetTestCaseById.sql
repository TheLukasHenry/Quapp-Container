
CREATE PROCEDURE GetTestCaseById
    @id int
AS
BEGIN
    SELECT *
    FROM dbo.testCases
    WHERE id = @id;
END;

GO

