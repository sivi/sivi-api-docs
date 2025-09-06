---
id: login-user
title: login-user
description: Enterprise API for user login or creation
sidebar_position: 2
---

# Login User

Create a new user or login an existing user for your application. This endpoint enables you to manage users through your superuser account.

## API Endpoint

```http
POST super/login-user
```

## Authentication

This endpoint requires SuperUser API key authentication. Include both your API key and API key ID in the request headers:

```http
sivi-api-key: YOUR_SUPER_API_KEY
```

:::caution SuperUser Access Required
This endpoint can only be accessed using an SuperUser API key. Regular API keys do not have sufficient privileges.
:::

## Request Body

```json
{
  "abstractUserId": "281743-2322-34i44sd3-dkfjgdkjf292",
  "planId": "sp-01",
  "brand": {
    "brandName": "Sivi",
    "brandDescription": "AI design generator for brands and layered vector based design generation",
    "brandUrl": "https://sivi.ai",
    "brandLogo": "https://sivi.ai/sivi-logo.png",
    "brandColors": ["#5662EC", "#EF9AB2"],
    "brandFonts": [],
    "brandPersona": {
      "emotions": ["happy"],
      "industry": "games",
      "audience": ["working mom", "working dad"],
      "designTags": ["minimal", "time management", "productivity", "health"],
    }
  }
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| abstractUserId | string | Yes | Unique identifier for the user |
| planId | string | No | Plan identifier to assign to the user |
| brand | Object | No | Brand details |
| brand.brandName | string | Conditional | Brand name |
| brand.brandDescription | string | Conditional | Brand description |
| brand.brandUrl | string | No | Brand URL |
| brand.brandLogo | string | No | Brand logo URL |
| brand.brandColors | array | No | List of brand colors |
| brand.brandFonts | array | No | List of brand fonts |
| brand.brandPersona | object | No | Brand persona details |
| brand.brandPersona.emotions | array | No | List of brand emotions |
| brand.brandPersona.industry | string | No | Brand industry |
| brand.brandPersona.audience | array | No | List of brand target audience |
| brand.brandPersona.designTags | array | No | List of brand design tags |

Note:: See all available options for each parameter in the [Brand Persona Details](../common/brand-persona-details) section.


## Response

### Successful Login/Creation

```json
{
  "status": 200,
  "body": {
    "accessToken": "97026520-1f1b-11f0-ada0-01392001fe46",
    "refreshToken": "2342342-1f1b-11f0-ada0-01392001fe46",
    "workspaceId": "765634-2322-34i44sd3-dkfjgdkjf292"
  }
}
```

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

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| accessToken | string | JWT token for API authentication, valid for 1 hour |
| refreshToken | string | Token that can be used to obtain a new access token | SDK Widget takes care of refresh
| workspaceId | string | Unique identifier for the workspace |

## Usage Notes

- If the user already exists in Sivi's system, the API will log in the user and return access/refresh tokens
- If the user is new, the API will create a new user and corresponding workspace, assigning the specified plan
- The `abstractUserId` should be a unique identifier from your system that won't change for this user

## Example

```bash
curl -X POST "https://connect.sivi.ai/api/prod/v2/super/login-user" \
  -H "sivi-api-key: YOUR_SUPER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "abstractUserId": "user-12345",
  "planId": "sp-01"
}'
```
