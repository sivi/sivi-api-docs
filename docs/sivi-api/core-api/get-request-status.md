---
id: get-request-status
title: get-request-status
description: Check the status of a design generation request
sidebar_position: 3
---

# Get Request Status

Check the status of a design generation request and retrieve the generated design URLs. This endpoint enables you to poll for the status and response of a request.

## API Endpoint

```http
GET general/get-request-status
```

## Authentication

This endpoint requires API key authentication. Include your API key in the request header:

```http
sivi-api-key: YOUR_API_KEY
```
## GET Request Parameters

For GET requests, you can pass the request using a JSON object in the `queryParams` parameter:

```http
GET general/get-request-status?queryParams={"requestId":"sbhMkIZKCPp"}
```

The `queryParams` should be URL-encoded and contain a valid JSON object with all your request parameters.

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| requestId | string | Yes | The request ID received from the design generation request |

<!-- ## Webhook Support

If you want to avoid polling, you can use webhooks. If your API key is registered with a webhook URL, status updates will be sent to that URL when the request completes, fails, or reaches certain status points.

To configure a webhook, visit: [API Key Settings](https://instant.sivi.ai/#/settings) -->

## Example Request

### General API
```bash
curl -X GET "https://connect.sivi.ai/api/prod/v2/general/get-request-status?queryParams=%7B%22requestId%22%3A%22sbhMkIZKCPp%22%7D" \
  -H "sivi-api-key: YOUR_API_KEY"
```

## Response

### Pending Request

```json
{
  "status": 200,
  "body": {
    "queueWaitTime": 0,
    "status": "pending",
    "requestId": "sbhMkIZKCPp",
    "designId": "97026520-1f1b-11f0-ada0-01392001fe46",
    "link": "https://instant.sivi.ai/#/design/97026520-1f1b-11f0-ada0-01392001fe46",
    "shareLink": "https://instant.sivi.ai/#/results/97026520-1f1b-11f0-ada0-01392001fe46",
    "result": null
  }
}
```

### In-Progress Request

```json
{
  "status": 200,
  "body": {
    "queueWaitTime": 0,
    "status": "processing",
    "requestId": "sbhMkIZKCPp",
    "designId": "97026520-1f1b-11f0-ada0-01392001fe46",
    "link": "https://instant.sivi.ai/#/design/97026520-1f1b-11f0-ada0-01392001fe46",
    "shareLink": "https://instant.sivi.ai/#/results/97026520-1f1b-11f0-ada0-01392001fe46",
    "progress": 45,
    "result": null
  }
}
```

### Completed Request

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

### Failed Request

```json
{
  "status": 200,
  "body": {
    "queueWaitTime": 0,
    "status": "failed",
    "requestId": "sbhMkIZKCPp",
    "designId": "97026520-1f1b-11f0-ada0-01392001fe46",
    "link": "https://instant.sivi.ai/#/design/97026520-1f1b-11f0-ada0-01392001fe46",
    "shareLink": "https://instant.sivi.ai/#/results/97026520-1f1b-11f0-ada0-01392001fe46",
    "reason": "Image url invalid",
    "result": null
  }
}
```

## Response Fields

| Field | Type | Description |
|------|------------|--------|
| queueWaitTime | number | Wait time in queue before processing began (in milliseconds) |
| status | string | Job status: "pending", "processing", "complete", or "failed" |
| requestId | string | Unique identifier for the design generation request |
| designId | string | Unique identifier for the generated design |
| link | string | Link to view the design in the Sivi web application |
| shareLink | string | Shareable link to the design results |
| reason | string | Reason for failure (only present in failed responses) |
| result | object | Contains generated design URLs and variants (null for pending/failed jobs) |


## Best Practices

<!-- 1. **Polling Interval**: Use an exponential backoff strategy when polling for request status, webhooks is preferred over polling for improved performance and reduced API consumption. -->
1. **Error Handling**: If you receive a failed status, review the error message for details on why the request failed.
2. **Resource Cleanup**: Once you've successfully retrieved and processed a completed request, consider implementing cleanup logic in your application.

