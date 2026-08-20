---
id: get-dimension-sets
title: Get Dimension Sets
description: Retrieve dimension sets from a workspace
sidebar_position: 1
---

# Get Dimension Sets

Retrieve a paginated list of dimension sets for the authenticated workspace. A dimension set (banner set dimension) groups one or more size definitions that can be used for design generation.

## Endpoint

```http
POST dimensionSet/get
```

## Authentication

Include your Enterprise API credentials in the request headers:

```http
sivi-api-key: YOUR_API_KEY
```

### Request Body Example

```json
{
  "bSDId": "bsd_abc123",
  "limit": 20,
  "cursor": null,
  "sort": "DESC"
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bSDId` | String | No | Filter by a specific dimension set ID |
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
    "dimensionSets": [
      {
        "bSDId": "bsd_abc123",
        "wId": "w_abc123",
        "system": "USER",
        "name": "Banner Set",
        "defaultSizeId": "s_xyz789",
        "sizes": [
          {
            "sId": "s_xyz789",
            "dimension": { "width": 600, "height": 300 },
            "medium": "displayAds",
            "mediumType": "displayAds-half-page-ad"
          },
          {
            "sId": "s_def456",
            "dimension": { "width": 300, "height": 300 },
            "medium": "custom",
            "mediumType": "custom"
          }
        ],
        "createdOn": 1723300000,
        "updatedOn": 1723300000
      }
    ],
    "cursor": "eyJiU0RJZCI6ImJzZF9hYmMxMjMifQ"
  }
}
```

### Response Body Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `bSDId` | String | Dimension set identifier |
| `wId` | String | Workspace ID the set belongs to |
| `system` | String | `USER` or `SYSTEM` |
| `name` | String | Display name of the dimension set |
| `defaultSizeId` | String | The default size ID within the set |
| `sizes` | Array | List of size definitions |
| `sizes[].sId` | String | Size identifier |
| `sizes[].dimension` | Object | Size dimensions |
| `sizes[].dimension.width` | Number | Width in pixels |
| `sizes[].dimension.height` | Number | Height in pixels |
| `sizes[].medium` | String | Medium type (e.g. `displayAds`, `custom`) |
| `sizes[].mediumType` | String | Medium subtype (e.g. `displayAds-half-page-ad`, `custom`) |
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
- Only non-deleted dimension sets belonging to the workspace are returned
