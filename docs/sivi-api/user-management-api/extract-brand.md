---
id: extract-brand
title: extract-brand
description: Extract brand information from a website URL
sidebar_position: 8
---

# Extract Brand

This endpoint allows Enterprise administrators to automatically extract brand assets, colors, and other brand identity elements from a website URL for a specific user. This is a queue-based API - it returns a requestId that can be used to check the status and retrieve results using the [get-request-status](../core-api/get-request-status.md) API.

## Endpoint

```
POST super/extract-brand
```

## Authentication

Include your Enterprise API credentials in the request headers:

```http
sivi-api-key: YOUR_SUPER_API_KEY
```

:::caution SuperUser Access Required
This endpoint can only be accessed using an SuperUser API key. Regular API keys do not have sufficient privileges.
:::

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `abstractUserId` | String | Yes | Unique identifier for the user |
| `brandUrl` | String | Yes | URL of the website to extract brand information from |

### Request Body Example

```json
{
  "abstractUserId": "281743-2322-34i44sd3-dkfjgdkjf292",
  "brandUrl": "https://sivi.ai"
}
```

## Response

The API returns a requestId that can be used to check the status and retrieve results:

```json
{
  "status": 200,
  "body": {
    "requestId": "sbhMkIZKCPp",
  }
}
```

### Checking Request Status

Use the [get-request-status](../core-api/get-request-status.md) API with the requestId to check the status and get the results:

```http
GET super/get-request-status?queryParams={"requestId":"sbhMkIZKCPp"}
```
```

### Final Response Format

Once the request is complete, the get-request-status API will return the following format:

```json
{
  "status": 200,
  "body": {
    "status": "completed",
    "requestId": "sbhMkIZKCPp",
    "result": {
      "brandDetails": {
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
    }
  }
}
```

### Response Body Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `brandName` | String | Extracted name of the brand |
| `brandDescription` | String | Extracted description or tagline |
| `brandUrl` | String | Original URL provided in the request |
| `brandLogo` | String | URL to the extracted logo image |
| `brandColors` | Array | List of extracted brand colors in hex format |
| `brandFonts` | Array | List of detected fonts (may be empty if fonts cannot be determined) |
| `brandPersona` | Object | Brand persona details |
| `brandPersona.emotions` | Array | List of detected emotions |
| `brandPersona.industry` | String | Detected industry |
| `brandPersona.audience` | Array | List of detected target audience |
| `brandPersona.designTags` | Array | List of detected design tags |

Note:: See all available options for each parameter in the [Brand Persona Details](../common/brand-persona-details) section.


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

- This API analyzes a website to extract brand elements automatically
- The extracted brand information can be used to set the brand identity for a user or workspace
- The extraction process uses AI to identify logos, colors, and other brand elements
- Extraction quality depends on the website's structure and accessibility
- For best results, provide the homepage or brand guidelines page of the website
- This API is restricted to Enterprise plan customers with administrative access
- After extracting brand information, consider using the [Set Brand API](./set-brand) to apply or modify the extracted brand settings
