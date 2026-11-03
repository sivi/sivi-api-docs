---
id: designs-from-content
title: designs-from-content
description: Generate designs using structured content
sidebar_position: 2
---

# Designs from Content

Generate designs directly from your structured content, including titles, descriptions, brand assets, and images.

## API Endpoint

```http
POST designs-from-content
```
```http
GET designs-from-content
```

## Authentication

This endpoint requires API key authentication. Include your API key in the request header:

```http
sivi-api-key: YOUR_API_KEY
```

## POST Request Body

```json
{
  "name": "Summer campaign 2025",
  "type": "displayAds",
  "subtype": "displayAds-half-page-ad",
  "dimension": { "width": 300, "height": 600 },
  "documentJson": [
    { "type": "title", "value": "T-shirts for summer" },
    { "type": "offer", "value": "Limited Time: Up to 20% Off" },
    { "type": "bulletlist", "value": ["100% cotton", "Easy wash", "Double stitch"] }
  ],
  "medias": [
    { "mId": "mediaId1", "type": "photo", "imagePreference": { "crop": true, "removeBg": false } },
    { "url": "https://images.hellosivi.com/fit-in/200x200/logos/sLkA1TkxN67.png", "type": "logo", "logoStyles": ["direct", "outline"] }
  ],
  "designInstructions": [
    "Create a professional email banner for a skincare sale. Use the provided inspiration for layout and color cues, but adapt the content to the skincare theme. Ensure a clean, high-quality look with a focus on the product and the promotional message."
  ],
  "language": "english",
  "numOfVariants": 4,
  "outputFormat": ["jpg"],
  "settings": {
    "mode": "brand",
    "currentbId": "b_s87vFxpfM0R",
    "colors": [],
    "fontGroups": [
      {
        "id": "cr9HpZiN7XA",
        "name": "FiraSans Condensed Black",
        "type": "heading",
        "status": "enabled",
        "addedBy": "system"
      },
      {
        "id": "crOvkYkeiiE",
        "name": "Raleway Bold",
        "type": "subHeading",
        "status": "enabled",
        "addedBy": "system"
      },
      {
        "id": "cJqSe7mFuRu",
        "name": "Raleway Light",
        "type": "body",
        "status": "enabled",
        "addedBy": "system"
      }
    ],
    "theme": [],
    "frameStyle": [],
    "backdropStyle": [],
    "focus": [],
    "imageStyle": [],
    "designModel": "auto"
  }
}
```


## GET Request Parameters

For GET requests, you can pass the same parameters as in the POST request using a JSON object in the `queryParams` parameter:

```http
GET designs-from-content?queryParams={"name":"Summer campaign 2025","type":"displayAds","subtype":"displayAds-half-page-ad","dimension":{"width":300,"height":600},"documentJson":[{"type":"title","value":"T-shirts for summer"},{"type":"offer","value":"Limited Time: Up to 20% Off"},{"type":"bulletlist","value":["100% cotton","Easy wash","Double stitch"]}],"medias":[{"mId":"mediaId1","type":"photo","imagePreference":{"crop":true,"removeBg":false}},{"url":"https://images.hellosivi.com/fit-in/200x200/logos/sLkA1TkxN67.png","type":"logo","logoStyles":["direct","outline"]}],"language":"english","numOfVariants":4}
```

The `queryParams` should be URL-encoded and contain a valid JSON object with all your request parameters.

