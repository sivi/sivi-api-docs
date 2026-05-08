---
id: update-media
title: Update Media
description: Update metadata of an existing media asset
sidebar_position: 3
---

# Update Media

Update metadata of an existing media asset in the authenticated workspace. Only the fields provided in the request will be updated.

## Endpoint

```http
POST media/update
```

## Authentication

Include your Enterprise API credentials in the request headers:

```http
sivi-api-key: YOUR_API_KEY
```

### Request Body Example

```json
{
  "mId": "w_abc123----photo_001.jpeg",
  "touchPosition": {
    "center": true,
    "bottom": true
  },
  "imagePreference": {
    "crop": true,
    "removeBg": true,
    "enhancement": false
  },
  "hueRotations": []
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mId` | String | Yes | Media ID to update |
| `touchPosition` | Object | No | Updated touch position flags |
| `touchPosition.left` | Boolean | No | Left touch position |
| `touchPosition.right` | Boolean | No | Right touch position |
| `touchPosition.bottom` | Boolean | No | Bottom touch position |
| `touchPosition.top` | Boolean | No | Top touch position |
| `touchPosition.center` | Boolean | No | Center touch position |
| `imagePreference` | Object | No | Updated image processing preferences |
| `imagePreference.crop` | Boolean | No | Enable crop |
| `imagePreference.removeBg` | Boolean | No | Enable background removal |
| `imagePreference.enhancement` | Boolean | No | Enable image enhancement |
| `hueRotations` | Array | No | Updated list of hue rotation values |
| `abstractUserId` | String | No | Unique identifier for the user (Enterprise/Super API only) |

## Response

### Success Response (200 OK)

```json
{
  "status": 200,
  "body": {
    "media": {
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
          "bottom": true,
          "top": false,
          "center": true
        },
        "imagePreference": {
          "crop": true,
          "removeBg": true,
          "enhancement": false
        },
        "hueRotations": [],
        "logoStyle": []
      }
    }
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

- The media must belong to the authenticated workspace
- Only provided fields will be updated; omit fields you don't want to change
- `touchPosition` and `imagePreference` are merged with existing values, not replaced entirely
