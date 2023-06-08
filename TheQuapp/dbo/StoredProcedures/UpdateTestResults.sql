
CREATE  PROCEDURE UpdateTestResults
    @testResultId int,
    @newResultsJson nvarchar(MAX) = NULL,
    @date date = NULL,
    @userId int = NULL,
    @featureId int = NULL
AS
BEGIN
    UPDATE dbo.testResults
    SET 
        resultsJson = ISNULL(@newResultsJson, resultsJson),
        date = ISNULL(@date, date),
        userId = ISNULL(@userId, userId),
        featureId = ISNULL(@featureId, featureId)
    WHERE testResultId = @testResultId;
END;

GO

