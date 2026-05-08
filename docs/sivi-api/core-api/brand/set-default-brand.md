---
id: set-default-brand
title: Set Default Brand
description: Set a brand as the default brand for a workspace
sidebar_position: 4
---

# Set Default Brand

Set an existing brand as the default brand for the authenticated workspace. The default brand is used when generating designs without specifying a brand.

## Endpoint

```http
POST brand/set-default
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
| `bId` | String | Yes | Brand ID to set as default |
| `abstractUserId` | String | No | Unique identifier for the user (Enterprise/Super API only) |

## Response

### Success Response (200 OK)

```json
{
  "status": 200,
  "body": {
    "message": "Default brand updated successfully",
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
- Only one brand can be the default at a time
- Setting a new default brand does not archive the previous default
