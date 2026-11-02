---
id: extract-webpage
title: extract-webpage
description: Extract content, colors and fonts from up to 3 webpages
sidebar_position: 5
---

# Extract Webpage

Extract the content, colors and fonts of up to 3 public webpages. The content is returned as markdown, which you can use as the `prompt` for [designs-from-prompt](./designs-from-prompt) or as source material for [content-from-prompt](./content-from-prompt). The colors and font groups can be passed as `settings.colors` and `settings.fontGroups`.

## API Endpoint

```http
POST extract-webpage
```

## Authentication

```http
sivi-api-key: YOUR_API_KEY
```

## POST Request Body

```json
{
  "webpages": ["https://sivi.ai"]
}
```

## POST Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| webpages | array | Yes | 1 to 3 public `http(s)` page URLs |

## Credits

Credits are charged per webpage that is extracted successfully. A page that cannot be extracted is reported with an error and is not charged.

## Response

The request is processed asynchronously. The POST returns a `requestId`:

```json
{
  "status": 200,
  "body": {
    "requestId": "sbhMkIZKCPp"
  }
}
```

Poll [Get Request Status](./get-request-status) with the `requestId`. When the status is `completed`, the result contains one entry per requested page:

```json
{
  "status": 200,
  "body": {
    "status": "completed",
    "requestId": "sbhMkIZKCPp",
    "result": {
      "documents": [
        {
          "webpage": "https://sivi.ai",
          "status": "success",
          "content": "# Sivi\n\nSomething about Sivi...",
          "fontGroups": [
            { "id": "fs_ansan", "name": "roboto bold", "type": "heading" },
            { "id": "fs_ansajw", "name": "roboto semi bold", "type": "subHeading" },
            { "id": "fs_ansjwa", "name": "roboto regular", "type": "body" }
          ],
          "colors": ["#f2f2f2"]
        },
        {
          "webpage": "https://example.invalid",
          "status": "failed",
          "error": "Failed to extract the webpage"
        }
      ]
    }
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| webpage | string | The requested URL |
| status | string | `success` or `failed` |
| content | string | Page content as markdown (success only) |
| fontGroups | array | Fonts found on the page (success only) |
| colors | array | Brand colors as hex codes (success only) |
| error | string | Reason the page could not be extracted (failed only) |

### Error Responses

Errors use the same format as the other endpoints (`401`, `402`, `422`, `500`). More than 3 URLs, a non-URL value or an unknown field returns a `422` with an `errors` list; see [Designs from Prompt](./designs-from-prompt#error-responses).

## Example

```bash
curl -X POST "https://connect.sivi.ai/api/prod/v2/general/extract-webpage" \
  -H "sivi-api-key: YOUR_PUBLIC_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "webpages": ["https://sivi.ai"] }'
```
