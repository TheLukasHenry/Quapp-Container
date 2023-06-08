
CREATE  PROCEDURE dbo.GetAllTestCasesByFeatureId
    @featureId int
AS
BEGIN
    -- Call the procedure first
    EXEC UpdateSortOrderForDuplicates @featureId;

    SELECT
        id,
        featureId,
        name,
        parentId,
        sortOrder
    FROM
        testCases
    WHERE
        featureId = @featureId
    ORDER BY
        sortOrder;
END;

GO

