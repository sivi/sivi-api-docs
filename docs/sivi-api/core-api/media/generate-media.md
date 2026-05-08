---
id: generate-media
title: Generate Media
description: Generate or enhance images using AI
sidebar_position: 5
---

# Generate Media

Generate new images from a text prompt, or enhance existing images using AI. This is a queue-based API — it returns a `requestId` that can be used to check the status and retrieve results using the [get-request-status](../get-request-status.md) API.

## Endpoint

```http
POST media/generate
```

## Authentication

Include your Enterprise API credentials in the request headers:

```http
sivi-api-key: YOUR_API_KEY
```

### Request Body Example — Generate Image

```json
{
  "prompt": "A modern minimalist logo for a coffee shop",
  "dimensions": {
    "width": 1024,
    "height": 1024
  },
  "bId": "b_s87vFxpfM0R",
  "model": "z-image-turbo",
  "negativePrompt": "blurry, low quality"
}
```

### Request Body Example — Enhance Image

```json
{
  "prompt": "Make this logo more vibrant and professional",
  "dimensions": {
    "width": 1024,
    "height": 1024
  },
  "bId": "b_s87vFxpfM0R",
  "model": "nano-banana:1k",
  "siviAssets": [
    { "mId": "w_abc123----photo_001.jpeg" }
  ],
  "assets": {
    "photo": [
      { "url": "https://example.com/reference.jpg" }
    ]
  }
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `prompt` | String | Yes | Text prompt describing the desired image |
| `dimensions` | Object | Yes | Output image dimensions |
| `dimensions.width` | Number | Yes | Image width (must be positive) |
| `dimensions.height` | Number | Yes | Image height (must be positive) |
| `bId` | String | Yes | Brand ID for style context |
| `model` | String | Yes | AI model to use for generation. See [Supported Models](../../common/supported-models#image-generation-models) for allowed values |
| `siviAssets` | Array | No | Existing Sivi media assets to enhance (max 4 total assets) |
| `siviAssets[].mId` | String | Yes | Media ID of the Sivi asset |
| `assets` | Object | No | External URL-based assets grouped by type (max 4 total assets) |
| `negativePrompt` | String | No | Elements to avoid in the generated image |

### Asset Limits

- Maximum of **4 image assets** total (combined `siviAssets` + `assets`)
- When assets are provided, the API performs **image enhancement** instead of generation
- Without assets, the API performs **image generation** from the prompt

## Response

```json
{
  "status": 200,
  "body": {
    "requestId": "abc123xyz"
  }
}
```

### Response Body Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `requestId` | String | Request ID — use with [get-request-status](../get-request-status.md) to check results |

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
    "message": "Prompt is required and must be a string."
  }
}
```

#### Model Not Supported (422 Unprocessable Entity)

```json
{
  "status": 422,
  "body": {
    "message": "Model 'invalid-model' is not supported."
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

- Use the returned `jId` with [get-request-status](../get-request-status.md) to poll for completion and retrieve the generated image
- When providing assets, the operation becomes an **enhancement** — the AI modifies the provided images based on the prompt
- Without assets, the operation is a pure **generation** from the text prompt
- The `model` must support the requested operation type (generation or enhancement)
- Dimensions must be supported by the selected model
