
CREATE PROCEDURE dbo.UpdateSortOrderForDuplicates
    @featureId int
AS
BEGIN
    SET NOCOUNT ON;

    -- Create a new SortOrder for all TestCases in this Feature
    WITH
        CTE
        AS
        (
            SELECT id,
                ROW_NUMBER() OVER (ORDER BY "sortOrder", id) as NewSortOrder
            FROM testCases
            WHERE featureId = @featureId
        )
    UPDATE testCases
    SET "sortOrder" = CTE.NewSortOrder
    FROM testCases
        INNER JOIN CTE ON testCases.id = CTE.id;
END;

GO

