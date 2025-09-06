---
id: export-data
title: export-data
description: Export design and media data for users
sidebar_position: 7
---

# Export Data API

This endpoint allows Enterprise administrators to export design variations, media, and content for specific users within a specified date range.

## Endpoint

```
POST enterprise/export-data
```

## Authentication

Include your Enterprise API credentials in the request headers:

```http
sivi-api-key: YOUR_ENTERPRISE_API_KEY
```

:::caution Enterprise Admin Access Required
This endpoint can only be accessed using an Enterprise Admin API key. Regular API keys do not have sufficient privileges.
:::

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `abstractUserId` | String | Yes | Unique identifier for the user |
| `startDate` | Number | Yes | Start timestamp for the data export period (Unix timestamp) |
| `endDate` | Number | Yes | End timestamp for the data export period (Unix timestamp) |

### Request Body Example

```json
{
  "abstractUserId":"281743-2322-34i44sd3-dkfjgdkjf292",
  "startDate": 17236322383,
  "endDate": 17236342383
}
```

## Response

### Success Response (200 OK)

```json
{
  "status": 200,
  "body": {
     "variants": [
      {
        "variantImageUrl": "https://resources.hellosivi.com/user-data/e5ef6aa0-8d6c-11ec-bd33-8d2f1bec7c21/generated/sg0yMSZzNnU--97026520-1f1b-11f0-ada0-01392001fe46--sh0V7MlzOPm.jpg",
        "variantEditLink": "https://instant.sivi.ai/#/variant/sh0V7MlzOPm/independent-design-editor?type=edited",
        "variantId": "sh0V7MlzOPm",
        "variantWidth": 1080,
        "variantHeight": 1080,
      }
     ],
     "media": [
      {
        "url": "https://resources.hellosivi.com/user-data/e5ef6aa0-8d6c-11ec-bd33-8d2f1bec7c21/generated/media-1.jpg",
        "type": "photo"
      }
     ],
     "content": [
      {
        "title": "heading",
        "subtitle": "subtitle for this snippet",
        "bulletlist": ["1", "2"]
      }
     ],
     "next": 0
  }
}
```

### Response Body Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `variants` | Array | List of design variants created within the date range |
| `media` | Array | List of media assets uploaded/used within the date range |
| `content` | Array | List of content snippets created within the date range |
| `next` | Integer | Indicates if more data is available (0 = no more data, 1 = more data available) |

#### Variant Object

| Parameter | Type | Description |
|-----------|------|-------------|
| `variantImageUrl` | String | URL to the generated design image |
| `variantEditLink` | String | Link to edit the design in Sivi's editor |
| `variantId` | String | Unique identifier for the variant |
| `variantWidth` | Number | Width of the variant image |
| `variantHeight` | Number | Height of the variant image |
| `variantType` | String | Type of the variant: "GENERATED" or "EDITED" |

#### Media Object

| Parameter | Type | Description |
|-----------|------|-------------|
| `url` | String | URL to the media asset |
| `type` | String | Type of media (e.g., "photo", "illustration") |

#### Content Object

| Parameter | Type | Description |
|-----------|------|-------------|
| `title` | String | Content title or heading |
| `subtitle` | String | Content subtitle |
| `bulletlist` | Array | Array of bullet points |

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

- The API has the following limits:
  - Variants: Max 300 records
  - Media: Max 300 records
  - Content: Max 100 records
- Suggested date range is 15-30 days for optimal performance
- Maximum supported date range is 90 days
- Historical data up to 1 year is available
- If you reach the limits, reduce the date range or paginate through results
- This API is restricted to Enterprise plan customers with administrative access
