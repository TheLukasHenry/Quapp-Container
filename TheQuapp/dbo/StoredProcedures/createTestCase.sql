
CREATE  PROCEDURE dbo.createTestCase
    @featureId INT,
    @name VARCHAR(50),
    @parentId INT = NULL,
    -- Default value of NULL
    @sortOrder INT = 99
AS
BEGIN
    INSERT INTO testCases
        (featureId, name, parentId, sortOrder)
    OUTPUT
    inserted.id,
    inserted.featureId,
    inserted.name,
    inserted.parentId,
    inserted.sortOrder
    VALUES
        (@featureId, @name, @parentId, @sortOrder)
END;

GO

