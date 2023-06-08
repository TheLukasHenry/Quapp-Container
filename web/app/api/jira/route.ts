import JiraApi from 'jira-client'
import { NextRequest, NextResponse } from 'next/server'
import url from 'url'

const jira = new JiraApi({
  protocol: 'https',
  host: 'quaapp.atlassian.net',
  username: 'lherajt@gmail.com',
  password: process.env.JIRA_API_KEY,
  apiVersion: '3',
})

export async function POST(request: NextRequest) {
  console.log('Jira called')
  const requestBody = await request.json()
  const { summary, description, issuetype } = requestBody

  const newIssue = await jira.addNewIssue({
    fields: {
      project: {
        key: 'QUAAP',
      },
      summary: summary,
      description: {
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [
              {
                text: description,
                type: 'text',
              },
            ],
          },
        ],
      },
      issuetype: {
        name: issuetype,
      },
    },
  })

  // Return the new issue data
  return NextResponse.json(newIssue)
}

export async function GET(request: NextRequest) {
  console.log('Jira called')
  const { searchParams } = new URL(request.url)
  const issueKey = searchParams.get('issueKey')

  if (issueKey === null) {
    return NextResponse.json({ error: 'IssueKey is required' })
  }

  // Get the issue from Jira
  const issue = await jira.findIssue(issueKey)

  // Return the issue data
  return NextResponse.json(issue)
}

export async function DELETE(request: NextRequest) {
  console.log('Jira called')
  const { searchParams } = new URL(request.url)
  const issueKey = searchParams.get('issueKey')

  if (issueKey === null) {
    return NextResponse.json({ error: 'IssueKey is required' })
  }

  // Delete the issue in Jira
  const response = await jira.deleteIssue(issueKey)

  // Return the response from Jira
  return NextResponse.json({ issueKey })
}

export async function PUT(request: NextRequest) {
  console.log('Jira called')
  const requestBody = await request.json()
  const { issueId, issueUpdate } = requestBody

  if (issueId === null) {
    return NextResponse.json({ error: 'IssueId is required' })
  }

  // Update the issue in Jira
  const updatedIssue = await jira.updateIssue(issueId, issueUpdate)

  // Return the updated issue data
  return NextResponse.json({ issueId, issueUpdate })
}

const handler = { GET, POST, DELETE, PUT }
export default handler
