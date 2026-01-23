---
id: user-overview
title: Overview
description: User Management API features and documentation
sidebar_position: 1
---

# Sivi User Management API

> **Note:** User Management API is available for users with Superpower plan. Please refer the Sivi [pricing plan](https://sivi.ai/pricing). 

The Sivi User Management API provides powerful user management capabilities for businesses. It offers a cost-effective way to integrate your end-user accounts with your workflows. This helps you abstract user details from Sivi.

## User Management API Features

- **User Management**: Create, update, and manage users
- **RESTful API**: Simple, standards-compliant API design
- **JSON Responses**: Clean, structured response data
- **Transparent Pricing**: Pay only for what you use
- **Developer Resources**: SDKs, code samples, and comprehensive documentation
- **Community Support**: Access to community resources and help

## API Documentation

The User Management API provides access to all low-level Sivi user management capabilities.

> **Note:** End-user's usage credits will be debited from the master user's credits. Once the master user's credits is exhausted, all the end-users will not be able to generate designs or content until the next billing cycle. API's will start throwing error with 429 status code.

### User Endpoints

- **[Login User](./login-user)**: Login user to Sivi
- **[Set Credit Limit](./set-user-credit-limit)**: Set credit limit for user
- **[Delete User](./delete-user)**: Delete user
<!-- - **[Reactivate User](./reactivate-user)**: Reactivate user -->

### Common Reference

- **[Introduction to Sivi API](../overview)**: Overview of the Sivi API platform and capabilities
- **[Design Types & Dimensions](../common/design-types)**: Complete reference of supported design formats and dimensions
- **[Supported Languages](../common/supported-languages)**: Complete list of supported languages for all API endpoints
- **[Asset Types](../common/asset-types)**: Complete list of supported asset types and options for all API endpoints
- **[Content Block Types](../common/content-block-types)**: Complete list of supported text content block types for all API endpoints
- **[Brand Persona Details](../common/brand-persona-details)**: Complete list of supported brand persona parameters

<!-- ### Testing
Try testing User Management API with below links:

- **[User Management API](/docs/sivi-api/swagger/user-management-api)**: Interactive testing for User Management API -->
 
## Getting Started

To get started with the User Management API, [sign up for a Sivi account](https://instant.sivi.ai) and generate your [API key](https://instant.sivi.ai/#/settings).

## Authentication

All API requests require authentication using your API key. Include your API key in all requests:

```http
sivi-api-key: YOUR_API_KEY
```

<!-- ## Core API Rate Limits

| Endpoint | Rate Limit | Burst Limit |
|----------|------------|-------------|
| Design Generation | 30 requests/minute | 6 requests |
| Job Status | 12 requests/minute | 24 requests |
| Content Suggestions | 30 requests/minute | 60 requests | 

For higher rate limits, consider upgrading to the Enterprise Plan


-->


## Enterprise API
For higher rate limits, consider upgrading to the Enterprise Plan
> **Note:** They have exclusively endpoints. And require an Enterprise account API key.

```http
POST enterprise/<API_ENDPOINT>
```

<!-- Check out [Enterprise API](../enterprise-api/overview) for more details. -->