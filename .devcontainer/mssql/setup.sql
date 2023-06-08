CREATE DATABASE main;
GO
WAITFOR DELAY '00:00:05';
GO
-- Switch to the new database
USE main;
GO

-- main.dbo.companies definition

-- Drop table

-- DROP TABLE main.dbo.companies;

CREATE TABLE main.dbo.companies (
	id int IDENTITY(1,1) NOT NULL,
	name varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK__Companie__2D971C4C4F0BA232 PRIMARY KEY (id)
);
GO

CREATE PROCEDURE dbo.GetAllCompanies
AS
BEGIN
    SELECT * FROM companies;
END;
GO

CREATE PROCEDURE dbo.createCompany
    @name NVARCHAR(50)
AS
BEGIN
    DECLARE @insertedCompanies TABLE
    (
        id INT,
        name NVARCHAR(50)
    );

    INSERT INTO companies (name)
    OUTPUT INSERTED.id, INSERTED.name INTO @insertedCompanies
    VALUES (@name);

    SELECT id, name
    FROM @insertedCompanies;
END;
GO

INSERT INTO main.dbo.companies (name) VALUES ('Company A');
INSERT INTO main.dbo.companies (name) VALUES ('Company B');
INSERT INTO main.dbo.companies (name) VALUES ('Company C');