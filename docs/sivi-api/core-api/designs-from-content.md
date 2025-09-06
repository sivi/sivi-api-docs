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
POST general/designs-from-content
```
```http
GET general/designs-from-content
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
  "content": {
    "title": "T-shirts for summer",
    "offer": "Limited Time: Up to 20% Off",
    "bulletlist": ["100% cotton", "Easy wash", "Double stitch"]
  },
  "assets": {
    "images": [{
      "url": "https://images.hellosivi.com/fit-in/800x800/photos/sKN0gtrFJn4.jpg",
      "imagePreference": {
        "crop": true,
        "removeBg": false
      }
    }],
    "logos": [{
         "url": "https://images.hellosivi.com/fit-in/200x200/logos/sLkA1TkxN67.png",
         "logoStyles": ["direct", "outline"]
    }]
  },
  "language": "english",
  "colors": ["#5662EC", "#EF9AB2"],
  "fonts": [],
  "numOfVariants": 4,
  "outputFormat": ["jpg"]
}
```


## GET Request Parameters

For GET requests, you can pass the same parameters as in the POST request using a JSON object in the `queryParams` parameter:

```http
GET general/designs-from-content?queryParams={"name":"Summer campaign 2025","type":"displayAds","subtype":"displayAds-half-page-ad","dimension":{"width":300,"height":600},"content":{"title":"T-shirts for summer","offer":"Limited Time: Up to 20% Off","bulletlist":["100% cotton","Easy wash","Double stitch"]},"assets":{"images":[{"url":"https://images.hellosivi.com/fit-in/800x800/photos/sKN0gtrFJn4.jpg","imagePreference":{"crop":true,"removeBg":false}}],"logos":[{"url":"https://images.hellosivi.com/fit-in/200x200/logos/sLkA1TkxN67.png","logoStyles":["direct","outline"]}]},"language":"english","colors":["#5662EC","#EF9AB2"],"fonts":[],"numOfVariants":4,"outputFormat":["jpg"]}
```

The `queryParams` should be URL-encoded and contain a valid JSON object with all your request parameters.

## POST Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | string | Yes | Name of the design project |
| type | string | Yes | Primary design type (e.g., displayAds, socialMedia)  See [Supported Types & Subtypes](../common/design-types) for all available options. | 
| subtype | string | Yes | Specific format within the type (e.g., displayAds-half-page-ad) |
| dimension | object | Conditional | Width and height in pixels (required if type and subtype is "custom") |
| numOfVariants | number | Yes | Number of design variations to generate (1-4) |
| content | object | Yes | Textual content to include in the design See [Supported Content Block Types](../common/content-block-types) for all available options. | 
| assets | object | No | Images, logos, and other visual assets. See [Asset Types Reference](../common/asset-types) for supported asset types and options. |
| language | string | No | Language of content (default: "english"). See [Supported Languages](../common/supported-languages) for all available options. |
| colors | array | No | Preferred color hex code or rgba css string format |
| fonts | array | No | Font preferences (coming soon) |
| outputFormat | array | No | Output format for the generated designs. Currently only supports ["jpg"]. PNG support coming soon. |

| Coming soon |
|-------|
| Custom font support and API for custom upload. |
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

## Examples

### GET Example

```bash
curl -X GET "https://connect.sivi.ai/api/prod/v2/general/designs-from-content?queryParams=%7B%22name%22%3A%22Summer%20campaign%202025%22%2C%22type%22%3A%22displayAds%22%2C%22subtype%22%3A%22displayAds-half-page-ad%22%2C%22dimension%22%3A%7B%22width%22%3A300%2C%22height%22%3A600%7D%2C%22content%22%3A%7B%22title%22%3A%22T-shirts%20for%20summer%22%2C%22offer%22%3A%22Limited%20Time%3A%20Up%20to%2020%25%20Off%22%2C%22bulletList%22%3A%5B%22100%25%20cotton%22%2C%22Easy%20wash%22%2C%22Double%20stitch%22%5D%7D%2C%22assets%22%3A%7B%22images%22%3A%5B%7B%22url%22%3A%22https%3A%2F%2Fimages.hellosivi.com%2Ffit-in%2F800x800%2Fphotos%2FsKN0gtrFJn4.jpg%22%2C%22imagePreference%22%3A%7B%22crop%22%3Atrue%2C%22removeBg%22%3Afalse%7D%7D%5D%2C%22logos%22%3A%5B%7B%22url%22%3A%22https%3A%2F%2Fimages.hellosivi.com%2Ffit-in%2F200x200%2Flogos%2FsLkA1TkxN67.png%22%2C%22logoStyles%22%3A%5B%22direct%22%2C%22outline%22%5D%7D%5D%7D%2C%22language%22%3A%22english%22%2C%22colors%22%3A%5B%22%235662EC%22%2C%22%23EF9AB2%22%5D%2C%22fonts%22%3A%5B%5D%2C%22numOfVariants%22%3A4%2C%22outputFormat%22%3A%5B%22jpg%22%2C%22png%22%5D%7D" \
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
  "content": {
    "title": "Summer Sale",
    "offer": "Up to 40% Off",
    "bulletlist": ["Free shipping", "Limited time only", "All sizes available"]
  },
  "assets": {
    "images": [{
      "url": "https://images.hellosivi.com/fit-in/800x800/photos/sKN0gtrFJn4.jpg",
      "imagePreference": {
        "crop": true,
        "removeBg": false
      }
    }],
    "logos": [{
         "url": "https://images.hellosivi.com/fit-in/200x200/logos/sLkA1TkxN67.png",
         "logoStyles": ["direct", "outline"]
    }]
  },
  "language": "english",
  "colors": ["#5662EC", "#EF9AB2"],
  "numOfVariants": 4,
  "outputFormat": ["jpg"]
}'
```
