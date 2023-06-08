
--SELECT * FROM testRuns tr  ;



--EXEC CreateTestRunCase @testRunId = 1, @testCaseId = 3, @testCaseStatus = 1, @testCaseComment = "pppRwoooorrrk" ;

CREATE  PROCEDURE dbo.CreateTestRun
    @name VARCHAR(50),
    @date DATE,
    @userId INT,
    @startTime DATETIME2,
    @endTime DATETIME2,
    @testRunStatus INT
AS
BEGIN
    INSERT INTO testRuns
        (name, date, userId, startTime, endTime, testRunStatus)
    VALUES
        (@name, @date, @userId, @startTime, @endTime, @testRunStatus)

    SELECT *
    FROM testRuns
    WHERE id = SCOPE_IDENTITY();
END;

GO

