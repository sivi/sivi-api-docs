---
id: update-design-cues
title: Update Design Cues
description: Update the instruction of an existing design cue
sidebar_position: 3
---

# Update Design Cues

Update the instruction text of an existing design cue in the authenticated workspace.

## Endpoint

```http
POST designCues/update
```

## Authentication

Include your Enterprise API credentials in the request headers:

```http
sivi-api-key: YOUR_API_KEY
```

### Request Body Example

```json
{
  "dcId": "abc123",
  "instruction": "Use bold typography with even higher contrast"
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dcId` | String | Yes | Design cue ID to update |
| `instruction` | String | Yes | Updated design instruction text |
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
      "instruction": "Use bold typography with even higher contrast",
      "addedBy": "system",
      "source": "prompt",
      "createdOn": 1723300000,
      "updatedOn": 1723300200
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
| `instruction` | String | The updated design instruction text |
| `addedBy` | String | Who added the cue |
| `source` | String | Source of the cue |
| `createdOn` | Number | Creation timestamp |
| `updatedOn` | Number | Last update timestamp |

### Error Responses

#### Design Cue Not Found (422 Unprocessable Entity)

```json
{
  "status": 422,
  "body": {
    "message": "Design cue not found: abc123"
  }
}
```

#### Unauthorized (401 Unauthorized)

```json
{
  "status": 401,
  "body": {
    "message": "Design cue does not belong to this workspace: abc123"
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
    "message": "dcId is required"
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

- The design cue must belong to the authenticated workspace
- Only the `instruction` field can be updated; `wId`, `uId`, and `createdOn` are immutable
- `updatedOn` is refreshed automatically on every update
