
-- Create new stored procedures with updated names
CREATE PROCEDURE DeleteFeature
    @id INT
AS
BEGIN
    DELETE FROM features
WHERE id = @id
END;

GO

