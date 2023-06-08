
CREATE PROCEDURE GetTestRunCasesByTestRunID
    @testRunId INT
AS
BEGIN
    SELECT *
    FROM testRunCases
    WHERE testRunId = @testRunId;
END;

GO

