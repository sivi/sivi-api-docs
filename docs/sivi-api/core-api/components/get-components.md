---
id: get-components
title: Get Components
description: Retrieve components from a specific component library
sidebar_position: 2
---

# Get Components

Retrieve a paginated list of components belonging to a specific component library. Supports filtering by component attributes (vector types, shapes, complexity, etc.) and pagination.

## Endpoint

```http
POST component/get
```

## Authentication

Include your Enterprise API credentials in the request headers:

```http
sivi-api-key: YOUR_API_KEY
```

### Request Body Example

```json
{
  "clId": "cl_RY-kOJp4w__s",
  "filter": {
    "subTypes": ["person", "product"],
    "searchText": "frame"
  },
  "limit": 10,
  "sort": "DESC"
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `clId` | String | Yes | Component library ID |
| `filter` | Object | No | Component-level filters (see below) |
| `filter.vectorTypes` | Object | No | Filter by vector types. Supports `{ op, value }` where `op` is `EXACT`, `AND`, or `OR` |
| `filter.shapesUsed` | Array&lt;String&gt; | No | Filter by shapes used |
| `filter.complexity` | Array&lt;String&gt; | No | Filter by complexity levels |
| `filter.cornerRadius` | Array&lt;String&gt; | No | Filter by corner radius styles |
| `filter.subTypes` | Array&lt;String&gt; | No | Filter by component subtypes (e.g. `person`, `product`) |
| `filter.prevTypes` | Array&lt;String&gt; | No | Filter by preview types |
| `filter.semantics` | Array&lt;String&gt; | No | Filter by semantic types |
| `filter.imageCount` | Array&lt;Number&gt; | No | Filter by image count |
| `filter.searchText` | String | No | Search by component name |
| `cursor` | String | No | Cursor for pagination |
| `limit` | Number | No | Number of components to return (1-100, default: 10) |
| `sort` | String | No | Sort order. Allowed values: `ASC`, `DESC` |
| `abstractUserId` | String | No | Unique identifier for the user (Enterprise/Super API only) |

### `filter.vectorTypes` Object

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `op` | String | No | Operator for the filter. Allowed values: `EXACT` (match all), `AND` (match all), `OR` (match any). Defaults to `OR` |
| `value` | Array&lt;String&gt; | Yes | Vector type values to filter by |

## Response

### Success Response (200 OK)

```json
{
  "status": 200,
  "body": {
    "components": [
      {
        "cmpId": "cmp_6fa3051ab330cd09b26f5d08d570e4a3",
        "name": "frame-6914",
        "subType": "person",
        "system": "SYSTEM",
        "description": "",
        "cmpType": "flexible",
        "semanticTypes": ["person"]
      }
    ],
    "cursor": "eyJjbXBJZCI6ImNtcF9hYmMxMjMifQ",
    "total": 665
  }
}
```

### Response Body Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `cmpId` | String | Component identifier |
| `name` | String | Component name |
| `subType` | String | Component subtype (e.g. `person`, `product`) |
| `system` | String | `USER` or `SYSTEM` |
| `description` | String | Component description |
| `cmpType` | String | Component type (e.g. `flexible`) |
| `semanticTypes` | Array&lt;String&gt; | Semantic types of the component |
| `cursor` | String | Cursor for fetching the next page of results |
| `total` | Number | Total number of components matching the filters |

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
    "message": "clId is required"
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

- `clId` is required to identify the component library
- Only `enabled` status components are returned
- Results are paginated; use the returned `cursor` value in subsequent requests
- The `total` field indicates the total number of components matching the applied filters
- Use `componentLibrary/get` to discover available component libraries and their `clId` values
