---
id: get-brands
title: Get Brands
description: Get list of brands for a workspace
sidebar_position: 1
---

# Get Brands

Retrieve a paginated list of brands for the authenticated workspace. You can optionally filter by a specific brand ID.

## Endpoint

```http
POST brand/get
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
  "isDefault": false,
  "limit": 10,
  "cursor": null
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bId` | String | No | Filter by a specific brand ID |
| `limit` | Number | No | Number of items to return (1-50, default: 10) |
| `cursor` | String | No | Cursor for pagination |
| `isDefault` | Boolean | No | If `true`, returns the default brand. If passed along with `bId`, the `bId` will be overridden by the default brand's ID |
| `abstractUserId` | String | No | Unique identifier for the user (Enterprise/Super API only) |

## Response

### Success Response (200 OK)

```json
{
  "status": 200,
  "body": {
    "brands": [
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
          "industry": "technology",
          "emotions": ["excited"],
          "audience": ["tech enthusiasts"],
          "designTags": ["innovative solutions"]
        },
        "brandLogos": ["https://media.hellosivi.com/logo/abc.png"],
        "brandImages": ["https://media.hellosivi.com/photo/xyz.jpg"]
      }
    ],
    "cursor": "691443e27209a0eab5771a1b"
  }
}
```

### Response Body Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `bId` | String | Brand identifier |
| `brandName` | String | Name of the brand |
| `brandDescription` | String | Description or tagline of the brand |
| `brandUrl` | String | Website URL of the brand |
| `brandColors` | Array | List of brand color objects with `color`, `addedBy`, `primary` fields |
| `brandFonts` | Array | List of brand fonts |
| `brandPersona` | Object | Brand persona details |
| `brandPersona.industry` | String | Brand industry |
| `brandPersona.emotions` | Array | List of brand emotions |
| `brandPersona.audience` | Array | List of target audience |
| `brandPersona.designTags` | Array | List of design tags |
| `brandLogos` | Array | URLs to brand logo images |
| `brandImages` | Array | URLs to brand images |
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

- This API returns brand identities created in the authenticated workspace
- `brandLogos` and `brandImages` are direct URLs to the image files
- Results are paginated; use the returned `cursor` value in subsequent requests
- Archived brands are excluded from results by default
- If `isDefault` is set to `true` along with a `bId`, the `bId` will be overridden by the default brand's ID
