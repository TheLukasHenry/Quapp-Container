CREATE TABLE [dbo].[testCases] (
    [id]        INT          IDENTITY (1, 1) NOT NULL,
    [featureId] INT          NOT NULL,
    [name]      VARCHAR (50) NOT NULL,
    [sortOrder] INT          DEFAULT ((0)) NOT NULL,
    [parentId]  INT          NULL,
    CONSTRAINT [PK__TestCase__D2074B74E05B28E9] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK__TestCases__Featu__4AB81AF0] FOREIGN KEY ([featureId]) REFERENCES [dbo].[features] ([id]),
    CONSTRAINT [FK__TestCases__Parent__5AEE82F4] FOREIGN KEY ([parentId]) REFERENCES [dbo].[testCases] ([id])
);


GO

