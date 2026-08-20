---
id: create-dimension-set
title: Create Dimension Set
description: Create a new dimension set in a workspace
sidebar_position: 2
---

# Create Dimension Set

Create a new dimension set in the authenticated workspace. A dimension set groups one or more size definitions that can be used for design generation.

## Endpoint

```http
POST dimensionSet/create
```

## Authentication

Include your Enterprise API credentials in the request headers:

```http
sivi-api-key: YOUR_API_KEY
```

### Request Body Example

```json
{
  "name": "My Banner Set",
  "sizes": [
    {
      "dimension": { "width": 600, "height": 300 },
      "medium": "displayAds",
      "mediumType": "displayAds-half-page-ad"
    },
    {
      "dimension": { "width": 300, "height": 300 }
    }
  ],
  "defaultSizeId": null
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sizes` | Array | Yes | List of size definitions (min 1) |
| `sizes[].dimension` | Object | Yes | Size dimensions |
| `sizes[].dimension.width` | Number | Yes | Width in pixels (must be > 0) |
| `sizes[].dimension.height` | Number | Yes | Height in pixels (must be > 0) |
| `sizes[].medium` | String | No | Medium type (e.g. `displayAds`). Defaults to `custom` |
| `sizes[].mediumType` | String | No | Medium subtype (e.g. `displayAds-half-page-ad`). Defaults to `custom` |
| `defaultSizeId` | String | No | The default size ID. Defaults to the first size's `sId` if omitted; must match a `sId` in `sizes` |
| `name` | String | No | Display name of the dimension set. Defaults to `Banner Set` |
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
      "name": "My Banner Set",
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
  }
}
```

### Response Body Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `bSDId` | String | Dimension set identifier |
| `wId` | String | Workspace ID the set belongs to |
| `system` | String | Always `USER` for API-created sets |
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
    "message": "sizes must have at least one element"
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

- `wId` is derived from the authenticated session and cannot be set in the request body
- All API-created dimension sets are `USER` records; `SYSTEM` records cannot be created via the API
- A unique `bSDId` is auto-generated for each new dimension set
- If `defaultSizeId` is omitted, the first size's auto-generated `sId` is used
- `sId` for each size is auto-generated; providing it in the request will result in a validation error
