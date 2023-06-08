-- This file contains SQL statements that will be executed after the build script.

IF NOT EXISTS (SELECT 1 FROM dbo.companies WHERE name = 'Company 4')
BEGIN
    INSERT INTO dbo.companies
        (name)
    VALUES
        ('Company 4')
END