---
id: get-fonts
title: get-fonts
description: Get list of available fonts
sidebar_position: 11
---

# Get Fonts

This endpoint allows you to retrieve a list of available fonts, with optional filtering by classification, name, and source.

## Endpoint

```
GET general/get-fonts
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

## Response

### Success Response (200 OK)

```json
{
  "status": 200,
  "body": {
    "fonts": [
      {
        "id": "f_abc123",
        "name": "Roboto",
        "classification": "sans-serif",
      }
    ],
    "cursor": "691443e27209a0eab5771a1b"
  }
}
```

### Error Responses

#### User Not Found (400 Bad Request)

```json
{
  "status": 400,
  "body": {
    "message": "Something went wrong"
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

- Use `classification` to filter fonts by type (e.g., `sans-serif` for clean modern fonts, `handwriting` for script-style fonts)
- The `source` parameter distinguishes between built-in system fonts and user-uploaded custom fonts
- Results are paginated; use the returned `cursor` value in subsequent requests to fetch more results
