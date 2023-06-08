
CREATE PROCEDURE dbo.createFeature
    @name VARCHAR(50),
    @companyId INT
AS
BEGIN
    DECLARE @createdFeature TABLE (
        id INT,
        name VARCHAR(50),
        companyId INT
    );

    INSERT INTO features
        (name, companyId)
    OUTPUT inserted.id, inserted.name, inserted.companyId INTO @createdFeature
    VALUES
        (@name, @companyId);

    SELECT id, name, companyId
    FROM @createdFeature;
END;

GO

