
CREATE PROCEDURE dbo.createCompany
    @name NVARCHAR(50)
AS
BEGIN
    DECLARE @insertedCompanies TABLE
    (
        id INT,
        name NVARCHAR(50)
    );

    INSERT INTO companies
        (name)
    OUTPUT INSERTED.id, INSERTED.name INTO @insertedCompanies
    VALUES
        (@name);

    SELECT id, name
    FROM @insertedCompanies;
END;

GO

