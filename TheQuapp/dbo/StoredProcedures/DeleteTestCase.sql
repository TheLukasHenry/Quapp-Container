
CREATE PROCEDURE DeleteTestCase
    @id int
AS
BEGIN
    DELETE FROM dbo.testRunCases WHERE testCaseId = @id;
    DELETE FROM dbo.testCases WHERE id = @id;
END;

GO

