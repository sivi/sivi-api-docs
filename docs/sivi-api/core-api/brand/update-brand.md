---
id: update-brand
title: Update Brand
description: Update an existing brand identity
sidebar_position: 6
---

# Update Brand

Update an existing brand identity for the authenticated workspace. Only the fields provided in the request will be updated; omitted fields remain unchanged.

## Endpoint

```http
POST brand/update
```

## Authentication

Include your Enterprise API credentials in the request headers:

```http
sivi-api-key: YOUR_API_KEY
```

### Request Body Example

```json
{
  "bId": "b_s87vFxpfM0R",
  "brandName": "Sivi AI",
  "brandDescription": "AI-powered design generation platform",
  "brandUrl": "https://sivi.ai",
  "brandColors": ["#5662EC", "#EF9AB2", "#FF6B6B"],
  "brandPersona": {
    "emotions": ["excited", "innovative"],
    "industry": "technology",
    "audience": ["designers", "marketers"],
    "designTags": ["modern", "bold"]
  },
  "imageGenPreference": {
    "model": "flux-1.1-pro"
  },
  "textGenPreference": {
    "model": "gpt-4o"
  },
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bId` | String | Yes | Brand ID to update |
| `brandName` | String | No | Updated brand name |
| `brandDescription` | String | No | Updated brand description |
| `brandUrl` | String | No | Updated website URL |
| `brandLogo` | String | No | Updated logo URL |
| `brandColors` | Array | No | Updated list of brand colors in hex format |
| `brandFonts` | Array | No | Updated list of brand fonts |
| `brandPersona` | Object | No | Updated brand persona details |
| `brandPersona.emotions` | Array | No | List of brand emotions |
| `brandPersona.industry` | String | No | Brand industry |
| `brandPersona.audience` | Array | No | List of target audience |
| `brandPersona.designTags` | Array | No | List of design tags |
| `imageGenPreference` | Object | No | Image generation model preferences |
| `imageGenPreference.model` | String | No | Image generation model. See [Supported Models](../../common/supported-models#image-generation-models) for allowed values |
| `textGenPreference` | Object | No | Text generation model preferences |
| `textGenPreference.model` | String | No | Text generation model. See [Supported Models](../../common/supported-models#text-generation-models) for allowed values |
<!-- | `genModePreference` | Object | No | Generation mode preferences per mode |
| `genModePreference.compose` | Object/Array | No | Compose mode preferences |
| `genModePreference.decompose` | Object/Array | No | Decompose mode preferences |
| `genModePreference.imagine` | Object/Array | No | Imagine mode preferences | -->

Note:: See all available options for each parameter in the [Brand Persona Details](../../common/brand-persona-details) section.

<!-- ### Gen Mode Preference Items

Each gen mode preference item supports:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | String | No | Design type (e.g., `design`) |
| `model` | String | No | Model to use. See [Supported Models](../../common/supported-models#design-generation-models) for allowed values |
| `sizeType` | String | No | Named size type (e.g., `instagram-post`). Resolves to a dimension automatically |
| `dimension` | Object | No | Manual dimension override `{ width, height }` |
| `medium` | String | No | Medium override (used with `dimension`) |
| `sizeMode` | String | No | Size mode (default: `manual`) | -->

## Response

### Success Response (200 OK)

```json
{
  "status": 200,
  "body": {
    "message": "Brand updated successfully",
    "bId": "b_s87vFxpfM0R"
  }
}
```

### Error Responses

#### Brand Not Found (404 Not Found)

```json
{
  "status": 404,
  "body": {
    "message": "Brand not found in workspace"
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
    "message": "bId is required"
  }
}
```

#### Invalid Model (422 Unprocessable Entity)

```json
{
  "status": 422,
  "body": {
    "message": "imageGenPreference model 'invalid-model' is not supported. Allowed: flux-1.1-pro, ..."
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

- The brand must belong to the authenticated workspace
- Only provided fields will be updated; omit fields you don't want to change
- `brandPersona` is internally mapped to `contentMetaInfo` — the API handles this transformation automatically
- When specifying `genModePreference`, you can provide either a single preference object or an array of preferences per mode
- Use `sizeType` for named sizes (e.g., `instagram-post`) instead of manual `dimension` when possible
