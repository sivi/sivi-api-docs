---
id: get-brands
title: get-brands
description: Get List of brands of a workspace
sidebar_position: 10
---

# Get Brands

This endpoint allows to get the list of brands for a workspace or user.

## Endpoint

```
GET general/get-brands
```

## Authentication

Include your Enterprise API credentials in the request headers:

```http
sivi-api-key: YOUR_SUPER_API_KEY
```


### Request Body Example

```json
{
  "limit": 10,
  "cursor": null,
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `limit` | Number | Yes | No of items to be returned |
| `cursor` | String | No | Cursor for pagination |

## Response

### Success Response (200 OK)

```json
{
  "status": 200,
  "body": {
        "brands": [
            {
                "bId": "b_s87vFxpfM0R",
                "brandName": "Sivi",
                "brandDescription": "AI design generator for brands and layered vector based design generation",
                "brandUrl": "https://sivi.ai",
                "brandColors": [
                    "#5662EC",
                    "#EF9AB2"
                ],
                "brandPersona": {
                    "industry": "technology",
                    "emotions": [
                        "excited",
                    ],
                    "audience": [
                        "tech enthusiasts",
                    ],
                    "designTags": [
                        "innovative solutions",
                    ]
                },
                "brandLogos": [
                    "https://sivi.ai/sivi-logo.png"
                ],
                "brandImages": [
                    "https://images.hellosivi.com/fit-in/800x800/photos/sKN0gtrFJn4.jpg"
                ]
            }
        ],
        "cursor": "691443e27209a0eab5771a1b"
    }
}
```

### Error Responses

#### User Not Found (400 Bad Request)

```json
{
  "status": 400,
  "body": {
    "message": "User does not exist"
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

## Usage Notes

- This API gets brand identity created in the specified user's workspace
- brandLogos and brandImages will be direct URL to the image files.
