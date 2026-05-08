---
id: get-fonts
title: Get Fonts
description: Get list of available fonts
sidebar_position: 1
---

# Get Fonts

Retrieve a list of available fonts, with optional filtering by classification, name, and source.

## Endpoint

```http
POST font/get
```

## Authentication

Include your Enterprise API credentials in the request headers:

```http
sivi-api-key: YOUR_API_KEY
```

### Request Body Example

```json
{
  "classification": ["sans-serif", "serif"],
  "name": "Roboto",
  "source": "system",
  "limit": 20,
  "cursor": null
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `classification` | Array | No | Filter by font classification. Allowed values: `serif`, `sans-serif`, `display`, `handwriting`, `monospace` |
| `name` | String | No | Filter fonts by name (partial match) |
| `source` | String | No | Filter by font source. Allowed values: `system`, `user` |
| `limit` | Number | No | Number of items to return (1-100) |
| `cursor` | String | No | Cursor for pagination |
| `abstractUserId` | String | No | Unique identifier for the user (Enterprise/Super API only) |

## Response

### Success Response (200 OK)

```json
{
  "status": 200,
  "body": {
    "data": [
      {
        "id": "f_abc123",
        "name": "Roboto",
        "classification": "sans-serif"
      }
    ],
    "meta": {
      "cursor": "691443e27209a0eab5771a1b"
    }
  }
}
```

### Response Body Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `data` | Array | List of font objects |
| `data[].id` | String | Font identifier |
| `data[].name` | String | Font name |
| `data[].classification` | String | Font classification |
| `meta.cursor` | String | Cursor for fetching the next page of results |

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
    "message": "Failed to fetch fonts."
  }
}
```

## Usage Notes

- Use `classification` to filter fonts by type (e.g., `sans-serif` for clean modern fonts, `handwriting` for script-style fonts)
- The `source` parameter distinguishes between built-in system fonts and user-uploaded custom fonts
- `source: "system"` returns Google Fonts available in Sivi (free, enabled fonts)
- `source: "user"` returns fonts uploaded by the authenticated user
- Results are paginated; use the returned `cursor` value in subsequent requests to fetch more results
