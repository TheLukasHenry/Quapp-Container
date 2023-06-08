
CREATE  PROCEDURE UpdateSingleTestResult
    @testResultId int,
    @singleResultJson nvarchar(MAX)
AS
BEGIN
    DECLARE @resultsJson nvarchar(MAX);
    DECLARE @testCaseId int;
    DECLARE @jsonToUpdate NVARCHAR(MAX);
    DECLARE @indexToUpdate INT;

    -- Extract the testCaseId from the singleResultJson
    SET @testCaseId = JSON_VALUE(@singleResultJson, '$.testCaseId');

    -- Get the current resultsJson for the given testResultId
    SELECT @resultsJson = resultsJson
    FROM dbo.testResults
    WHERE testResultId = @testResultId;

    -- Check if the testCaseId already exists in the resultsJson
    IF EXISTS (SELECT 1
    FROM OPENJSON(@resultsJson)
    WHERE JSON_VALUE([value], '$.testCaseId') = @testCaseId)
    BEGIN
        -- If the testCaseId exists, find its index (only take the first match)
        SET @indexToUpdate = (SELECT TOP 1
            [key]
        FROM OPENJSON(@resultsJson)
        WHERE JSON_VALUE([value], '$.testCaseId') = @testCaseId);

        -- Replace the existing singleResultJson object with the new one
        SET @jsonToUpdate = JSON_MODIFY(@resultsJson, '$[' + CAST(@indexToUpdate AS NVARCHAR(MAX)) + ']', JSON_QUERY(@singleResultJson));
    END
    ELSE
    BEGIN
        -- If the testCaseId does not exist, add the new singleResultJson to the resultsJson
        SET @jsonToUpdate = JSON_MODIFY(@resultsJson, 'append $', JSON_QUERY(@singleResultJson));
    END

    -- Update the testResults table
    UPDATE dbo.testResults
    SET resultsJson = @jsonToUpdate
    WHERE testResultId = @testResultId;
END;

GO

