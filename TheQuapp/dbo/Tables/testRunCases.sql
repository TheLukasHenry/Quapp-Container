CREATE TABLE [dbo].[testRunCases] (
    [id]              INT           IDENTITY (1, 1) NOT NULL,
    [testRunId]       INT           NOT NULL,
    [testCaseId]      INT           NOT NULL,
    [testCaseStatus]  INT           NOT NULL,
    [testCaseComment] VARCHAR (255) NULL,
    CONSTRAINT [PK__TestRunC__34F1113D81FEEA58] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK__TestRunCa__TestC__4E88ABD4] FOREIGN KEY ([testCaseId]) REFERENCES [dbo].[testCases] ([id]),
    CONSTRAINT [FK__TestRunCa__TestC__4F7CD00D] FOREIGN KEY ([testCaseStatus]) REFERENCES [dbo].[statuses] ([id]),
    CONSTRAINT [FK__TestRunCa__TestR__4D94879B] FOREIGN KEY ([testRunId]) REFERENCES [dbo].[testRuns] ([id])
);


GO

