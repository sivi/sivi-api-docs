---
id: core-overview
title: Overview
description: Core API features and documentation
sidebar_position: 1
---

# Sivi Core API

> **Note:** Core API is available for users with Power plan. API Sandbox available for testing. Please refer the Sivi [pricing plan](https://sivi.ai/pricing)

The Sivi Core API provides powerful design generation capabilities for developers, startups, and businesses. It offers a cost-effective way to integrate Sivi's AI-driven design generation into your applications and workflows.

## Core API Features

- **Design Generation**: Create professional designs using text prompts or structured content
- **Multiple Design Types**: Support for various design formats across digital platforms
- **RESTful API**: Simple, standards-compliant API design
- **Webhook Support**: Receive notifications when design jobs complete [Coming Soon]
- **JSON Responses**: Clean, structured response data
- **Transparent Pricing**: Pay only for what you use
- **Developer Resources**: SDKs, code samples, and comprehensive documentation
- **Community Support**: Access to community resources and help

## API Documentation

The Core API provides access to all low-level Sivi design generation capabilities.

### Core Endpoints

- **[Designs from Prompt](./designs-from-prompt)**: Generate designs using natural language prompts
- **[Designs from Content](./designs-from-content)**: Generate designs using structured content
- **[Content from Prompt](./content-from-prompt)**: Create content suggestions using natural language prompts
- **[Get Design Variants](./get-design-variants)**: Retrieving design variants from your account
- **[Request Status](./get-request-status)**: Monitor the status of design generation requests
- **[Extract Brand](./extract-brand)**: Extract brand details from website URL
- **[Set Brand Manual](./set-brand-manual)**: Set brand details for user
- **[Get Brands](./get-brands.md)**: Get list of brands from user account

### Common Reference

- **[Introduction to Sivi API](../overview)**: Overview of the Sivi API platform and capabilities
- **[Design Types & Dimensions](../common/design-types)**: Complete reference of supported design formats and dimensions
- **[Supported Languages](../common/supported-languages)**: Complete list of supported languages for all API endpoints
- **[Asset Types](../common/asset-types)**: Complete list of supported asset types and options for all API endpoints
- **[Content Block Types](../common/content-block-types)**: Complete list of supported text content block types for all API endpoints
- **[Brand Persona Details](../common/brand-persona-details)**: Complete list of supported brand persona parameters

### Testing

Try testing Core API with below links:

- **[Core API](/docs/sivi-api/swagger/core-api)**: Interactive testing for Core API
 
## Getting Started

To get started with the Core API, [sign up for a Sivi account](https://instant.sivi.ai) and generate your [API key](https://instant.sivi.ai/#/settings).

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
## Super / Enterprise API
For higher rate limits, consider upgrading to the Super & Enterprise Plan
> **Note:** They have exclusively endpoints. And require an Super/Enterprise account API key. You need to provision a Super/Enterprise account API key from Sivi.

```http
POST enterprise/<API_ENDPOINT>
```

```http
POST super/<API_ENDPOINT>
```

Additionally. Super/Enterprise API can call these apis on behalf of your end-users with an additional parameter

```json
"abstractUserId": "281743-2322-34i44sd3-dkfjgdkjf292"
```

"abstractUserId" a Unique identifier for the user to generate design. If provided, designs will be generated for the specified user. If not provided, designs will be generated for the authenticated API_KEY user.

<!-- Check out [Enterprise API](../enterprise-api/overview) for more details. -->