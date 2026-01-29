---
id: quota-and-limits
title: Quota & Limits
description: API rate limits, quotas, and usage restrictions
sidebar_position: 10
---

# Quota & Limits

This page provides information about API rate limits, quotas, and usage restrictions for Sivi API.

## Rate Limits

Rate limits help ensure fair usage and maintain API stability for all users.

| Plan | Requests/Minute |
|------|-----------------|
| General | 50 |
| Super | 100 |
| Enterprise | Custom |

> **Note:** Higher rate limits are available upon request. Contact support for custom requirements.

## Queue & Concurrency

| Plan | Concurrency | Queue | Queue Type |
|------|-------------|-------|------------|
| General | 4 | 10 | Premium |
| Super | 10 | 15 | Premium |
| Super (End-User) | 2 | 6 | Premium |
| Enterprise | Custom | Custom | Premium |

> **Note:** Higher queue and concurrency limits are available upon request.  Contact support for custom requirements. Concurrency limits are set based on concurrent GPU usage. After concurrency request will go into queue limit

## User Limits

| Plan | Included Users | Additional User Cost |
|------|----------------|----------------------|
| Super | 100 | $2/user/billing cycle |
| Enterprise | Custom | Custom |

> **Note:** Super plan billing = Plan amount + (100 included users × $2/user). Additional users beyond the included limit will be charged at $2 per user per billing cycle.

## User Credit Limits

SuperUsers / Enterprise Users can set credit limits for their end-users using the [Set Credit Limit](../user-management-api/set-user-credit-limit) API.

- **Default**: `-1` (no limit)
- **Custom**: Any positive integer value

> **Note:** End-user's usage credits are debited from the master (super / enterprise) user's credits. Once the master user's credits are exhausted, all end-users will not be able to generate designs or content until the next billing cycle.

## Error Responses

When limits are exceeded, the API returns appropriate error responses:

### Rate Limit Exceeded

```json
{
  "status": 429,
  "body": {
    "message": "Rate limit exceeded. Please try again later."
  }
}
```

### Insufficient Credits

```json
{
  "status": 429,
  "body": {
    "message": "Insufficient credit limit"
  }
}
```

## Best Practices

- **Implement retry logic**: Use exponential backoff when receiving 429 errors
- **Monitor usage**: Track your API usage to avoid hitting limits
- **Batch requests**: Where possible, batch operations to reduce API calls
- **Cache responses**: Cache design outputs to minimize redundant requests

## Upgrading Limits

For higher rate limits and quotas, consider upgrading to the Super or Enterprise Plan. Contact [support@sivi.ai](mailto:support@sivi.ai) for custom limit requirements.
