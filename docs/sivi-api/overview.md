---
id: overview
title: Overview
sidebar_position: 1
---

# Overview: Sivi API

Welcome to the Sivi API documentation. Sivi is an AI designer that helps you generate product banners, ads, and other visual content according to your brand guidelines.

## Base URLs

The API is available in both staging and production environments:

- **Staging**: `https://connect.sivi.ai/api/staging/v2`
- **Production**: `https://connect.sivi.ai/api/prod/v2`

## Authentication

The API supports two authentication methods:

### 1. API Key Authentication

Include your API key in the request header:

```http
sivi-api-key: your-api-key-here
```

### 2. OAuth2 Client Credentials

Enterprise Plan.

<!-- ### 2. OAuth2 Client Credentials

For applications requiring OAuth2 authentication:

1. Obtain client credentials from Sivi
2. Request an access token
3. Include the token in your requests

```http
Authorization: Bearer your-access-token
``` -->

## Response Format

All responses are returned in JSON format with the following structure:

```json
{
  "status": 200,
  "body": {
    // Response data
  }
}
```

### Common Status Codes

| Code | Description                                                |
|------|------------------------------------------------------------|
| 200  | Successful operation                                        |
| 401  | Authentication failed                                       |
| 422  | Invalid input                                              |
| 500  | Server internal error                                       |

## Core API
Core API is available for users with Power plan. API Sandbox available for testing. Please refer the Sivi [pricing plan](https://sivi.ai/pricing)

[Core API](./core-api/core-overview) for more details.


## User Management API
User Management API is available for users with Superpower plan. Please refer the Sivi [pricing plan](https://sivi.ai/pricing)

[User Management API](./user-management-api/user-overview) for more details.


## Terms of Service

By using the Sivi API, you agree to the [Terms of Service](https://sivi.ai/terms-of-service).

## Support

For support inquiries, contact: [support@sivi.ai](mailto:support@sivi.ai)