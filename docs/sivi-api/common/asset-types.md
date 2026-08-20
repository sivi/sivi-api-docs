---
id: asset-types
title: Asset Types
description: Reference for supported asset types and their options
sidebar_position: 9
---

# Asset Types Reference

When generating designs with Sivi, you can include various types of assets such as images, logos, and icons. This reference guide explains the supported asset types and their configuration options.

## Medias (Unified Input)

The `medias` field is the recommended way to provide assets. It is a single flat array that combines Sivi library media (referenced by `mId`) and external URL-based assets. It replaces the legacy `siviAssets` + `assets` pair, which is still supported for backward compatibility.

### Medias Format

```json
"medias": [
  { "mId": "mediaId1", "type": "photo" },
  { "url": "https://example.com/image1.png", "type": "photo" }
]
```

### Media Item Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `mId` | string | Conditional | Media ID of a Sivi library asset. Preferred identifier — when present, `url` is not required. |
| `url` | string | Conditional | Publicly accessible remote URL (`http://` or `https://`). Required when `mId` is absent. |
| `type` | string | No | Media type. See [Supported Media Types](#supported-media-types) below. If omitted, defaults to `photo`, or `icon` when the `url` ends with `.svg`. |
| `imagePreference` | object | No | Preferences for how the media would be processed. See [Image Preference Options](#image-preference-options). Applies to `photo`/`logo`/`icon`/`illustration`/`backdrop`/`screenshot` types. |
| `touchPositions` | object | No | Control how the media is positioned in the design. See [Touch Position Options](#touch-position-options). |
| `hueRotations` | object | No | Hue rotation preferences (Sivi library media only, with `mId`). |
| `logoStyles` | array | No | Array of styles to apply to the logo. See [Logo Style Options](#logo-style-options). Applies to `logo` type. |

### Supported Media Types

The `type` field uses the media abstract type. Supported values:

| Media Type | Description |
|------------|-------------|
| `photo` | Photographs, illustrations, or any raster graphics |
| `logo` | Brand logos or identity marks |
| `icon` | Simple graphic elements or symbols |
| `illustration` | Illustration assets |
| `backdrop` | Backdrop / background images |
| `screenshot` | Screen captures (e.g., iPhone screenshots) |
| `inspiration` | Reference images or mood boards |
| `decor` | Decorative elements |

### Type Inference

When `type` is omitted from a media item:

1. If the `url` ends with `.svg` (case-insensitive, ignoring query string), `type` is set to `icon`.
2. Otherwise, `type` defaults to `photo`.

For `mId`-based media, the type is resolved from the Sivi library record.

### Example with Medias

```json
"medias": [
  { "mId": "mediaId1", "type": "photo", "imagePreference": { "crop": true, "removeBg": false } },
  { "url": "https://example.com/logo.png", "type": "logo", "logoStyles": ["direct", "outline"] },
  { "url": "https://example.com/icon.svg" },
  { "url": "https://example.com/inspiration.jpg", "type": "inspiration" }
]
```

> Note: The third item has no `type` and its `url` ends with `.svg`, so it is inferred as `icon`.

## Common Options

### Image Preference Options

| Option | Type | Description |
|--------|------|-------------|
| crop | boolean or null | If `true`, the image can be cropped to fit the design. If `null` or not specified, will be auto-detected. |
| removeBg | boolean or null | If `true`, attempts to remove the background from the image. If `null` or not specified, will be auto-detected. |

### Touch Position Options

| Option | Type | Description |
|--------|------|-------------|
| left | boolean | If `true`, the image would touch the left edge of the design |
| right | boolean | If `true`, the image would touch the right edge of the design |
| top | boolean | If `true`, the image would touch the top edge of the design |
| bottom | boolean | If `true`, the image would touch the bottom edge of the design |
| center | boolean | If `true`, the image would be centered in the design |

### Logo Style Options

The following logo styles can be specified in the `logoStyles` array:

- `"direct"` - Original logo without modifications
- `"neutral"` - Logo rendered in a neutral color scheme
- `"colorful"` - Logo rendered with vibrant colors
- `"outline"` - Logo rendered with an outline

If not specified, defaults to `["direct", "outline"]`.

## Legacy Assets Format (Backward Compatible)

The legacy `assets` object and `siviAssets` array are still accepted. When `medias` is provided, `siviAssets` and `assets` are ignored. When `medias` is absent, the API internally builds medias from `siviAssets` + `assets` so behavior is unchanged.

### siviAssets

Array of Sivi library media references. Each item requires an `mId`:

```json
"siviAssets": [
  { "mId": "mediaId1", "type": "photo" }
]
```

### assets

Object grouping URL-based assets by asset bucket key:

```json
"assets": {
  "images": [{
    "url": "https://images.hellosivi.com/fit-in/800x800/photos/sKN0gtrFJn4.jpg",
    "imagePreference": { "crop": true, "removeBg": false },
    "touchPosition": { "left": false, "right": false, "bottom": false, "top": false, "center": false }
  }],
  "logos": [{
    "url": "https://images.hellosivi.com/fit-in/200x200/logos/sLkA1TkxN67.png",
    "logoStyles": ["direct", "outline"],
    "touchPosition": { "left": false, "right": false, "bottom": false, "top": false, "center": false }
  }],
  "icons": [{
    "url": "https://images.hellosivi.com/fit-in/100x100/icons/iKN0gtrFJn4.png"
  }],
  "inspiration": [{
    "url": "https://images.hellosivi.com/fit-in/800x800/inspirations/iKN0gtrFJn4.jpg"
  }],
  "decors": [{
    "url": "https://images.hellosivi.com/fit-in/800x800/decors/dKN0gtrFJn4.png"
  }]
}
```

#### Asset Bucket Keys

| Asset Bucket | Media Type | Description |
|--------------|------------|-------------|
| `images` | `photo` | Photographs, illustrations, or any raster graphics |
| `logos` | `logo` | Brand logos or identity marks |
| `icons` | `icon` | Simple graphic elements or symbols |
| `illustration` | `illustration` | Illustration assets |
| `backdrop` | `backdrop` | Backdrop / background images |
| `screenShot` | `screenshot` | Screen captures (e.g., iPhone screenshots) |
| `inspiration` | `inspiration` | Reference images or mood boards |
| `decors` | `decor` | Decorative elements |

> **Note:** Inspirations do not support `imagePreference` or `touchPosition` options. They are used solely as style references and do not appear directly in the generated design.

## Best Practices

1. **Image Quality** - Use high-resolution images for best results
2. **Logo Transparency** - For logos, use transparent PNG files when possible
3. **Multiple Assets** - You can include multiple assets of each type (up to 4 total)
4. **Asset Access** - Ensure all asset URLs are publicly accessible
5. **Auto-detection** - When not specifying options like `crop` or `removeBg`, Sivi will automatically detect the best settings
6. **touchPosition** - Touch positions are not mandatory, keep this null, Sivi will automatically detect the best settings. Also touch position is not guaranteed to be considered.
7. **Prefer `medias`** - Use the `medias` field for new integrations. The legacy `assets`/`siviAssets` fields are supported for backward compatibility only.
