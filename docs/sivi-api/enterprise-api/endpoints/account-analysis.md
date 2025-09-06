---
id: account-analysis
title: account-analysis
description: Analyze usage data for users or workspaces
sidebar_position: 6
---

# Account Analysis API

This endpoint allows Enterprise administrators to analyze usage data for specific users, providing valuable insights into platform usage, design generation, and resource consumption.

## Endpoint

```
POST enterprise/account-analysis
```

## Authentication

Include your Enterprise API credentials in the request headers:

```http
sivi-api-key: YOUR_ENTERPRISE_API_KEY
```

:::caution Enterprise Admin Access Required
This endpoint can only be accessed using an Enterprise Admin API key. Regular API keys do not have sufficient privileges.
:::

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `abstractUserId` | String | Yes | Unique identifier for the user |

### Request Body Example

```json
{
  "abstractUserId": "281743-2322-34i44sd3-dkfjgdkjf292"
}
```

## Response

### Success Response (200 OK)

```json
{
  "status": 200,
  "body": {
     "yearlyAnalysis": {
        "numberOfGeneratedDesignVariations": 254,
        "numberOfEditedDesigns": 46,
        "numberOfDownloadedDesigns": 24,
        "numberOfMedia": 25,
        "mediaSize": "25Mb"
     }, 
     "monthlyAnalysis": [
        {
          "numberOfGeneratedDesignVariations": 54,
          "numberOfEditedDesigns": 16,
          "numberOfDownloadedDesigns": 4,
          "numberOfMedia": 250,
          "mediaSize": "2Mb"
        }
     ],
     "creditBalance": {
        "availableCredits": 100,
        "usedCredits": 20
     },
     "lastAccessed": 1325312222
  }
}
```

### Response Body Parameters

#### YearlyAnalysis Object

| Parameter | Type | Description |
|-----------|------|-------------|
| `numberOfGeneratedDesignVariations` | Integer | Total number of design variations generated in the past year |
| `numberOfEditedDesigns` | Integer | Total number of designs that were edited |
| `numberOfDownloadedDesigns` | Integer | Total number of designs that were downloaded |
| `numberOfMedia` | Integer | Number of media items uploaded/used |
| `mediaSize` | String | Total size of media in storage |

#### MonthlyAnalysis Array

Contains monthly breakdown of the same metrics found in YearlyAnalysis.

#### CreditBalance Object

| Parameter | Type | Description |
|-----------|------|-------------|
| `availableCredits` | Integer | Number of credits available for the account |
| `usedCredits` | Integer | Number of credits consumed |

### Error Responses

#### User Not Found (400 Bad Request)

```json
{
  "status": 400,
  "body": {
    "message": "User does not exist"
  }
}
```

#### Authentication Error (401 Unauthorized)

```json
{
  "status": 401,
  "body": {
    "message": "Failed to authenticate request. Please add sivi-api-key header in request"
  }
}
```

#### Invalid Input (422 Unprocessable Entity)

```json
{
  "status": 422,
  "body": {
    "message": "Invalid input"
  }
}
```

#### Server Error (500 Internal Server Error)

```json
{
  "status": 500,
  "body": {
    "message": "Server internal error"
  }
}
```

## Usage Notes

- This API provides aggregated data about user or workspace activity.
- Response will include usage metrics for design generation, editing, and downloads.
- This API is restricted to Enterprise plan customers with administrative access.
- Data can be queried using an abstract user ID or workspace ID, in order of preference.
