
--SELECT * FROM testRuns tr  ;



--EXEC CreateTestRunCase @testRunId = 1, @testCaseId = 3, @testCaseStatus = 1, @testCaseComment = "pppRwoooorrrk" ;

CREATE  PROCEDURE dbo.updateTestRun
    @id INT,
    @name VARCHAR(50),
    @date DATE,
    @userId INT,
    @startTime DATETIME2,
    @endTime DATETIME2,
    @testRunStatus INT
AS
BEGIN
    UPDATE dbo.testRuns
    SET name = @name,
        date = @date,
        userId = @userId,
        startTime = @startTime,
        endTime = @endTime,
        testRunStatus = @testRunStatus
    WHERE id = @id;
END;

GO

