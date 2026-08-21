---
id: content-block-types
title: Content Block Types
description: Supported content blocks for designs from content API
sidebar_position: 5
---

# Content Block Types

When using the [Designs from Content](/docs/sivi-api/core-api/designs-from-content) API, you can specify various types of content blocks within the `documentJson` array. This document provides details about all supported content block types and how to use them effectively.

## Content Structure

Content is provided as an ordered array of blocks. Each block is an object with a `type` and a `value`:

```json
"documentJson": [
  { "type": "title", "value": "T-shirts for summer" },
  { "type": "offer", "value": "Limited Time: Up to 20% Off" },
  { "type": "bulletlist", "value": ["100% cotton", "Easy wash", "Double stitch"] }
]
```

| Field | Type | Description |
|-------|------|-------------|
| type | string | The content block type (e.g., `title`, `offer`, `bulletlist`). See the tables below for all supported types. |
| value | string \| array | The content value. For list types (`bulletlist`, `numberedlist`), this is an array of strings; for all other types, it is a string. |

> **Deprecation Notice:** The v1 `content` object (key-value pairs such as `{"title": "...", "offer": "..."}`) is deprecated in favor of the v2 `documentJson` array. The v1 structure is still accepted for backward compatibility and is automatically converted to `documentJson` internally. New integrations should use `documentJson`.

## Text-Based Content Blocks

These content blocks are used for various types of textual content in your designs:

| Block Type | Description | Example |
|------------|-------------|---------|
| `title` | Main headline or title for your design | `"title": "Discover the Freedom"` |
| `supertext` | Text that appears above the title (often smaller) | `"supertext": "New Year"` |
| `subtext` | Supporting text that appears below the title | `"subtext": "Explore our latest collection of cars and bikes."` |
| `text` | General body text content | `"text": "Leading auto portal for content and commerce hitting 30 Mn+ unique visitors month."` |
| `caption` | Small explanatory text, often used with images | `"caption": "Terms and conditions apply."` |

## Call-to-Action Blocks

These blocks help engage users to take specific actions:

| Block Type | Description | Example |
|------------|-------------|---------|
| `button` | Text for buttons or call-to-action elements | `"button": "Shop Now"` |
| `coupon` | Coupon or promo codes | `"coupon": "BONUS20"` |
| `offer` | Special offer or promotion text | `"offer": "Limited Time: Up to 20% Off"` |

## List Content Blocks

For presenting information in list format:

| Block Type | Description | Example |
|------------|-------------|---------|
| `bulletlist` | Array of items to display as a bulleted list | `"bulletlist": ["Wide range of models", "Best price"]` |
| `numberedlist` | Array of items to display as a numbered list | `"numberedlist": ["Free Service", "Offer price"]` |

## Date and Time Blocks

For time-sensitive content:

| Block Type | Description | Example |
|------------|-------------|---------|
| `date_time` | Date and/or time information | `"date_time": "12th July 2024"` |

## Contact Information Blocks

For including contact details in your designs:

| Block Type | Description | Example |
|------------|-------------|---------|
| `phone` | Phone number | `"phone": "+1 (800) 3543 323"` |
| `email` | Email address | `"email": "joe@example.com"` |
| `website` | Website URL | `"website": "www.example.com"` |
| `address` | Physical address | `"address": "40, M. Ave, Richmond road, US"` |

## Social Media Blocks

For incorporating social media handles:

| Block Type | Description | Example |
|------------|-------------|---------|
| `whatsapp` | WhatsApp contact number | `"whatsapp": "+1 6351621222"` |
| `instagram` | Instagram handle | `"instagram": "@example"` |
| `facebook` | Facebook username | `"facebook": "example"` |
| `linkedin` | LinkedIn username | `"linkedin": "joe_example"` |
| `twitter` | Twitter/X handle | `"twitter": "@example"` |
| `behance` | Behance username | `"behance": "example"` |
| `dribbble` | Dribbble username | `"dribbble": "example"` |
| `pinterest` | Pinterest username | `"pinterest": "example"` |
| `slack` | Slack workspace name | `"slack": "example"` |

## Asset Blocks

Asset blocks let you include images, logos, icons, and other visual media directly in the content flow. Each asset block's `value` is an array of media items. A media item can reference an existing Sivi library asset by `mId`, or provide a remote `url` that will be uploaded and converted to a media record automatically.

| Block Type | Description |
|------------|-------------|
| `photo` | Photograph / product image |
| `logo` | Brand logo |
| `icon` | Icon (SVG or raster) |
| `illustration` | Illustration artwork |
| `backdrop` | Background image |
| `texture` | Texture backdrop |
| `pattern` | Pattern backdrop |
| `screenshot` | Device screenshot (iPhone by default) |

```json
"documentJson": [
  {
    "type": "logo",
    "value": [
      { "url": "https://media.hellosivi.com/logos/sIndXLRpXk8.png" },
      { "mId": "sIndXLRpXk8" }
    ]
  },
  {
    "type": "photo",
    "value": [
      { "mId": "mediaId1", "imagePreference": { "crop": true, "removeBg": false } }
    ]
  }
]
```

