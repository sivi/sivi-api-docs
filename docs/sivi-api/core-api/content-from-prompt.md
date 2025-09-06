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
POST general/content-from-prompt
```

```http
GET general/content-from-prompt
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
GET general/content-from-prompt?queryParams={"type":"displayAds","subtype":"displayAds-half-page-ad","dimension":{"width":300,"height":600},"prompt":"generate a design for my t-shirt shop for summer campaign with 20% off","language":"english"}
```

The `queryParams` should be URL-encoded and contain a valid JSON object with all your request parameters.

## POST Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| prompt | string | Yes | Natural language description of the content you need suggestions for | 
| type | string | Yes | Primary design type (e.g., displayAds, socialMedia). See [Supported Types & Subtypes](../common/design-types) for all available options. | 
| subtype | string | Yes | Specific format within the type (e.g., displayAds-half-page-ad) |
| dimension | object | Conditional | Width and height in pixels (required if type and subtype is "custom") |
| language | string | No | Language for generated content (default: "english"). See [Supported Languages](../common/supported-languages) for all available options. |

## Response

```json
{
  "contentSuggestions": [{
    "title": "T-shirts for summer",
    "offer": "Limited Time: Up to 20% Off",
    "bulletlist": ["100% cotton", "Easy wash", "Double stitch"]
  }],
  "assetSuggestions": {
    "images": [{
      "url": "https://images.hellosivi.com/fit-in/800x800/photos/sKN0gtrFJn4.jpg"
    }]
  }
}
```

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

The content suggestions from this endpoint can be directly used with the [Designs from Content](./designs-from-content) endpoint to create designs based on the suggested content. This two-step process allows for more control over the final design output by reviewing and potentially modifying the content before generating designs.
