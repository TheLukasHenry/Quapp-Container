-- This file contains SQL statements that will be executed after the build script.
use QuappyMcQuapperson;

IF NOT EXISTS (SELECT 1 FROM dbo.companies WHERE name = 'Company 1')
BEGIN
   INSERT INTO dbo.companies
    (name)
VALUES
    ('Company A');
INSERT INTO dbo.companies
    (name)
VALUES
    ('Company B');
INSERT INTO dbo.companies
    (name)
VALUES
    ('Company C');

-- Inserting statuses
INSERT INTO dbo.statuses
    (name)
VALUES
    ('Status A');
INSERT INTO dbo.statuses
    (name)
VALUES
    ('Status B');
INSERT INTO dbo.statuses
    (name)
VALUES
    ('Status C');

-- Inserting users with a simple password hash
INSERT INTO dbo.users
    (name, email, passwordHash)
VALUES
    ('User A', 'usera@example.com', HASHBYTES('SHA2_256', 'passwordA'));
INSERT INTO dbo.users
    (name, email, passwordHash)
VALUES
    ('User B', 'userb@example.com', HASHBYTES('SHA2_256', 'passwordB'));
INSERT INTO dbo.users
    (name, email, passwordHash)
VALUES
    ('User C', 'userc@example.com', HASHBYTES('SHA2_256', 'passwordC'));

-- Assign users to companies
INSERT INTO dbo.companyUsers
    (companyId, userId)
VALUES
    (1, 1);
INSERT INTO dbo.companyUsers
    (companyId, userId)
VALUES
    (2, 2);
INSERT INTO dbo.companyUsers
    (companyId, userId)
VALUES
    (3, 3);


INSERT INTO dbo.features
    (name, companyId)
VALUES
    ('Feature A', 1);
INSERT INTO dbo.features
    (name, companyId)
VALUES
    ('Feature B', 2);
INSERT INTO dbo.features
    (name, companyId)
VALUES
    ('Feature C', 3);

-- Inserting test cases for the features
INSERT INTO dbo.testCases
    (featureId, name, sortOrder)
VALUES
    (1, 'Test Case A', 1);
INSERT INTO dbo.testCases
    (featureId, name, sortOrder)
VALUES
    (2, 'Test Case B', 1);
INSERT INTO dbo.testCases
    (featureId, name, sortOrder)
VALUES
    (3, 'Test Case C', 1);


-- Inserting test runs
INSERT INTO dbo.testRuns
    (name, [date], userId, startTime, endTime, testRunStatus)
VALUES
    ('Test Run A', GETDATE(), 1, GETDATE(), DATEADD(HOUR, 1, GETDATE()), 1);
INSERT INTO dbo.testRuns
    (name, [date], userId, startTime, endTime, testRunStatus)
VALUES
    ('Test Run B', GETDATE(), 2, GETDATE(), DATEADD(HOUR, 1, GETDATE()), 2);
INSERT INTO dbo.testRuns
    (name, [date], userId, startTime, endTime, testRunStatus)
VALUES
    ('Test Run C', GETDATE(), 3, GETDATE(), DATEADD(HOUR, 1, GETDATE()), 3);

--Sure, here is a simple script that will insert test data into your tables:


-- Insert into companies
INSERT INTO dbo.companies
    (name)
VALUES
    ('Company 1'),
    ('Company 2'),
    ('Company 3');

-- Insert into statuses
INSERT INTO dbo.statuses
    (name)
VALUES
    ('Status 1'),
    ('Status 2'),
    ('Status 3');

-- Insert into users
-- For simplicity, passwordHash is filled with arbitrary binary data
INSERT INTO dbo.users
    (name, email, passwordHash)
VALUES
    ('User 1', 'user1@example.com', 0x0123456789ABCDEF),
    ('User 2', 'user2@example.com', 0x0123456789ABCDEF),
    ('User 3', 'user3@example.com', 0x0123456789ABCDEF);











-- Correct testResults
-- featureId 1
INSERT INTO testResults
    (featureId, resultsJson, userId, date)
VALUES
    (
        1,
        '[
        {"testCaseId": 1, "singleResult": "pass", "comment": "example comment"}, 
        {"testCaseId": 4, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 5, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 6, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 7, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 8, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 9, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 10, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 11, "singleResult": "pass", "comment": "example comment"}, 
        {"testCaseId": 12, "singleResult": "fail", "comment": "example comment"}
    ]',
        1,
        GETDATE()
);

INSERT INTO testResults
    (featureId, resultsJson, userId, date)
VALUES
    (
        1,
        '[
        {"testCaseId": 1, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 4, "singleResult": "pass", "comment": "example comment"}, 
        {"testCaseId": 5, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 6, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 7, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 8, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 9, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 10, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 11, "singleResult": "pass", "comment": "example comment"}, 
        {"testCaseId": 12, "singleResult": "fail", "comment": "example comment"}
    ]',
        1,
        GETDATE()
);

-- featureId 2
INSERT INTO testResults
    (featureId, resultsJson, userId, date)
VALUES
    (
        2,
        '[
        {"testCaseId": 2, "singleResult": "pass", "comment": "example comment"}, 
        {"testCaseId": 14, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 15, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 16, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 17, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 18, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 19, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 20, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 21, "singleResult": "pass", "comment": "example comment"}, 
        {"testCaseId": 22, "singleResult": "fail", "comment": "example comment"}
    ]',
        1,
        GETDATE()
);

INSERT INTO testResults
    (featureId, resultsJson, userId, date)
VALUES
    (
        2,
        '[
        {"testCaseId": 2, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 14, "singleResult": "pass", "comment": "example comment"}, 
        {"testCaseId": 15, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 16, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 17, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 18, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 19, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 20, "singleResult": "fail", "comment": "example comment"}, 
        {"testCaseId": 21, "singleResult": "pass", "comment": "example comment"}, 
        {"testCaseId": 22, "singleResult": "fail", "comment": "example comment"}
    ]',
        1,
        GETDATE()
);
END