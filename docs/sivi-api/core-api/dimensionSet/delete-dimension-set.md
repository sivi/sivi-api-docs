---
id: delete-dimension-set
title: Delete Dimension Set
description: Delete a dimension set from a workspace
sidebar_position: 4
---

# Delete Dimension Set

Soft-delete a dimension set from the authenticated workspace. Only `USER` dimension sets can be deleted; `SYSTEM` sets are read-only.

## Endpoint

```http
POST dimensionSet/delete
```

## Authentication

Include your Enterprise API credentials in the request headers:

```http
sivi-api-key: YOUR_API_KEY
```

### Request Body Example

```json
{
  "bSDId": "bsd_abc123"
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bSDId` | String | Yes | Dimension set ID to delete |
| `abstractUserId` | String | No | Unique identifier for the user (Enterprise/Super API only) |

## Response

### Success Response (200 OK)

```json
{
  "status": 200,
  "body": {
    "message": "Banner set dimension deleted successfully",
    "bSDId": "bsd_abc123"
  }
}
```

### Response Body Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `message` | String | Confirmation message |
| `bSDId` | String | The deleted dimension set ID |

### Error Responses

#### Dimension Set Not Found (422 Unprocessable Entity)

```json
{
  "status": 422,
  "body": {
    "message": "Dimension set not found: bsd_abc123"
  }
}
```

#### Cannot Modify SYSTEM Set (403 Forbidden)

```json
{
  "status": 403,
  "body": {
    "message": "Cannot modify SYSTEM dimension sets"
  }
}
```

#### Unauthorized (401 Unauthorized)

```json
{
  "status": 401,
  "body": {
    "message": "Dimension set does not belong to this workspace: bsd_abc123"
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
    "message": "bSDId is required"
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

- The dimension set must belong to the authenticated workspace
- `SYSTEM` dimension sets cannot be deleted via the API
- This is a soft-delete operation; the set is marked as deleted but not permanently removed
