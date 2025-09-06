---
id: update-user-plan
title: update-user-plan
description: Enterprise API for updating a user's subscription plan
sidebar_position: 3
---

# Update User Plan

Update the subscription plan for an existing user within your application. This endpoint allows superusers to manage user access levels and subscription tiers.

## API Endpoint

```http
POST super/update-user-plan
```

## Authentication

This endpoint requires SuperUser API key authentication. Include your API key in the request headers:

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
  "planId": "sp-01"
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| abstractUserId | string | Yes | Unique identifier for the existing user |
| planId | string | Yes | New plan identifier to assign to the user |

## Response

### Successful Update

```json
{
  "status": 200,
  "body": {
    "message": "Successfully updated the user plan",
    "nextBillingDate": 179842232232,
    "type": "upgrade"
  }
}
```

### User Not Found

```json
{
  "status": 400,
  "body": {
    "message": "User does not exists"
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

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| message | string | Status message confirming the plan update |
| availableCredits | string | Number of design credits available in the new plan |
| nextBillingDate | number | Unix timestamp for the next billing cycle |
| type | string | Type of plan update: "upgrade" or "downgrade" |

## Usage Notes

- This API only works with existing users. If you need to create a new user, use the [Login User](./login-user) API first
- The operation will fail if the user doesn't exist in Sivi's system
- Plan changes take effect immediately for upgrade and end of the billing date for the downgrade
- Plans will be pre-configured during the superuser onboarding

## Example

```bash
curl -X POST "https://connect.sivi.ai/api/prod/v2/super/update-user-plan" \
  -H "sivi-api-key: YOUR_SUPER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "abstractUserId": "user-12345",
  "planId": "ent-premium-01"
}'
```


## Related APIs

- [Login User](./login-user) - Create a new user or login an existing user
