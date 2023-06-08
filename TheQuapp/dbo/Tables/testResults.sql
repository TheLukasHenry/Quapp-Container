CREATE TABLE [dbo].[testResults] (
    [testResultId] INT            IDENTITY (1, 1) NOT NULL,
    [featureId]    INT            NULL,
    [resultsJson]  NVARCHAR (MAX) NULL,
    [userId]       INT            NULL,
    [date]         DATE           NULL,
    CONSTRAINT [PK__testResu__DD1FEA8DECA04BED] PRIMARY KEY CLUSTERED ([testResultId] ASC),
    CONSTRAINT [FK__testResults__FeatureId] FOREIGN KEY ([featureId]) REFERENCES [dbo].[features] ([id]),
    CONSTRAINT [FK__testResults__UserId] FOREIGN KEY ([userId]) REFERENCES [dbo].[users] ([id])
);


GO

