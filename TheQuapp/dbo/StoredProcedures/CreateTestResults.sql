
CREATE PROCEDURE CreateTestResults
    @featureId INT,
    @userId INT,
    @date DATE,
    @resultsJson NVARCHAR(MAX)
AS
BEGIN
    INSERT INTO dbo.testResults
        (featureId, userId, date, resultsJson)
    VALUES
        (@featureId, @userId, @date, @resultsJson);
END;

GO

