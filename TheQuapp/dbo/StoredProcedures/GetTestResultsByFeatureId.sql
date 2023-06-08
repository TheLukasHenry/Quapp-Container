
CREATE PROCEDURE GetTestResultsByFeatureId
    @featureId INT
AS
BEGIN
    SELECT *
    FROM dbo.testResults
    WHERE featureId = @featureId;
END;

GO

