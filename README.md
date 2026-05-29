# DocuFlow AWS

Smart Document Processing Platform built as a serverless-first AWS project.

The goal of the project is to create a document processing platform where users can upload files, track processing status, inspect extracted metadata, and later run the workflow through AWS services such as S3, DynamoDB, Lambda, API Gateway, Step Functions, CloudWatch, and Cognito.

## Current Status

The project is currently in the local frontend MVP stage. AWS services are not connected yet.

The current application focuses on the local user flow:

```txt
View dashboard
Browse documents
Open document details
Inspect metadata and processing timeline
```

## Features

- React application layout with sidebar and topbar
- Client-side routing
- Dashboard with document statistics
- Recent documents table
- Processing activity panel
- Documents page with search, status filtering, and date sorting
- Document details page
- Document metadata display
- Processing timeline
- Mock document data

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- React Router

## Project Structure

```txt
src/
  components/
    dashboard/
    documents/
    layout/
  data/
  hooks/
  pages/
  routes/
  types/
  utils/
```

## Local Setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Roadmap

### Frontend MVP

- Upload UI
- Fake upload progress
- Local document creation
- Simulated processing workflow
- Failed processing simulation
- More complete document details view

### AWS Backend

- S3 document storage
- DynamoDB document metadata
- API Gateway endpoints
- Lambda handlers
- Step Functions processing workflow
- CloudWatch logs and metrics
- Cognito authentication
- AWS CDK infrastructure

## AWS Architecture Target

Planned high-level flow:

```txt
Frontend
  |
  v
API Gateway
  |
  v
Lambda
  |
  +--> S3
  +--> DynamoDB
  +--> Step Functions
             |
             v
        CloudWatch Logs
```

## Important Note

The project intentionally starts without AWS integration. The local frontend workflow should be completed first, then real AWS services will be connected step by step.
