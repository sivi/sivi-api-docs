---
id: update-webhook
title: update-webhook
description: Configure a webhook URL to receive design generation event notifications
sidebar_position: 10
---

# Update Webhook

This endpoint allows you to configure a webhook URL for your API key. Once set, all design generation events will be sent to this URL, eliminating the need to poll for request status.

## Endpoint

```
POST general/update-webhook
```

## Authentication

```http
sivi-api-key: YOUR_API_KEY
```

### Request Body Example

```json
{
  "webhookUrl": "https://your-domain.com/webhook"
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `webhookUrl` | String | Yes | A valid URL to receive webhook event notifications |

:::note
Only one webhook URL can be configured per API key. Setting a new URL will replace the previously configured one.
:::

## Response

### Success Response (200 OK)

```json
{
  "status": 200,
  "body": {
    "message": "Successfully updated the webhook URL"
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

## Webhook Event Payload

When a design generation request completes, fails, or changes status, Sivi will send a `POST` request to your configured webhook URL with the event payload.

The webhook event payload matches the response format of the [Get Request Status API](./get-request-status). Refer to that page for full details on all response fields and status types.

### Example Payload

```json
{
  "status": 200,
  "body": {
    "queueWaitTime": 0,
    "status": "complete",
    "requestId": "sbhMkIZKCPp",
    "designId": "97026520-1f1b-11f0-ada0-01392001fe46",
    "link": "https://instant.sivi.ai/#/design/97026520-1f1b-11f0-ada0-01392001fe46",
    "shareLink": "https://instant.sivi.ai/#/results/97026520-1f1b-11f0-ada0-01392001fe46",
    "result": {
      "variations": [
        {
          "variantImageUrl": "https://resources.hellosivi.com/user-data/e5ef6aa0-8d6c-11ec-bd33-8d2f1bec7c21/generated/sg0yMSZzNnU--97026520-1f1b-11f0-ada0-01392001fe46--sh0V7MlzOPm.jpg",
          "variantEditLink": "https://instant.sivi.ai/#/variant/sh0V7MlzOPm/independent-design-editor?type=edited",
          "variantId": "sh0V7MlzOPm",
          "variantWidth": 1080,
          "variantHeight": 1080,
          "variantType": "GENERATED"
        }
      ]
    }
  }
}
```

See the [Get Request Status API](./get-request-status#response) for the complete list of response fields and all possible status values (`pending`, `processing`, `complete`, `failed`).

## Usage Notes

- `webhookUrl` must be a valid, publicly accessible URL that can receive `POST` requests
- Only one webhook URL can be registered per API key; updating it will overwrite the previous value
- Every design generation event will be delivered to the configured webhook URL
- Using webhooks is preferred over polling the [Get Request Status API](./get-request-status) for improved performance and reduced API consumption
- Webhook delivery is **fire-and-forget** — Sivi does not retry failed webhook calls. Ensure your endpoint is reliable and responds promptly
