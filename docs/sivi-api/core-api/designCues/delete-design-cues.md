---
id: delete-design-cues
title: Delete Design Cues
description: Delete design cues from a workspace
sidebar_position: 4
---

# Delete Design Cues

Soft-delete one or more design cues from the authenticated workspace. Deleted cues are marked as deleted and excluded from [Get Design Cues](./get-design-cues) results.

## Endpoint

```http
POST designCues/delete
```

## Authentication

Include your Enterprise API credentials in the request headers:

```http
sivi-api-key: YOUR_API_KEY
```

### Request Body Example

```json
{
  "dcIds": ["abc123", "def456"]
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dcIds` | Array | Yes | List of design cue IDs to delete (min 1) |
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

### Response Body Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `deletedCount` | Number | Number of design cues successfully deleted |

### Error Responses

#### Design Cue Not Found (422 Unprocessable Entity)

```json
{
  "status": 422,
  "body": {
    "message": "Design cue not found: abc123"
  }
}
```

#### Unauthorized (401 Unauthorized)

```json
{
  "status": 401,
  "body": {
    "message": "Design cue does not belong to this workspace: abc123"
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
    "message": "dcIds is required"
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

- All design cue IDs must belong to the authenticated workspace
- This is a soft-delete operation; cues are marked as deleted but not permanently removed
- `deletedCount` reflects the number of cues that were successfully marked as deleted
