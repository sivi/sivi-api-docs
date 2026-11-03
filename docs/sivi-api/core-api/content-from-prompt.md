---
id: content-from-prompt
title: content-from-prompt
description: Generate content suggestions using natural language prompts
sidebar_position: 4
---

# Content from Prompt

Generate content suggestions based on natural language prompts. This endpoint is useful for getting content and asset recommendations before generating designs.

## API Endpoint

```http
POST content-from-prompt
```

```http
GET content-from-prompt
```

## Authentication

This endpoint requires API key authentication. Include your API key in the request header:

```http
sivi-api-key: YOUR_API_KEY
```

## POST Request Body

```json
{
  "type": "displayAds",
  "subtype": "displayAds-half-page-ad",
  "dimension": { "width": 300, "height": 600 },
  "prompt": "generate a design for my t-shirt shop for summer campaign with 20% off",
  "language": "english"
}
```

## GET Request Parameters

For GET requests, you can pass the same parameters as in the POST request using a JSON object in the `queryParams` parameter:

```http
GET content-from-prompt?queryParams={"type":"displayAds","subtype":"displayAds-half-page-ad","dimension":{"width":300,"height":600},"prompt":"generate a design for my t-shirt shop for summer campaign with 20% off","language":"english"}
```

The `queryParams` should be URL-encoded and contain a valid JSON object with all your request parameters.

## POST Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| prompt | string | Yes | Natural language description of the content you need suggestions for | 
| type | string | No | Primary design type (e.g., displayAds, socialMedia). See [Supported Types & Subtypes](../common/design-types) for all available options. |
| subtype | string | Conditional | Specific format within the type (e.g., displayAds-half-page-ad). Provide `subtype` or `dimension`. |
| dimension | object | Conditional | Width and height in pixels. Required if `type` or `subtype` is "custom"; otherwise an alternative to `subtype`. |
| language | string | No | Language for generated content (default: "english"). See [Supported Languages](../common/supported-languages) for all available options. |

## Response

The request is processed asynchronously. The POST returns a `requestId`:

```json
{
  "status": 200,
  "body": {
    "queueWaitTime": 0,
    "requestId": "sbhMkIZKCPp"
  }
}
```

Poll [Get Request Status](./get-request-status) with the `requestId`. When the status is `completed`, the result contains the generated content:

```json
{
  "status": 200,
  "body": {
    "status": "completed",
    "requestId": "sbhMkIZKCPp",
    "result": {
      "documentJson": [
        { "type": "title", "value": "T-shirts for summer" },
        { "type": "offer", "value": "Limited Time: Up to 20% Off" },
        { "type": "bulletlist", "value": ["100% cotton", "Easy wash", "Double stitch"] }
      ]
    }
  }
}
```

> **Note:** `documentJson` is a single page of `{type, value}` content blocks. See [Content Block Types](../common/content-block-types) for the full list of block types.

### Error Responses

Invalid input is rejected immediately with a `422` (see [Designs from Prompt](./designs-from-prompt#error-responses) for the `errors` format). Requests containing NSFW content, attempts to extract system instructions, or content unrelated to design creation are screened while the request is processed: the request ends with `status: "failed"` and a `reason` in [Get Request Status](./get-request-status), and only the screening is charged.

## Examples

### GET Example

```bash
curl -X GET "https://connect.sivi.ai/api/prod/v2/general/content-from-prompt?queryParams=%7B%22type%22%3A%22displayAds%22%2C%22subtype%22%3A%22displayAds-half-page-ad%22%2C%22dimension%22%3A%7B%22width%22%3A300%2C%22height%22%3A600%7D%2C%22prompt%22%3A%22generate%20a%20design%20for%20my%20t-shirt%20shop%20for%20summer%20campaign%20with%2020%25%20off%22%2C%22language%22%3A%22english%22%7D" \
  -H "sivi-api-key: YOUR_PUBLIC_API_KEY"
```

> Note: The `queryParams` value above is the URL-encoded version of the full JSON object matching the POST request body

### POST Example

```bash
curl -X POST "https://connect.sivi.ai/api/prod/v2/general/content-from-prompt" \
  -H "sivi-api-key: YOUR_PUBLIC_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "type": "displayAds",
  "subtype": "displayAds-half-page-ad",
  "prompt": "generate a design for my t-shirt shop for summer campaign with 20% off",
  "language": "english"
}'
```

## Using with Design Generation

The content suggestions from this endpoint can be directly used with the [Designs from Content](./designs-from-content) endpoint to create designs based on the suggested content. The returned `documentJson` can be passed directly as the `documentJson` of the designs-from-content request. This two-step process allows for more control over the final design output by reviewing and potentially modifying the content before generating designs.
