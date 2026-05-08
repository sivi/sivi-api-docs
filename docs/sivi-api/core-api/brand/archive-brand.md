---
id: archive-brand
title: Archive Brand
description: Archive a brand from a workspace
sidebar_position: 5
---

# Archive Brand

Archive a brand from the authenticated workspace. Archived brands are excluded from [Get Brands](./get-brands) results by default.

## Endpoint

```http
POST brand/archive
```

## Authentication

Include your Enterprise API credentials in the request headers:

```http
sivi-api-key: YOUR_API_KEY
```

### Request Body Example

```json
{
  "bId": "b_s87vFxpfM0R"
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bId` | String | Yes | Brand ID to archive |
| `abstractUserId` | String | No | Unique identifier for the user (Enterprise/Super API only) |

## Response

### Success Response (200 OK)

```json
{
  "status": 200,
  "body": {
    "message": "Brand archived successfully",
    "bId": "b_s87vFxpfM0R"
  }
}
```

### Error Responses

#### Brand Not Found (404 Not Found)

```json
{
  "status": 404,
  "body": {
    "message": "Brand not found in workspace"
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

- The brand must belong to the authenticated workspace
- Archiving a brand does not delete it permanently; it marks it as archived
- If the archived brand was the workspace default, you should set a new default brand using [Set Default Brand](./set-default-brand)
