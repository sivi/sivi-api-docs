---
id: designs-from-prompt
title: designs-from-prompt
description: Generate designs using natural language prompts
sidebar_position: 1
---

# Designs from Prompt

Create designs using natural language prompts that describe your design needs.

## API Endpoint

```http
POST general/designs-from-prompt
```

```http
GET general/designs-from-prompt
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
  "outputFormat": ["jpg", "png"]
}
```

## GET Request Parameters

For GET requests, you can pass the same parameters as in the POST request using a JSON object in the `queryParams` parameter:

```http
GET general/designs-from-prompt?queryParams={"type":"displayAds","subtype":"displayAds-half-page-ad","dimension":{"width":300,"height":600},"prompt":"generate a design for my t-shirt shop for summer campaign with 20% off","assets":{"images":[{"url":"https://images.hellosivi.com/fit-in/800x800/photos/sKN0gtrFJn4.jpg","imagePreference":{"crop":true,"removeBg":false}}],"logos":[{"url":"https://images.hellosivi.com/fit-in/200x200/logos/sLkA1TkxN67.png","logoStyles":["direct","outline"]}]},"language":"english","colors":["#5662EC","#EF9AB2"],"fonts":[],"numOfVariants":4,"outputFormat":["jpg","png"]}
```

The `queryParams` should be URL-encoded and contain a valid JSON object with all your request parameters.

## POST Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| type | string | Yes | Primary design type (e.g., displayAds, socialMedia)  See [Supported Types & Subtypes](../common/design-types) for all available options. | 
| subtype | string | Yes | Specific format within the type (e.g., displayAds-half-page-ad) |
| dimension | object | Conditional | Width and height in pixels (required if type and subtype is "custom") |
| numOfVariants | number | Yes | Number of design variations to generate (1-4) |
| prompt | string | Yes | Natural language description of the design you want to create |
| assets | object | No | Images, logos, and other visual assets. See [Asset Types Reference](../common/asset-types) for supported asset types and options. |
| language | string | No | Language for text elements (default: "english"). See [Supported Languages](../common/supported-languages) for all available options. |
| colors | array | No | Preferred color hex codes |
| fonts | array | No | Font preferences (coming soon) |
| outputFormat | array | No | Output format for the generated designs. Currently only supports ["jpg"]. PNG support coming soon. |

## Response

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
curl -X GET "https://connect.sivi.ai/api/prod/v2/general/designs-from-prompt?queryParams=%7B%22type%22%3A%22displayAds%22%2C%22subtype%22%3A%22displayAds-half-page-ad%22%2C%22dimension%22%3A%7B%22width%22%3A300%2C%22height%22%3A600%7D%2C%22prompt%22%3A%22generate%20a%20design%20for%20my%20t-shirt%20shop%20for%20summer%20campaign%20with%2020%25%20off%22%2C%22assets%22%3A%7B%22images%22%3A%5B%7B%22url%22%3A%22https%3A%2F%2Fimages.hellosivi.com%2Ffit-in%2F800x800%2Fphotos%2FsKN0gtrFJn4.jpg%22%2C%22imagePreference%22%3A%7B%22crop%22%3Atrue%2C%22removeBg%22%3Afalse%7D%7D%5D%2C%22logos%22%3A%5B%7B%22url%22%3A%22https%3A%2F%2Fimages.hellosivi.com%2Ffit-in%2F200x200%2Flogos%2FsLkA1TkxN67.png%22%2C%22logoStyles%22%3A%5B%22direct%22%2C%22outline%22%5D%7D%5D%7D%2C%22language%22%3A%22english%22%2C%22colors%22%3A%5B%22%235662EC%22%2C%22%23EF9AB2%22%5D%2C%22fonts%22%3A%5B%5D%2C%22numOfVariants%22%3A4%2C%22outputFormat%22%3A%5B%22jpg%22%2C%22png%22%5D%7D" \
  -H "sivi-api-key: YOUR_PUBLIC_API_KEY"
```

> Note: The `queryParams` value above is the URL-encoded version of the full JSON object matching the POST request body

### POST Example

```bash
curl -X POST "https://connect.sivi.ai/api/prod/v2/general/designs-from-prompt" \
  -H "sivi-api-key: YOUR_PUBLIC_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "type": "displayAds",
  "subtype": "displayAds-half-page-ad",
  "dimension": { "width": 300, "height": 600 },
  "prompt": "generate a design for my t-shirt shop for summer campaign with 20% off",
  "language": "english",
  "colors": ["#5662EC", "#EF9AB2"],
  "numOfVariants": 2
}'
```