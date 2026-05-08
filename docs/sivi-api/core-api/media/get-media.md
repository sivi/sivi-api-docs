---
id: get-media
title: Get Media
description: Retrieve media assets from a workspace
sidebar_position: 1
---

# Get Media

Retrieve a paginated list of media assets for the authenticated workspace. Supports filtering by type, subType, brand, and specific media ID.

## Endpoint

```http
POST media/get
```

## Authentication

Include your Enterprise API credentials in the request headers:

```http
sivi-api-key: YOUR_API_KEY
```

### Request Body Example

```json
{
  "type": "photo",
  "subType": "photograph",
  "bId": "b_s87vFxpfM0R",
  "limit": 10,
  "cursor": null,
  "sort": "DESC"
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | String | No | Filter by media type. See [Media Types & SubTypes](../../common/media-types) for allowed values |
| `subType` | String | No | Filter by media subType. Must be valid for the given `type`. See [Media Types & SubTypes](../../common/media-types) for valid combinations |
| `mId` | String | No | Filter by a specific media ID |
| `bId` | String | No | Filter by brand ID |
| `limit` | Number | No | Number of items to return (1-50, default: 10) |
| `cursor` | String | No | Cursor for pagination |
| `sort` | String | No | Sort order. Allowed values: `ASC`, `DESC` |
| `abstractUserId` | String | No | Unique identifier for the user (Enterprise/Super API only) |

### Valid Type and SubType Combinations

See [Media Types & SubTypes](../../common/media-types) for the complete list of valid type and subType combinations.

## Response

### Success Response (200 OK)

```json
{
  "status": 200,
  "body": {
    "media": [
      {
        "mId": "w_abc123----photo_001.jpeg",
        "bId": "b_s87vFxpfM0R",
        "type": "photo",
        "subType": "photograph",
        "system": "USER",
        "url": "photo_001.jpeg",
        "createdOn": 1715000000,
        "meta": {
          "touchPosition": {
            "left": false,
            "right": false,
            "bottom": false,
            "top": false,
            "center": false
          },
          "imagePreference": {
            "crop": null,
            "removeBg": null,
            "enhancement": null
          },
          "hueRotations": [],
          "logoStyle": []
        }
      }
    ],
    "cursor": "691443e27209a0eab5771a1b"
  }
}
```

### Response Body Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `mId` | String | Media identifier |
| `bId` | String | Brand ID the media is associated with (or `null`) |
| `type` | String | Media type |
| `subType` | String | Media subType |
| `system` | String | `USER` or `SYSTEM` |
| `url` | String | Media file name/path |
| `createdOn` | Number | Creation timestamp |
| `meta.touchPosition` | Object | Touch position flags for design placement |
| `meta.imagePreference` | Object | Image processing preferences |
| `meta.hueRotations` | Array | Hue rotation values |
| `meta.logoStyle` | Array | Logo style options |
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
    "message": "Invalid type and subType combination"
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

- Results are paginated; use the returned `cursor` value in subsequent requests
- When specifying both `type` and `subType`, the combination must be valid (see table above)
- Only `USER` media is returned by default; `SYSTEM` media is excluded
