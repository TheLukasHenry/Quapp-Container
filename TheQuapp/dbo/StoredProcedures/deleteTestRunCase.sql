
-- DeleteTestRunCase
CREATE PROCEDURE dbo.deleteTestRunCase
    @id int
AS
BEGIN
    DELETE FROM dbo.testRunCases WHERE id = @id;
END;

GO

