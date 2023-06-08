
CREATE PROCEDURE dbo.GetFeatureById
    @id int
AS
BEGIN
    SELECT *
    FROM features
    WHERE id = @id;
END;

GO

