
CREATE PROCEDURE updateCompany
    @id INT,
    @name NVARCHAR(100)
AS
BEGIN
    UPDATE companies
    SET name = @name
    WHERE id = @id;

    -- Add the following SELECT statement to return the updated company object
    SELECT id, name
    FROM companies
    WHERE id = @id;
END;

GO

