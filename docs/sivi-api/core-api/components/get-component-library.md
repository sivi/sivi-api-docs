---
id: get-component-library
title: Get Component Library
description: Retrieve component libraries available to a workspace
sidebar_position: 1
---

# Get Component Library

Retrieve a list of component libraries available to the authenticated workspace. Each library includes a set of component previews. Component libraries are collections of reusable design components (frames, shapes, icons, etc.) that can be used in design generation.

## Endpoint

```http
POST componentLibrary/get
```

## Authentication

Include your Enterprise API credentials in the request headers:

```http
sivi-api-key: YOUR_API_KEY
```

### Request Body Example

```json
{
  "clIds": ["cl_RY-kOJp4w__s"],
  "system": "SYSTEM"
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `clIds` | Array&lt;String&gt; | No | Filter by specific component library IDs |
| `system` | String | No | Filter by system type. Allowed values: `USER`, `SYSTEM` |
| `abstractUserId` | String | No | Unique identifier for the user (Enterprise/Super API only) |

## Response

### Success Response (200 OK)

```json
{
  "status": 200,
  "body": {
    "componentLibraries": [
      {
        "clId": "cl_RY-kOJp4w__s",
        "count": 665,
        "createdOn": 1774445138,
        "description": "Best for natural products, sustainable brands, farm-to-table businesses, and wellness-focused companies.",
        "name": "Organic",
        "status": "enabled",
        "tags": [],
        "system": "SYSTEM",
        "componentPreviews": [
          {
            "cmpId": "cmp_6fa3051ab330cd09b26f5d08d570e4a3",
            "name": "frame-6914",
            "subType": "person",
            "system": "SYSTEM",
            "description": "",
            "cmpType": "flexible",
            "semanticTypes": ["person"]
          }
        ]
      }
    ],
    "cursor": null
  }
}
```

### Response Body Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `clId` | String | Component library identifier |
| `count` | Number | Number of components in the library |
| `createdOn` | Number | Creation timestamp |
| `description` | String | Description of the library |
| `name` | String | Display name of the library |
| `status` | String | Library status (e.g. `enabled`) |
| `tags` | Array | Tags associated with the library |
| `system` | String | `USER` or `SYSTEM` |
| `componentPreviews` | Array | Preview components from the library |
| `componentPreviews[].cmpId` | String | Component identifier |
| `componentPreviews[].name` | String | Component name |
| `componentPreviews[].subType` | String | Component subtype (e.g. `person`, `product`) |
| `componentPreviews[].system` | String | `USER` or `SYSTEM` |
| `componentPreviews[].description` | String | Component description |
| `componentPreviews[].cmpType` | String | Component type (e.g. `flexible`) |
| `componentPreviews[].semanticTypes` | Array&lt;String&gt; | Semantic types of the component |
| `cursor` | String | Cursor for pagination |

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

- Results are scoped to the authenticated workspace; `wId` is derived from the session and cannot be set in the request body
- If `clIds` is omitted, all libraries accessible to the workspace are returned
- `componentPreviews` contains a sample of components from each library
- Use `component/get` to fetch the full list of components for a specific library
