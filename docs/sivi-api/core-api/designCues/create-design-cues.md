---
id: create-design-cues
title: Create Design Cues
description: Create a new design cue in a workspace
sidebar_position: 2
---

# Create Design Cues

Create a new design cue in the authenticated workspace. A design cue is a reusable instruction that can be attached to prompts or designs to guide generation.

## Endpoint

```http
POST designCues/create
```

## Authentication

Include your Enterprise API credentials in the request headers:

```http
sivi-api-key: YOUR_API_KEY
```

### Request Body Example

```json
{
  "instruction": "Use bold typography with high contrast",
  "type": "design",
  "bId": "b_s87vFxpfM0R"
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `instruction` | String | Yes | The design instruction text |
| `type` | String | No | Cue type (e.g. `design`, `prompt`). Defaults to `design` |
| `bId` | String | No | Brand ID to associate the cue with |
| `abstractUserId` | String | No | Unique identifier for the user (Enterprise/Super API only) |

## Response

### Success Response (200 OK)

```json
{
  "status": 200,
  "body": {
    "designCue": {
      "dcId": "abc123",
      "wId": "w_abc123",
      "bId": "b_s87vFxpfM0R",
      "uId": "usr1",
      "type": "design",
      "instruction": "Use bold typography with high contrast",
      "addedBy": "system",
      "source": "prompt",
      "createdOn": 1723300000,
      "updatedOn": 1723300000
    }
  }
}
```

### Response Body Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `dcId` | String | Design cue identifier |
| `wId` | String | Workspace ID the cue belongs to |
| `bId` | String | Brand ID the cue is associated with (or `null`) |
| `uId` | String | User ID of the creator (or `null`) |
| `type` | String | Cue type |
| `instruction` | String | The design instruction text |
| `addedBy` | String | Who added the cue |
| `source` | String | Source of the cue |
| `createdOn` | Number | Creation timestamp |
| `updatedOn` | Number | Last update timestamp |

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
    "message": "instruction is required"
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

- `wId` and `uId` are derived from the authenticated session and cannot be set in the request body
- `addedBy` defaults to `system` and `source` defaults to `prompt`
- A unique `dcId` is auto-generated for each new cue
