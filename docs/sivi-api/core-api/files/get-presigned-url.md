---
id: get-presigned-url
title: Get Presigned URL
description: Get a presigned upload URL for direct file upload to S3
sidebar_position: 1
---

# Get Presigned URL

Generate a short-lived presigned PUT URL that allows you to upload a file directly to S3. After the upload completes:

- For **media files** (photos, logos, etc.): use the [Create Media](../media/create-media) endpoint with the `uploadUrl` to register the media record
- For **font files**: use the [Upload Fonts](../fonts/upload-fonts) endpoint with the `uploadUrl` as `uploadedURL` to process the font

## Endpoint

```http
POST files/get-presigned-url
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
  "extension": "jpeg",
  "contentType": "image/jpeg",
  "bId": "b_s87vFxpfM0R",
  "expiresIn": 300
}
```

### Request Body Example — Font Upload

```json
{
  "type": "font",
  "extension": "ttf",
  "contentType": "font/ttf"
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | String | Yes | Media type for the upload. Allowed values: `photo`, `logo`, `illustration`, `screenshot`, `backdrop`, `font` |
| `extension` | String | No | File extension. Allowed values: `jpg`, `jpeg`, `png`, `svg`, `webp`, `gif`, `bmp`, `tiff`, `ttf` (default: `jpeg`) |
| `contentType` | String | No | MIME type of the file being uploaded |
| `bId` | String | No | Brand ID to associate the uploaded file with |
| `expiresIn` | Number | No | URL expiration time in seconds (60-3600) |
| `abstractUserId` | String | No | Unique identifier for the user (Enterprise/Super API only) |

## Response

### Success Response (200 OK)

```json
{
  "status": 200,
  "body": {
    "uploadUrl": "https://media.hellosivi.com/photos/abc123.jpeg?X-Amz-Algorithm=...",
    "method": "PUT",
    "headers": {
      "Content-Type": "image/jpeg"
    },
    "expiresIn": 300,
    "fileName": "abc123.jpeg"
  }
}
```

### Response Body Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `uploadUrl` | String | Presigned URL to upload the file to (PUT request) |
| `method` | String | HTTP method to use for upload (`PUT`) |
| `headers` | Object | Required headers for the upload request |
| `headers.Content-Type` | String | Content-Type header value |
| `expiresIn` | Number | URL expiration time in seconds |
| `fileName` | String | Generated file name in S3 |

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
    "message": "Failed to generate presigned URL"
  }
}
```

## Usage Notes

- This is a **two-step upload flow**:
  1. Call this endpoint to get a presigned URL
  2. Upload your file directly to the presigned URL using an HTTP `PUT` request
  3. Call the appropriate endpoint to register the uploaded file:
     - For media: [Create Media](../media/create-media) with the `uploadUrl`
     - For fonts: [Upload Fonts](../fonts/upload-fonts) with the `uploadUrl` as `uploadedURL`
- The presigned URL is short-lived and expires after the specified `expiresIn` duration
- For font uploads, `type` must be `font` and `extension` must be `ttf`
- See [Media Types & SubTypes](../../common/media-types) for all supported type and extension values

### Upload Example — Media (cURL)

```bash
# Step 1: Get presigned URL (response shown above)

# Step 2: Upload file to presigned URL
curl -X PUT \
  -H "Content-Type: image/jpeg" \
  --data-binary "@photo.jpg" \
  "https://media.hellosivi.com/photos/abc123.jpeg?X-Amz-Algorithm=..."

# Step 3: Register the media via Create Media
curl -X POST \
  -H "sivi-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"type":"photo","uploadUrl":"https://media.hellosivi.com/photos/abc123.jpeg?X-Amz-Algorithm=..."}' \
  "https://api.sivi.ai/media/create"
```

### Upload Example — Font (cURL)

```bash
# Step 1: Get presigned URL for font
# (use type: "font", extension: "ttf", contentType: "font/ttf")

# Step 2: Upload font file to presigned URL
curl -X PUT \
  -H "Content-Type: font/ttf" \
  --data-binary "@MyCustomFont.ttf" \
  "https://media.hellosivi.com/user-data/.../MyCustomFont.ttf?X-Amz-Algorithm=..."

# Step 3: Process the font via Upload Fonts
curl -X POST \
  -H "sivi-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"uploadedURL":"https://media.hellosivi.com/user-data/.../MyCustomFont.ttf?X-Amz-Algorithm=..."}' \
  "https://api.sivi.ai/font/create"
```
