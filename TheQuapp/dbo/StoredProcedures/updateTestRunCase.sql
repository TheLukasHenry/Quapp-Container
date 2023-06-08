
-- UpdateTestRunCase
CREATE PROCEDURE dbo.updateTestRunCase
    @id int,
    @testRunId int,
    @testCaseId int,
    @testCaseStatus int,
    @testCaseComment nvarchar(255)
AS
BEGIN
    UPDATE dbo.testRunCases
  SET testRunId = @testRunId,
      testCaseId = @testCaseId,
      testCaseStatus = @testCaseStatus,
      testCaseComment = @testCaseComment
  WHERE id = @id;
END;

GO

