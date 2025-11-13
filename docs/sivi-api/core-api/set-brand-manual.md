---
id: set-brand-manual
title: set-brand-manual
description: Configure brand settings for a user or workspace
sidebar_position: 9
---

# Set Brand

This endpoint allows set brand identity settings for a specific user or workspace, including brand colors, fonts, logo.

## Endpoint

```
POST general/set-brand
```

## Authentication

```http
sivi-api-key: YOUR_API_KEY
```


### Request Body Example

```json
{
  "brandName": "Sivi",
  "brandDescription": "AI design generator for brands and layered vector based design generation",
  "brandUrl": "https://sivi.ai",
  "brandLogo": "https://sivi.ai/sivi-logo.png",
  "brandColors": ["#5662EC", "#EF9AB2"],
  "brandFonts": [],
  "brandPersona": {
    "emotions": ["happy"],
    "industry": "games",
    "audience": ["working mom", "working dad"],
    "designTags": ["minimal", "time management", "productivity", "health"],
  }
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `brandName` | String | Yes | Name of the brand |
| `brandDescription` | String | Yes | Description or tagline of the brand |
| `brandUrl` | String | No | Website URL of the brand |
| `brandLogo` | String | No | URL to the brand's logo image |
| `brandColors` | Array | No | List of brand colors in hex format |
| `brandFonts` | Array | No | List of brand fonts (Coming Soon) |
| `brandPersona` | Object | No | Brand persona details |
| `brandPersona.emotions` | Array | No | List of brand emotions |
| `brandPersona.industry` | String | No | Brand industry |
| `brandPersona.audience` | Array | No | List of brand target audience |
| `brandPersona.designTags` | Array | No | List of brand design tags |

Note:: See all available options for each parameter in the [Brand Persona Details](../common/brand-persona-details) section.

## Response

### Success Response (200 OK)

```json
{
  "status": 200,
  "body": {
    "message": "Successfully set the brand details"
  }
}
```

### Error Responses

#### User Not Found (400 Bad Request)

```json
{
  "status": 400,
  "body": {
    "message": "User does not exist"
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

- This API configures brand identity settings that will be applied to designs created in the specified user's workspace
- Brand colors should be provided as hex values (e.g., "#5662EC")
- Brand logo should be a direct URL to an image file
- For best results retrieve brand details automatically using the [Extract Brand API](./extract-brand) from website to setting them manually
- After setting brand details, all new designs created by the user will incorporate these brand elements automatically
- For best results, provide at least the brand name, brand description, logo, and primary colors
