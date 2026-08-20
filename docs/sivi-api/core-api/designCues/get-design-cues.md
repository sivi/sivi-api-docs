---
id: get-design-cues
title: Get Design Cues
description: Retrieve design cues from a workspace
sidebar_position: 1
---

# Get Design Cues

Retrieve a paginated list of design cues for the authenticated workspace. Supports filtering by type, brand, specific cue IDs, and a free-text search on the instruction text.

## Endpoint

```http
POST designCues/get
```

## Authentication

Include your Enterprise API credentials in the request headers:

```http
sivi-api-key: YOUR_API_KEY
```

### Request Body Example

```json
{
  "type": "design",
  "bId": "b_s87vFxpfM0R",
  "limit": 20,
  "cursor": null,
  "sort": "DESC"
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dcIds` | Array | No | Filter by a list of specific design cue IDs |
| `type` | String | No | Filter by cue type (e.g. `design`, `prompt`) |
| `bId` | String | No | Filter by brand ID |
| `searchTerm` | String | No | Free-text search on the `instruction` field |
| `limit` | Number | No | Number of items to return (1-50, default: 20) |
| `cursor` | String | No | Cursor for pagination |
| `sort` | String | No | Sort order. Allowed values: `ASC`, `DESC` |
| `abstractUserId` | String | No | Unique identifier for the user (Enterprise/Super API only) |

## Response

### Success Response (200 OK)

```json
{
  "status": 200,
  "body": {
    "designCues": [
      {
        "dcId": "abc123",
        "wId": "w_abc123",
        "bId": "b_s87vFxpfM0R",
        "uId": "usr1",
        "type": "design",
        "instruction": "Use bold typography",
        "addedBy": "system",
        "source": "prompt",
        "createdOn": 1723300000,
        "updatedOn": 1723300000
      }
    ],
    "cursor": "eyJkY0lkIjoiYWJjMTIzIn0"
  }
}
```

### Response Body Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `dcId` | String | Design cue identifier |
| `wId` | String | Workspace ID the cue belongs to |
| `bId` | String | Brand ID the cue is associated with (or `null`) |
| `uId` | String | User ID of the creator (or `null`) |
| `type` | String | Cue type (e.g. `design`, `prompt`) |
| `instruction` | String | The design instruction text |
| `addedBy` | String | Who added the cue |
| `source` | String | Source of the cue |
| `createdOn` | Number | Creation timestamp |
| `updatedOn` | Number | Last update timestamp |
| `cursor` | String | Cursor for fetching the next page of results |

### Error Responses

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

- Results are scoped to the authenticated workspace; `wId` is derived from the session and cannot be set in the request body
- Results are paginated; use the returned `cursor` value in subsequent requests
- `searchTerm` performs a partial match on the `instruction` field
- Only non-deleted cues are returned
