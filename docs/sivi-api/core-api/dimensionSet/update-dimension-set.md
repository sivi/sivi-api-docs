---
id: update-dimension-set
title: Update Dimension Set
description: Update an existing dimension set in a workspace
sidebar_position: 3
---

# Update Dimension Set

Update an existing dimension set in the authenticated workspace. Only the fields provided in the request will be updated. Only `USER` dimension sets can be updated; `SYSTEM` sets are read-only.

## Endpoint

```http
POST dimensionSet/update
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
  "name": "Updated Banner Set",
  "sizes": [
    {
      "dimension": { "width": 1200, "height": 628 },
      "medium": "displayAds",
      "mediumType": "displayAds-leaderboard"
    }
  ]
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bSDId` | String | Yes | Dimension set ID to update |
| `sizes` | Array | No | Replaces the existing sizes if provided (min 1) |
| `sizes[].dimension` | Object | Yes | Size dimensions |
| `sizes[].dimension.width` | Number | Yes | Width in pixels (must be > 0) |
| `sizes[].dimension.height` | Number | Yes | Height in pixels (must be > 0) |
| `sizes[].medium` | String | No | Medium type (e.g. `displayAds`). Defaults to `custom` |
| `sizes[].mediumType` | String | No | Medium subtype (e.g. `displayAds-half-page-ad`). Defaults to `custom` |
| `defaultSizeId` | String | No | The default size ID. If the current default is removed from `sizes`, it is reset to the first size's `sId` |
| `name` | String | No | Updated display name |
| `abstractUserId` | String | No | Unique identifier for the user (Enterprise/Super API only) |

## Response

### Success Response (200 OK)

```json
{
  "status": 200,
  "body": {
    "dimensionSet": {
      "bSDId": "bsd_abc123",
      "wId": "w_abc123",
      "system": "USER",
      "name": "Updated Banner Set",
      "defaultSizeId": "s_ghi789",
      "sizes": [
        {
          "sId": "s_ghi789",
          "dimension": { "width": 1200, "height": 628 },
          "medium": "displayAds",
          "mediumType": "displayAds-leaderboard"
        }
      ],
      "createdOn": 1723300000,
      "updatedOn": 1723300200
    }
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
| `sizes[].medium` | String | Medium type |
| `sizes[].mediumType` | String | Medium subtype |
| `createdOn` | Number | Creation timestamp |
| `updatedOn` | Number | Last update timestamp |

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
- `SYSTEM` dimension sets cannot be updated via the API
- If `sizes` is provided, it replaces the existing sizes entirely
- If the current `defaultSizeId` is no longer present in the new `sizes`, it is reset to the first size's `sId`
- `sId` for each size is auto-generated; providing it in the request will result in a validation error
- `updatedOn` is refreshed automatically on every update
