# DocuFlow AWS

DocuFlow AWS is a smart document processing platform designed as a serverless-first AWS project.

The goal is to provide a complete document workflow: upload files, store metadata, track processing status, inspect extracted information, monitor errors, and later run the backend through managed AWS services.

## Project Status

The project is currently a local frontend MVP. AWS services are intentionally not connected yet.

The implemented workflow allows users to:

```txt
Upload a document
  |
  v
Validate file type and size
  |
  v
Display simulated upload progress
  |
  v
Add the document to the local application state
  |
  v
View the document in the dashboard and documents table
  |
  v
Inspect document details, metadata, and processing timeline
```

## Implemented Features

- Responsive application layout with sidebar, topbar, and DocuFlow branding
- Client-side routing with React Router
- Dashboard with document statistics, recent documents, and processing activity
- Documents page with search, status filtering, and upload date sorting
- Document details page with metadata and processing timeline
- Local mock data for realistic document states
- Shared document state through React Context
- Upload page with drag and drop support
- PDF, TXT, and CSV file validation
- 5 MB upload size limit
- Simulated upload progress
- Local document creation after upload

## Technology Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- React Router

## Project Structure

```txt
src/
  assets/
  components/
    dashboard/
    documents/
    layout/
    upload/
  context/
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

## Planned AWS Architecture

The target serverless architecture will use:

- Amazon S3 for document storage
- Amazon DynamoDB for document metadata
- Amazon API Gateway for frontend API endpoints
- AWS Lambda for backend handlers
- AWS Step Functions for document processing workflows
- Amazon CloudWatch for logs and monitoring
- Amazon Cognito for authentication
- AWS CDK for infrastructure as code

Planned high-level flow:

```txt
React Frontend
      |
      v
API Gateway
      |
      v
AWS Lambda
      |
      +--> Amazon S3
      |       stores original uploaded documents
      |
      +--> Amazon DynamoDB
      |       stores document metadata, status, and results
      |
      +--> AWS Step Functions
              runs the document processing workflow

Amazon CloudWatch
      collects logs, metrics, workflow events, and errors
      from Lambda and Step Functions
```

## Next Steps

- Add simulated document processing workflow
- Add Process and Retry actions
- Add failed processing simulation
- Persist local documents between browser sessions
- Prepare backend Lambda handlers
- Add AWS CDK infrastructure
- Connect S3, DynamoDB, API Gateway, and Step Functions

## Operational Proof of Concept

An **Operational Proof of Concept and Business Rationale** document has been prepared and presented to managers in PDF format.

The document demonstrates the operational value of the proposed solution, including automated workforce allocation, editable assignment boards, manual adjustment options, special role coverage, training record management, and a real-time display board concept.

## Development Approach

The project intentionally starts with a complete local frontend workflow before AWS integration. This allows the user experience and processing flow to be validated first, while the backend services can be connected incrementally in the next stages.
