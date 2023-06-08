
CREATE  PROCEDURE [dbo].[updateTestCase]
    @id int,
    @featureId int = NULL,
    @name varchar(50) = NULL,
    @parentId int = NULL,
    @sortOrder int = NULL
AS
BEGIN
    UPDATE dbo.testCases
    SET featureId = ISNULL(@featureId, featureId),
        name = ISNULL(@name, name),
        parentId = ISNULL(@parentId, parentId),
        sortOrder = ISNULL(@sortOrder, sortOrder)
    OUTPUT inserted.id, inserted.featureId, inserted.name, inserted.parentId, inserted.sortOrder
    WHERE id = @id;
END;

GO

