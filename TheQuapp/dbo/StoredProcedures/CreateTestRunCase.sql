
--SELECT * FROM testRunCases trc  ;



--EXEC CreateTestRunCase @testRunId = 1, @testCaseId = 3, @testCaseStatus = 1, @testCaseComment = "woooorrrk" ;

CREATE PROCEDURE CreateTestRunCase
    @testRunId INT,
    @testCaseId INT,
    @testCaseStatus INT,
    @testCaseComment NVARCHAR(255)
AS
BEGIN
    DECLARE @NewTestRunCaseId INT;

    INSERT INTO testRunCases
        (testRunId, testCaseId, testCaseStatus, testCaseComment)
    VALUES
        (@testRunId, @testCaseId, @testCaseStatus, @testCaseComment);

    SET @NewTestRunCaseId = SCOPE_IDENTITY();

    SELECT *
    FROM testRunCases
    WHERE id = @NewTestRunCaseId;
END;

GO

