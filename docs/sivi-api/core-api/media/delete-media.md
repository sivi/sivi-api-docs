---
id: delete-media
title: Delete Media
description: Delete media assets from a workspace
sidebar_position: 4
---

# Delete Media

Soft-delete one or more media assets from the authenticated workspace. Deleted media is marked as deleted and excluded from [Get Media](./get-media) results.

## Endpoint

```http
POST media/delete
```

## Authentication

Include your Enterprise API credentials in the request headers:

```http
sivi-api-key: YOUR_API_KEY
```

### Request Body Example

```json
{
  "mIds": [
    "w_abc123----photo_001.jpeg",
    "w_abc123----photo_002.jpeg"
  ]
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mIds` | Array | Yes | List of media IDs to delete (max 20) |
| `abstractUserId` | String | No | Unique identifier for the user (Enterprise/Super API only) |

## Response

### Success Response (200 OK)

```json
{
  "status": 200,
  "body": {
    "deletedCount": 2
  }
}
```

### Error Responses

#### Media Not Found (404 Not Found)

```json
{
  "status": 404,
  "body": {
    "message": "Media not found: w_abc123----photo_001.jpeg"
  }
}
```

#### Unauthorized (401 Unauthorized)

```json
{
  "status": 401,
  "body": {
    "message": "Media does not belong to this workspace: w_abc123----photo_001.jpeg"
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

- All media IDs must belong to the authenticated workspace
- Maximum 20 media items can be deleted in a single request
- This is a soft-delete operation; media is marked as deleted but not permanently removed