| Field | Required | Description |
|-------|----------|-------------|
| `mId` | One of `mId`/`url` | Sivi media library id. The full media object is fetched from the database. |
| `url` | One of `mId`/`url` | Remote URL (`http://` or `https://`). Uploaded to S3 and a media record is created automatically. |
| `imagePreference` | No | Overrides for the media (e.g. `{ "crop": true, "removeBg": false }`). Only used with `mId`. |
| `touchPositions` | No | Touch position overrides. Only used with `mId`. |
| `hueRotations` | No | Hue rotation overrides. Only used with `mId`. |

> If an `mId` does not exist in the media library, the request fails with `422 INVALID_INPUT`.

## Component Blocks

Component blocks let you embed pre-built Sivi components (e.g. buttons, grids) by referencing their `cmpId`. The full component definition is fetched from the database.

```json
"documentJson": [
  {
    "type": "components",
    "value": [
      { "cmpId": "cmp_jsdbhegvfdhgefdekned" }
    ]
  }
]
```

| Field | Required | Description |
|-------|----------|-------------|
| `cmpId` | Yes | Sivi component library id. The full component object is fetched from the database. |

> If a `cmpId` does not exist in the component library, the request fails with `422 INVALID_INPUT`.

## Group Blocks

Group blocks let you combine multiple content blocks into a connected group. Each sub-block is a `{type, value}` item and supports all block types, including asset and component blocks.

```json
"documentJson": [
  {
    "type": "group",
    "value": [
      { "type": "icon", "value": [{ "url": "https://media.hellosivi.com/icons/website.svg" }] },
      { "type": "website", "value": "www.example.com" }
    ]
  }
]
```

## Repeat Group Blocks

A `repeatGroup` is an array of sub-groups that are rendered as a connected repeatable chain. Each entry in the `value` array must be a `group` block.

```json
"documentJson": [
  {
    "type": "repeatGroup",
    "value": [
      {
        "type": "group",
        "value": [
          { "type": "icon", "value": [{ "url": "https://media.hellosivi.com/icons/website.svg" }] },
          { "type": "website", "value": "www.simhas.in" }
        ]
      },
      {
        "type": "group",
        "value": [
          { "type": "icon", "value": [{ "url": "https://media.hellosivi.com/icons/whatsapp.svg" }] },
          { "type": "whatsapp", "value": "+91-99455-69597" }
        ]
      }
    ]
  }
]
```

## Repeat Chain Blocks

Repeat chain blocks render a list of items, each composed of multiple sub-blocks. Supported types: `imageTextList`, `imageTitleTextList`, `titleTextList`, `textList`. Each entry in the `value` array is a `group` of sub-blocks.

```json
"documentJson": [
  {
    "type": "imageTextList",
    "value": [
      {
        "type": "group",
        "value": [
          { "type": "icon", "value": [{ "url": "https://media.helosivi.com/icons/website.svg" }] },
          { "type": "website", "value": "www.simhas.in" }
        ]
      }
    ]
  }
]
```

## Best Practices

1. **Include necessary content blocks**: Different design types may require specific content blocks. For example, an advertisement design typically needs a title, offer, and button.

2. **Keep content concise**: For optimal design generation, keep your content brief and to the point.

3. **Combine with assets**: Pairing appropriate content blocks with relevant images and logos (via the `assets` object) yields the best design results.

4. **Plan hierarchically**: Consider how content will be organized - titles should be brief and attention-grabbing, while supportive text can provide details.

## Example Usage

Here's a comprehensive example showing how various content blocks can be combined using the `documentJson` array:

```json
{
  "documentJson": [
    { "type": "title", "value": "Summer Collection 2025" },
    { "type": "supertext", "value": "New Arrival" },
    { "type": "subtext", "value": "Premium quality at affordable prices" },
    { "type": "offer", "value": "Limited Time: Up to 30% Off" },
    { "type": "bulletlist", "value": [
      "Ethically sourced materials",
      "Free shipping on orders over $50",
      "30-day money-back guarantee"
    ] },
    { "type": "button", "value": "Shop Now" },
    { "type": "date_time", "value": "August 31, 2025" },
    { "type": "logo", "value": [
      { "url": "https://media.hellosivi.com/logos/sIndXLRpXk8.png" }
    ] },
    { "type": "components", "value": [
      { "cmpId": "cmp_jsdbhegvfdhgefdekned" }
    ] },
    { "type": "website", "value": "www.example-store.com" },
    { "type": "instagram", "value": "@example_fashion" }
  ]
}
```

### v1 `content` object (deprecated)

For backward compatibility, the v1 `content` object is still accepted and automatically converted to `documentJson`:

```json
{
  "content": {
    "title": "Summer Collection 2025",
    "supertext": "New Arrival",
    "subtext": "Premium quality at affordable prices",
    "offer": "Limited Time: Up to 30% Off",
    "bulletlist": [
      "Ethically sourced materials",
      "Free shipping on orders over $50",
      "30-day money-back guarantee"
    ],
    "button": "Shop Now",
    "date_time": "August 31, 2025",
    "website": "www.example-store.com",
    "instagram": "@example_fashion"
  }
}
```