
CREATE PROCEDURE AddResult
    @testResultId INT,
    @newJsonResult NVARCHAR(MAX)
AS
BEGIN
    -- Check if the object exists in the array
    DECLARE @key NVARCHAR(10);

    WITH
        cte
        AS
        (
            SELECT
                testResultId,
                JSON_VALUE([value], '$.testCaseId') as testCaseId,
                resultsJson,
                o.*
            FROM testResults
        CROSS APPLY OPENJSON(JSON_QUERY(resultsJson, '$')) o
            WHERE testResultId = @testResultId AND JSON_VALUE(o.value, '$.testCaseId') = JSON_VALUE(@newJsonResult, '$.testCaseId')
        )
    SELECT @key = [key]
    FROM cte;

    -- If the object exists, update it
    IF @key IS NOT NULL
    BEGIN
        UPDATE testResults
        SET resultsJson = JSON_MODIFY(resultsJson, '$[' + @key + ']', JSON_QUERY(@newJsonResult))
        WHERE testResultId = @testResultId
    END
    -- If the object doesn't exist, append it to the array
    ELSE
    BEGIN
        UPDATE testResults
        SET resultsJson = JSON_MODIFY(resultsJson, 'append $', JSON_QUERY(@newJsonResult))
        WHERE testResultId = @testResultId
    END
END;

GO

