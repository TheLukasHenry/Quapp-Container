DELETE FROM main.dbo.testResults

DELETE FROM main.dbo.testRunCases

DELETE FROM main.dbo.testRuns

DELETE FROM main.dbo.testCases

DELETE FROM main.dbo.statuses

DELETE FROM main.dbo.companyUsers

DELETE FROM main.dbo.users

DELETE FROM main.dbo.features

DELETE FROM main.dbo.companies




DBCC CHECKIDENT('main.dbo.testResults', RESEED, 0)
DBCC CHECKIDENT('main.dbo.testRunCases', RESEED, 0)
DBCC CHECKIDENT('main.dbo.testRuns', RESEED, 0)
DBCC CHECKIDENT('main.dbo.testCases', RESEED, 0)
DBCC CHECKIDENT('main.dbo.statuses', RESEED, 0)
DBCC CHECKIDENT('main.dbo.users', RESEED, 0)
DBCC CHECKIDENT('main.dbo.features', RESEED, 0)
DBCC CHECKIDENT('main.dbo.companies', RESEED, 0)

