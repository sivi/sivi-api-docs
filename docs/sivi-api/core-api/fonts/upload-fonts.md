---
id: upload-fonts
title: Upload Fonts
description: Upload custom fonts to a workspace
sidebar_position: 2
---

# Upload Fonts

Upload custom fonts to the authenticated workspace. Before calling this endpoint, you must first upload the font file using the [Get Presigned URL](../files/get-presigned-url) flow. This is a queue-based API — it returns a `requestId` that can be used to check the status and retrieve results using the [get-request-status](../get-request-status.md) API.

## Endpoint

```http
POST font/create
```

## Authentication

Include your Enterprise API credentials in the request headers:

```http
sivi-api-key: YOUR_API_KEY
```

### Prerequisite: Upload Font File via Presigned URL

Before calling this endpoint, you must upload the font file to S3 using the presigned URL flow:

1. Call [Get Presigned URL](../files/get-presigned-url) with `{ "type": "font", "extension": "ttf", "contentType": "font/ttf" }`
2. Upload your `.ttf` file to the returned `uploadUrl` via HTTP `PUT`
3. Use the `uploadUrl` as the `uploadedURL` parameter in this endpoint

### Request Body Example

```json
{
  "uploadedURL": "https://media.hellosivi.com/user-data/w_abc123/fonts/MyCustomFont.ttf?X-Amz-Algorithm=..."
}
```

### Multiple Fonts Example

```json
{
  "uploadedURL": [
    "https://media.hellosivi.com/user-data/w_abc123/fonts/FontOne.ttf?X-Amz-Algorithm=...",
    "https://media.hellosivi.com/user-data/w_abc123/fonts/FontTwo.ttf?X-Amz-Algorithm=..."
  ]
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `uploadedURL` | String/Array | Yes | Presigned URL(s) returned by [Get Presigned URL](../files/get-presigned-url) after uploading the font file(s). Can be a single URL string or an array of URLs |

## Response

The API returns a requestId that can be used to check the status and retrieve results:

```json
{
  "status": 200,
  "body": {
    "requestId": "sbhMkIZKCPp"
  }
}
```

### Checking Request Status

Use the [get-request-status](../get-request-status.md) API with the requestId to check the status and get the results.

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
    "message": "Invalid uploadedURL format"
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

- You **must** call [Get Presigned URL](../files/get-presigned-url) with `type: "font"` and `extension: "ttf"` first, upload the font file to the presigned URL, then pass that presigned URL as `uploadedURL` here
- The font ID is automatically extracted from the URL filename
- You can upload multiple fonts in a single request by providing an array of URLs
- After upload completes, the fonts will be available via [Get Fonts](./get-fonts) with `source: "user"`
