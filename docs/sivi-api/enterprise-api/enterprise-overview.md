---
id: enterprise-overview
title: Overview
description: Enterprise API features and documentation
sidebar_position: 1
---

# Sivi Enterprise API

> **Note:** Enterprise API is available exclusively for users on the Enterprise plan.

The Sivi Enterprise API provides advanced design generation capabilities with additional features tailored for enterprise customers. This includes higher rate limits, priority processing, dedicated support, and advanced customization options.

## Enterprise API Features

- **Higher Rate Limits**: Generate more designs with increased API call quotas
- **Priority Processing**: Faster job processing with dedicated resources
- **White-labeled Output**: Remove Sivi branding from generated designs
- **Advanced Analytics**: Detailed usage reporting and insights
- **Advanced Customization**: Deeper control over design generation parameters
- **Custom Integrations**: Support for custom enterprise integrations
- **Dedicated Support**: Direct access to technical support team

## API Documentation

All Enterprise API customers have access to the full range of Sivi API endpoints with expanded capabilities and enterprise-exclusive features. 
Our enterprise API provides advanced functionality, higher rate limits, and enhanced support.

### Core Endpoints
Please refer [Core API](../core-api/core-overview) for more details.

### User Management Endpoints
Please refer [User Management API](../user-management-api/user-overview) for more details.

### Enterprise Only Endpoints
Additional Enteprise only APIs are available. Will be part of the Enterprise Agreement.

<!-- - **[Export Data](./endpoints/export-data)**: Export design and media data -->
<!-- - **[Account Analysis](./endpoints/account-analysis)**: Analyze usage data for users or workspaces -->


### Common Reference
- **[Introduction to Sivi API](../overview)**: Overview of the Sivi API platform and capabilities
- **[Design Types & Dimensions](../common/design-types)**: Complete reference of supported design formats and dimensions
- **[Supported Languages](../common/supported-languages)**: Complete list of supported languages for all API endpoints
- **[Asset Types](../common/asset-types)**: Complete list of supported asset types and options for all API endpoints
- **[Content Block Types](../common/content-block-types)**: Complete list of supported text content block types for all API endpoints
- **[Brand Persona Details](../common/brand-persona-details)**: Complete list of supported brand persona parameters

<!-- ### Testing -->
<!-- Try testing Enterprise API with below links:
- **[Enterprise Endpoints API](/docs/sivi-api/swagger/enterprise-endpoints)**: Interactive testing for Enterprise Endpoints API 
- **[Enterprise Core API](/docs/sivi-api/swagger/enterprise-core-api)**: Interactive testing for Enterprise Core API -->

## Enterprise Support

For Enterprise API support, you would get priority slack support channel.

## Authentication

Enterprise API customers receive unique API keys with higher rate limits and access to enterprise-only features. Include your API key in all requests:

```http
sivi-api-key: YOUR_ENTERPRISE_API_KEY
```

<!-- ## Enterprise Rate Limits

| Endpoint | Rate Limit | Burst Limit |
|----------|------------|-------------|
| Design Generation | 100 requests/minute | 200 requests |
| Job Status | 200 requests/minute | 400 requests |
| Content Suggestions | 100 requests/minute | 200 requests | -->

<!-- Contact your account representative for custom rate limit adjustments. -->
