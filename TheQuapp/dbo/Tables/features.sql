CREATE TABLE [dbo].[features] (
    [id]        INT          IDENTITY (1, 1) NOT NULL,
    [name]      VARCHAR (50) NOT NULL,
    [companyId] INT          NOT NULL,
    CONSTRAINT [PK__Features__82230A2941B5D8C0] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK__Features__Compan__4222D4EF] FOREIGN KEY ([companyId]) REFERENCES [dbo].[companies] ([id])
);


GO

CREATE NONCLUSTERED INDEX [idx_Features_CompanyID]
    ON [dbo].[features]([companyId] ASC) WITH (FILLFACTOR = 100);


GO

