---
id: superuser-brand-setup
title: User Brand Setup
---

# Brand Management in Superuser SDK

The Sivi User Management API provides powerful brand management capabilities that allow your application to utilize and maintain your users' brand details without requiring them to manually upload or configure branding details for each design session.

## Overview

Brand management in the Superuser SDK offers two key approaches:

1. **During User Authentication** - Brand details can be included in the user login API payload
2. **Via Dedicated Brand APIs** - Separate endpoints for extracting and setting brand details

Effective brand management ensures that all generated designs automatically align with your users' brand guidelines, creating a seamless and professional design experience.

## Brand Kit Structure

A complete brand kit includes the following components:

| Component | Description | Required |
|-----------|-------------|----------|
| `brandName` | Company or product name | Yes |
| `brandDescription` | Brief description of the brand | Yes |
| `brandUrl` | Website URL | No |
| `brandLogo` | URL to the brand logo image | No |
| `brandColors` | Array of hex color codes | No |
| `brandPersona` | Object containing brand personality attributes | No |

### Example Brand Kit JSON

```json
{
  "brandName": "Sivi",
  "brandDescription": "AI design generator for brands and layered vector based design generation",
  "brandUrl": "https://sivi.ai",
  "brandLogo": "https://sivi.ai/sivi-logo.png",
  "brandColors": ["#5662EC", "#EF9AB2"],
  "brandPersona": {
    "emotions": ["happy"],
    "industry": "games",
    "audience": ["working mom", "working dad"],
    "designTags": ["minimal", "time management", "productivity", "health"],
  }
}
```

## Brand Management Methods

### Method 1: Including Brand Details During User Authentication

You can include brand details directly in the login user API payload. This approach is efficient when you already have brand information stored in your user database.

[Login User API](../../sivi-api/user-management-api/login-user)

### Method 2: Using Dedicated Brand APIs

The User Management API provides dedicated APIs for managing brand details separately from user authentication. 

[Set Brand API](../../sivi-api/user-management-api/set-brand)

[Extract Brand API](../../sivi-api/user-management-api/extract-brand)

## Benefits of Brand Management

- **Consistency**: All designs automatically follow brand guidelines
- **Efficiency**: Users don't need to repeatedly upload brand assets
- **Personalization**: Generated designs feel custom-made for each brand
- **Time Savings**: Eliminates manual brand setup for each design session

## Best Practices

1. **Complete Brand Kits**: Provide as many brand details as possible for best results
2. **Regular Updates**: Update brand details when companies rebrand or make significant changes
3. **High-Quality Assets**: Use high-resolution logos for optimal design quality
4. **Brand Personas**: Include detailed brand persona information to guide AI design generation