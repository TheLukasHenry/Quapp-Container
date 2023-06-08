CREATE TABLE [dbo].[testRuns] (
    [id]            INT           IDENTITY (1, 1) NOT NULL,
    [name]          VARCHAR (50)  NOT NULL,
    [date]          DATE          NOT NULL,
    [userId]        INT           NOT NULL,
    [startTime]     DATETIME2 (7) NOT NULL,
    [endTime]       DATETIME2 (7) NOT NULL,
    [testRunStatus] INT           NOT NULL,
    CONSTRAINT [PK__TestRuns__BF2F962E1096CB3F] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK__TestRuns__TestRu__47DBAE45] FOREIGN KEY ([testRunStatus]) REFERENCES [dbo].[statuses] ([id]),
    CONSTRAINT [FK__TestRuns__UserID__46E78A0C] FOREIGN KEY ([userId]) REFERENCES [dbo].[users] ([id])
);


GO

CREATE NONCLUSTERED INDEX [idx_TestRuns_UserID]
    ON [dbo].[testRuns]([userId] ASC) WITH (FILLFACTOR = 100);


GO

