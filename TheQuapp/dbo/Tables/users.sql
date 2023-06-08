CREATE TABLE [dbo].[users] (
    [id]           INT            IDENTITY (1, 1) NOT NULL,
    [name]         VARCHAR (50)   NOT NULL,
    [email]        VARCHAR (100)  NOT NULL,
    [passwordHash] VARBINARY (64) NOT NULL,
    CONSTRAINT [PK__Users__1788CCAC662A89C8] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [UQ__Users__A9D10534EEF3E8D0] UNIQUE NONCLUSTERED ([email] ASC)
);


GO

