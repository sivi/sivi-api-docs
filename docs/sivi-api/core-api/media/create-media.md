---
id: create-media
title: Create Media
description: Upload a new media asset to a workspace
sidebar_position: 2
---

# Create Media

Create a new media asset in the authenticated workspace. Supports two upload methods:

1. **Remote URL**: Provide a `url` to an image; Sivi fetches and stores it
2. **Presigned Upload**: Provide an `uploadUrl` from [Get Presigned URL](../files/get-presigned-url) after completing the upload

## Endpoint

```http
POST media/create
```

## Authentication

Include your Enterprise API credentials in the request headers:

```http
sivi-api-key: YOUR_API_KEY
```

### Request Body Example — Remote URL

```json
{
  "type": "photo",
  "subType": "photograph",
  "url": "https://example.com/image.jpg",
  "bId": "b_s87vFxpfM0R",
  "touchPosition": {
    "center": true
  },
  "imagePreference": {
    "crop": true,
    "removeBg": false,
    "enhancement": true
  },
  "hueRotations": []
}
```

### Request Body Example — Presigned Upload

```json
{
  "type": "photo",
  "subType": "photograph",
  "uploadUrl": "https://media.hellosivi.com/photos/abc123.jpeg?X-Amz-...",
  "bId": "b_s87vFxpfM0R"
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | String | Yes | Media type. See [Media Types & SubTypes](../../common/media-types) for allowed values |
| `subType` | String | No | Media subType. Defaults based on type if omitted. See [Media Types & SubTypes](../../common/media-types) for valid combinations |
| `url` | String | Conditional* | Remote URL to fetch and store (must be valid HTTP/HTTPS) |
| `uploadUrl` | String | Conditional* | Presigned upload URL from [Get Presigned URL](../files/get-presigned-url) |
| `bId` | String | No | Brand ID to associate the media with |
| `touchPosition` | Object | No | Touch position flags for design placement |
| `touchPosition.left` | Boolean | No | Left touch position |
| `touchPosition.right` | Boolean | No | Right touch position |
| `touchPosition.bottom` | Boolean | No | Bottom touch position |
| `touchPosition.top` | Boolean | No | Top touch position |
| `touchPosition.center` | Boolean | No | Center touch position |
| `imagePreference` | Object | No | Image processing preferences |
| `imagePreference.crop` | Boolean | No | Enable crop |
| `imagePreference.removeBg` | Boolean | No | Enable background removal |
| `imagePreference.enhancement` | Boolean | No | Enable image enhancement |
| `hueRotations` | Array | No | List of hue rotation values |
| `abstractUserId` | String | No | Unique identifier for the user (Enterprise/Super API only) |

\* Either `url` or `uploadUrl` is required — provide one, not both.

### Default SubType Mapping

When `subType` is omitted, a default is applied based on the `type`. See the [Media Types & SubTypes](../../common/media-types) reference for the complete list of defaults.

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
          "bottom": false,
          "top": false,
          "center": true
        },
        "imagePreference": {
          "crop": true,
          "removeBg": false,
          "enhancement": true
        },
        "hueRotations": [],
        "logoStyle": []
      }
    }
  }
}
```

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
    "message": "Either url or uploadUrl is required"
  }
}
```

#### Upload Not Found (400 Bad Request)

```json
{
  "status": 400,
  "body": {
    "message": "Uploaded file not found in S3. Ensure the upload to the presigned URL completed successfully."
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

- Use `url` for images hosted externally; Sivi will fetch and store them
- Use `uploadUrl` for the presigned-upload flow: first call [Get Presigned URL](../files/get-presigned-url), upload your file to the returned URL, then call this endpoint with the `uploadUrl`
- Do not provide both `url` and `uploadUrl` in the same request
