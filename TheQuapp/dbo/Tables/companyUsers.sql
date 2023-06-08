CREATE TABLE [dbo].[companyUsers] (
    [companyId] INT NOT NULL,
    [userId]    INT NOT NULL,
    CONSTRAINT [PK__CompanyU__FCEF9086B11BA0B2] PRIMARY KEY CLUSTERED ([companyId] ASC, [userId] ASC),
    CONSTRAINT [FK__CompanyUs__Compa__3E52440B] FOREIGN KEY ([companyId]) REFERENCES [dbo].[companies] ([id]),
    CONSTRAINT [FK__CompanyUs__UserI__3F466844] FOREIGN KEY ([userId]) REFERENCES [dbo].[users] ([id])
);


GO

