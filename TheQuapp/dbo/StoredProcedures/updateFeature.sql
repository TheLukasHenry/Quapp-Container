
CREATE PROCEDURE updateFeature
    @id INT,
    @name VARCHAR(50),
    @companyId INT
AS
BEGIN
    DECLARE @updatedFeature TABLE (
        id INT,
        name VARCHAR(50),
        companyId INT
    );

    UPDATE features
    SET name = @name, companyId = @companyId
    OUTPUT inserted.id, inserted.name, inserted.companyId INTO @updatedFeature
    WHERE id = @id;

    SELECT id, name, companyId
    FROM @updatedFeature;
END;

GO

