
CREATE  PROCEDURE MoveTestcases
    @testCaseIdsList VARCHAR(255),
    @amountOfRowsToMove INT
AS
BEGIN
    -- Convert the @TestCaseIDsList string to a table
    DECLARE @testCaseIds TABLE (testCaseId INT);
    INSERT INTO @testCaseIds
        (testCaseId)
    SELECT value
    FROM STRING_SPLIT(@testCaseIdsList, ',');

    -- Get the featureId of the first testCase in the list (assuming all testCases in the list have the same featureId)
    DECLARE @featureId INT = (SELECT TOP 1
        featureId
    FROM dbo.testCases
    WHERE id IN (SELECT testCaseId
    FROM @testCaseIds));

    -- Get the minimum and maximum sortOrder of the testCases to be moved
    DECLARE @minSortOrder INT = (SELECT MIN(sortOrder)
    FROM dbo.testCases
    WHERE id IN (SELECT testCaseId
    FROM @testCaseIds));
    DECLARE @maxSortOrder INT = (SELECT MAX(sortOrder)
    FROM dbo.testCases
    WHERE id IN (SELECT testCaseId
    FROM @testCaseIds));

    -- Calculate the new sortOrder values for the testCases to be moved
    DECLARE @newMinSortOrder INT = @minSortOrder + @amountOfRowsToMove;
    DECLARE @newMaxSortOrder INT = @maxSortOrder + @amountOfRowsToMove;

    -- Move the testCases which are in the way of the new positions to their new positions
    IF @amountOfRowsToMove > 0
    BEGIN
        UPDATE dbo.testCases
        SET sortOrder = sortOrder - (SELECT COUNT(*)
        FROM @testCaseIds)
        WHERE featureId = @featureId AND sortOrder > @maxSortOrder AND sortOrder <= @newMaxSortOrder;
    END
    ELSE
    BEGIN
        UPDATE dbo.testCases
        SET sortOrder = sortOrder + (SELECT COUNT(*)
        FROM @testCaseIds)
        WHERE featureId = @featureId AND sortOrder >= @newMinSortOrder AND sortOrder < @minSortOrder;
    END

    -- Move the testCases to their new positions
    UPDATE dbo.testCases
    SET sortOrder = sortOrder + @amountOfRowsToMove
    WHERE id IN (SELECT testCaseId
    FROM @testCaseIds);

    -- Finally, reassign sortOrder of each testCase to the row the testCase is on
    WITH
        cte
        AS
        (
            SELECT id, ROW_NUMBER() OVER (ORDER BY sortOrder) AS rowNum
            FROM dbo.testCases
            WHERE featureId = @featureId
        )
    UPDATE dbo.testCases
    SET sortOrder = cte.rowNum
    FROM dbo.testCases tc
        INNER JOIN cte ON tc.id = cte.id;
END;

GO