## POST Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | string | Yes | Name of the design project |
| type | string | No | Primary design type (e.g., displayAds, socialMedia). See [Supported Types & Subtypes](../common/design-types) for all available options. |
| subtype | string | Conditional | Specific format within the type (e.g., displayAds-half-page-ad). Provide `subtype` or `dimension`. |
| dimension | object | Conditional | Width and height in pixels. Required if `type` or `subtype` is "custom"; otherwise an alternative to `subtype`. |
| numOfVariants | number | No | Number of design variations to generate (1-4, default 1) |
| documentJson | array | Yes | Ordered content blocks to include in the design, as an array of `{type, value}` items. See [Supported Content Block Types](../common/content-block-types) for all available options. |
| content | object | Deprecated | Textual content to include in the design (v1 structure). Deprecated in favor of `documentJson`; automatically converted to v2 internally. See [Supported Content Block Types](../common/content-block-types) for all available options. |
| medias | array | No | Unified media input combining Sivi library assets (`mId`) and URL-based assets. See [Medias](../common/asset-types#medias-unified-input). Medias are combined with `documentJson`; to control where a media appears, put it inside `documentJson` itself. No image generation, enhancement or extraction is performed by this endpoint. |
| language | string | No | Language of content (default: "english"). See [Supported Languages](../common/supported-languages) for all available options. |
| colors | array | No | Preferred color hex code or rgba css string format |
| fontGroups | array | No | Preferred fonts. See [Font API Reference](../core-api/get-fonts) and [FontGroup Reference](../common/settings#fontgroups) |
| outputFormat | array | No | Output formats for the generated designs: `jpg`, `png`. |
| designInstructions | array | No | Array of instruction strings passed to the Sivi agent to guide the design generation process |
| settings | object | No | Preferences for the design generation request. See [Settings Reference](../common/settings) for all available options. |

| Coming soon |
|-------|
| Content groups and sections. |
| Other image types like illustrations and vectors. |

## Response

This is a queue-based API. The initial response will contain a requestId that can be used to check the status and retrieve results using the [get-request-status](./get-request-status.md) API.

### Initial Response

| Field | Type | Description |
|-------|------|-------------|
| queueWaitTime | number | Wait time in queue before processing began (in milliseconds) |
| requestId | string | Unique identifier for the design generation request |
| designId | string | Unique identifier for the generated design |
| link | string | Link to view the design in the Sivi web application |
| shareLink | string | Shareable link to the design results |

### Success Response (200 OK)

```json
{
  "status": 200,
  "body": {
    "queueWaitTime": 0,
    "requestId": "sbhMkIZKCPp",
    "designId": "97026520-1f1b-11f0-ada0-01392001fe46",
    "link": "https://instant.sivi.ai/#/design/97026520-1f1b-11f0-ada0-01392001fe46",
    "shareLink": "https://instant.sivi.ai/#/results/97026520-1f1b-11f0-ada0-01392001fe46"
  }
}
```
requestId status can be queried or received as webhook updates [Coming Soon]. Refer [Get Request Status](./get-request-status) endpoint. 


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

#### Insufficient Credits (402 Payment Required)

```json
{
  "status": 402,
  "body": {
    "message": "Not enough credits to complete the transaction"
  }
}
```

#### Invalid Input (422 Unprocessable Entity)

Wrong types, missing required fields and invalid values are rejected before the request is queued. Fields Sivi does not use are ignored. `message` summarises the first problem and `errors` lists every problem with the path of the offending field.

```json
{
  "status": 422,
  "body": {
    "message": "settings.currentbId: \"currentbId\" is required when settings.mode is \"brand\"",
    "errors": [
      { "path": "settings.currentbId", "message": "\"currentbId\" is required when settings.mode is \"brand\"" },
      { "path": "subtype", "message": "Provide \"subtype\" or \"dimension\"" }
    ]
  }
}
```

#### Request Rejected During Screening (job status `failed`)

Every request is screened when it is processed, not when it is submitted. A request with NSFW content, an attempt to extract system instructions, or content unrelated to design creation is accepted with a `requestId` like any other request, and then fails. [Get Request Status](./get-request-status) returns `status: "failed"` with the `reason`. Only the screening itself is charged for a rejected request.

```json
{
  "status": 200,
  "body": {
    "status": "failed",
    "requestId": "sbhMkIZKCPp",
    "reason": "This request cannot be processed. Please provide a valid design request."
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

## Examples

### GET Example

```bash
curl -X GET "https://connect.sivi.ai/api/prod/v2/general/designs-from-content?queryParams%3D%7B%22name%22%3A%22Summer%20campaign%202025%22%2C%22type%22%3A%22displayAds%22%2C%22subtype%22%3A%22displayAds-half-page-ad%22%2C%22dimension%22%3A%7B%22width%22%3A300%2C%22height%22%3A600%7D%2C%22documentJson%22%3A%5B%7B%22type%22%3A%22title%22%2C%22value%22%3A%22T-shirts%20for%20summer%22%7D%2C%7B%22type%22%3A%22offer%22%2C%22value%22%3A%22Limited%20Time%3A%20Up%20to%2020%25%20Off%22%7D%2C%7B%22type%22%3A%22bulletlist%22%2C%22value%22%3A%5B%22100%25%20cotton%22%2C%22Easy%20wash%22%2C%22Double%20stitch%22%5D%7D%5D%2C%22medias%22%3A%5B%7B%22mId%22%3A%22mediaId1%22%2C%22type%22%3A%22photo%22%2C%22imagePreference%22%3A%7B%22crop%22%3Atrue%2C%22removeBg%22%3Afalse%7D%7D%2C%7B%22url%22%3A%22https%3A%2F%2Fimages.hellosivi.com%2Ffit-in%2F200x200%2Flogos%2FsLkA1TkxN67.png%22%2C%22type%22%3A%22logo%22%2C%22logoStyles%22%3A%5B%22direct%22%2C%22outline%22%5D%7D%5D%2C%22language%22%3A%22english%22%2C%22numOfVariants%22%3A4%7D" \
  -H "sivi-api-key: YOUR_PUBLIC_API_KEY"
```

> Note: The `queryParams` value above is the URL-encoded version of the full JSON object matching the POST request body

### POST Example

```bash
curl -X POST "https://connect.sivi.ai/api/prod/v2/general/designs-from-content" \
  -H "sivi-api-key: YOUR_PUBLIC_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "summer campaign 2025",
  "type": "displayAds",
  "subtype": "displayAds-half-page-ad",
  "dimension": { "width": 300, "height": 600 },
  "documentJson": [
    { "type": "title", "value": "Summer Sale" },
    { "type": "offer", "value": "Up to 40% Off" },
    { "type": "bulletlist", "value": ["Free shipping", "Limited time only", "All sizes available"] }
  ],
  "medias": [
    { "mId": "mediaId1", "type": "photo", "imagePreference": { "crop": true, "removeBg": false } },
    { "url": "https://images.hellosivi.com/fit-in/200x200/logos/sLkA1TkxN67.png", "type": "logo", "logoStyles": ["direct", "outline"] }
  ],
  "designInstructions": [
    "Create a professional email banner for a skincare sale. Use the provided inspiration for layout and color cues, but adapt the content to the skincare theme. Ensure a clean, high-quality look with a focus on the product and the promotional message."
  ],
  "language": "english",
  "numOfVariants": 4
}'
```
