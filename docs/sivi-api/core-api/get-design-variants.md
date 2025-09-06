---
id: get-design-variants
title: get-design-variants
description: API for retrieving design variants from a Sivi design, idea, or workspace
sidebar_position: 5
---

# Get Design Variants

Retrieve design variants created from a specific design, idea, or workspace. This endpoint allows you to access both generated and edited variants of designs in your Sivi account.

## API Endpoint

```http
POST general/get-design-variants
```
```http
GET general/get-design-variants
```

## Authentication

This endpoint requires API key authentication. Include your API key in the request header:

```http
sivi-api-key: YOUR_API_KEY
```


## POST Request Body

```json
{
  "designId": "97026520-1f1b-11f0-ada0-01392001fe46",
  "workspaceId": "845df4t-rtfd-11f0-a4r4j5934k44432",
  "userId": "3eda4jjsdf-5ffd-42d4-23a0-013dflgk3fffq",
  "type": "all",
  "cursor": "eyJpZCI6InNoMFY3TWx6T1BtIn0=",
  "limit": 30
}
```

## GET Request Parameters

For GET requests, you can pass the same parameters as in the POST request using a JSON object in the `queryParams` parameter:

```http
GET general/get-design-variants?queryParams={"designId":"97026520-1f1b-11f0-ada0-01392001fe46","workspaceId":"845df4t-rtfd-11f0-a4r4j5934k44432","userId":"3eda4jjsdf-5ffd-42d4-23a0-013dflgk3fffq","type":"all","cursor":"eyJpZCI6InNoMFY3TWx6T1BtIn0=","limit":30}
```

The `queryParams` should be URL-encoded and contain a valid JSON object with all your request parameters.

## POST Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| designId | string | Conditional | Unique identifier for a specific design |

| userId | string | Conditional | Unique identifier for a user (Part of User Management API) |
| workspaceId | string | Conditional | Unique identifier for a workspace (Part of User Management API) |
| type | string | No | Type of variants to retrieve: "all", "generated", or "edited". Default is "all" |
| cursor | string | No | Cursor for paginated results. Use the `nextCursor` value from the previous response to get the next page |
| limit | number | No | Number of variants to return per page (1-100). Default is 100 |

### ID Priority
You must provide at least one of the ID fields. If multiple IDs are provided, first ID in the following order is considered:
1. designId
2. userId
3. workspaceId
:::

## Response

### Successful Response

```json
{
  "status": 200,
  "body": {
    "designId": "97026520-1f1b-11f0-ada0-01392001fe46",
    "variations": [
      {
        "variantImageUrl": "https://resources.hellosivi.com/user-data/e5ef6aa0-8d6c-11ec-bd33-8d2f1bec7c21/generated/sg0yMSZzNnU--97026520-1f1b-11f0-ada0-01392001fe46--sh0V7MlzOPm.jpg",
        "variantEditLink": "https://instant.sivi.ai/#/variant/sh0V7MlzOPm/independent-design-editor?type=edited",
        "variantId": "sh0V7MlzOPm",
        "variantWidth": 1080,
        "variantHeight": 1080,
        "variantType": "GENERATED"
      }
      // Additional variants...
    ],
    "cursor": "eyJpZCI6InNoMFY3TWx6T1BtMjIifQ=="
  }
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| designId | string | Id sent in request for retrieving variants |
| variations | array | Array of variant objects containing URLs and links |
| variations.variantImageUrl | string | Direct URL to the variant image |
| variations.variantEditLink | string | Link to edit the variant in the Sivi editor |
| variations.variantId | string | Unique identifier for the variant |
| variations.variantWidth | number | Width of the variant image |
| variations.variantHeight | number | Height of the variant image |
| variations.variantType | string | Type of the variant: "GENERATED" or "EDITED" |
| cursor | string | Cursor to use for retrieving the next page of results. If null, there are no more results |

### Authentication Error

```json
{
  "status": 401,
  "body": {
    "message": "Failed to authenticate request. Please add sivi-api-key header in request"
  }
}
```

### Invalid Input

```json
{
  "status": 422,
  "body": {
    "message": "Invalid input"
  }
}
```

### Server Error

```json
{
  "status": 500,
  "body": {
    "message": "Server internal error"
  }
}
```

## Usage Notes

- The API returns a maximum of 100 variants per request
- When `cursor` is present in the response, use it as the `cursor` parameter in your next request to get more results
- The `type` parameter allows filtering between AI-generated variants and user-edited variants
- Enterprise users can retrieve variants across all users in their workspace

## Examples

### GET Example

```bash
curl -X GET "https://connect.sivi.ai/api/prod/v2/general/get-design-variants?queryParams=%7B%22designId%22%3A%2297026520-1f1b-11f0-ada0-01392001fe46%22%2C%22ideaId%22%3A%227823832-1f1b-11f0-ada0-43421d423ed2f64%22%2C%22workspaceId%22%3A%22845df4t-rtfd-11f0-a4r4j5934k44432%22%2C%22userId%22%3A%223eda4jjsdf-5ffd-42d4-23a0-013dflgk3fffq%22%2C%22type%22%3A%22all%22%2C%22page%22%3A1%2C%22limit%22%3A30%7D" \
  -H "sivi-api-key: YOUR_API_KEY"
```

> Note: The `queryParams` value above is the URL-encoded version of the full JSON object matching the POST request body

### POST Example

```bash
curl -X POST "https://connect.sivi.ai/api/prod/v2/general/get-design-variants" \
  -H "sivi-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "designId": "97026520-1f1b-11f0-ada0-01392001fe46",
  "type": "all",
  "limit": 10
}'
```

### Get Generated Variants Only

```bash
curl -X POST "https://connect.sivi.ai/api/prod/v2/general/get-design-variants" \
  -H "sivi-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "workspaceId": "845df4t-rtfd-11f0-a4r4j5934k44432",
  "type": "generated",
  "cursor": "eyJpZCI6InNoMFY3TWx6T1BtIn0=",
  "limit": 50
}'
```
