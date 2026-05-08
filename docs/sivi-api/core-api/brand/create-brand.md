---
id: create-brand
title: Create Brand
description: Create a new brand identity for a workspace
sidebar_position: 2
---

# Create Brand

Create a new brand identity for the authenticated workspace. If the workspace already has a default brand, the existing brand will be archived and the new brand will be set as default.

## Endpoint

```http
POST brand/create
```

## Authentication

Include your Enterprise API credentials in the request headers:

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
    "designTags": ["minimal", "time management", "productivity", "health"]
  }
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `brandName` | String | Yes | Name of the brand |
| `brandDescription` | String | Yes | Description or tagline of the brand |
| `brandUrl` | String | No | Website URL of the brand (must be a valid HTTP/HTTPS URL) |
| `brandLogo` | String | No | URL to the brand's logo image (must be a valid HTTP/HTTPS URL) |
| `brandColors` | Array | No | List of brand colors in hex format |
| `brandFonts` | Array | No | List of brand fonts |
| `brandPersona` | Object | No | Brand persona details |
| `brandPersona.emotions` | Array | No | List of brand emotions |
| `brandPersona.industry` | String | No | Brand industry |
| `brandPersona.audience` | Array | No | List of brand target audience |
| `brandPersona.designTags` | Array | No | List of brand design tags |
| `abstractUserId` | String | No | Unique identifier for the user (Enterprise/Super API only) |

Note:: See all available options for each parameter in the [Brand Persona Details](../../common/brand-persona-details) section.

## Response

### Success Response (200 OK)

```json
{
  "status": 200,
  "body": {
    "message": "Successfully set the brand details",
    "brandDetails": [
      {
        "bId": "b_s87vFxpfM0R",
        "brandName": "Sivi",
        "brandDescription": "AI design generator for brands and layered vector based design generation",
        "brandUrl": "https://sivi.ai",
        "brandColors": [
          { "color": "#5662EC", "addedBy": "user", "primary": false },
          { "color": "#EF9AB2", "addedBy": "user", "primary": false }
        ],
        "brandFonts": [],
        "brandPersona": {
          "emotions": ["happy"],
          "industry": "games",
          "audience": ["working mom", "working dad"],
          "designTags": ["minimal", "time management", "productivity", "health"]
        },
        "brandLogos": ["https://media.hellosivi.com/logo/abc.png"],
        "brandImages": []
      }
    ]
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

- Brand colors should be provided as hex values (e.g., `"#5662EC"`)
- Brand logo should be a direct URL to an image file
- When a new brand is created, the previous default brand (if any) is automatically archived
- The new brand is set as the default brand for the workspace
- For best results, provide at least the brand name, brand description, logo, and primary colors
