---
id: asset-types
title: Asset Types
description: Reference for supported asset types and their options
sidebar_position: 9
---

# Asset Types Reference

When generating designs with Sivi, you can include various types of assets such as images, logos, and icons. This reference guide explains the supported asset types and their configuration options.

## Supported Asset Types

Sivi supports three main asset types:

1. **Images** - Photographs, illustrations, or any raster graphics
2. **Logos** - Brand logos or identity marks
3. **Icons** - Simple graphic elements or symbols

## Asset Type Specifications

### Images

Use the `images` array to include photographs and other visual content in your designs.

```json
"assets": {
  "images": [{
    "url": "https://images.hellosivi.com/fit-in/800x800/photos/sKN0gtrFJn4.jpg",
    "imagePreference": {
      "crop": true,
      "removeBg": false
    },
    "touchPosition": {
      "left": false,
      "right": false,
      "bottom": false,
      "top": false,
      "center": false
    }
  }]
}
```

#### Image Options

| Option | Type | Description |
|--------|------|-------------|
| url | string | URL to the image (must be publicly accessible) |
| imagePreference | object | Preferences for how the image would be processed |
| touchPosition | object | Control how the image is positioned in the design |

#### Image Preference Options

| Option | Type | Description |
|--------|------|-------------|
| crop | boolean or null | If `true`, the image can be cropped to fit the design. If `null` or not specified, will be auto-detected. |
| removeBg | boolean or null | If `true`, attempts to remove the background from the image. If `null` or not specified, will be auto-detected. |

#### Touch Position Options

| Option | Type | Description |
|--------|------|-------------|
| left | boolean | If `true`, the image would touch the left edge of the design |
| right | boolean | If `true`, the image would touch the right edge of the design |
| top | boolean | If `true`, the image would touch the top edge of the design |
| bottom | boolean | If `true`, the image would touch the bottom edge of the design |
| center | boolean | If `true`, the image would be centered in the design |

### Logos

Use the `logos` array to include brand logos in your designs.

```json
"assets": {
  "logos": [{
    "url": "https://images.hellosivi.com/fit-in/200x200/logos/sLkA1TkxN67.png",
    "logoStyles": ["direct", "outline"],
    "touchPosition": {
      "left": false,
      "right": false,
      "bottom": false,
      "top": false,
      "center": false
    }
  }]
}
```

#### Logo Options

| Option | Type | Description |
|--------|------|-------------|
| url | string | URL to the logo (must be publicly accessible) |
| logoStyles | array | Array of styles to apply to the logo |
| touchPosition | object | Control how the logo is positioned in the design |

#### Logo Style Options

The following logo styles can be specified in the `logoStyles` array:

- `"direct"` - Original logo without modifications
- `"neutral"` - Logo rendered in a neutral color scheme
- `"colorful"` - Logo rendered with vibrant colors
- `"outline"` - Logo rendered with an outline

If not specified, defaults to `["direct", "outline"]`.

### Icons

Use the `icons` array to include simple graphic elements or symbols in your designs.

```json
"assets": {
  "icons": [{
    "url": "https://images.hellosivi.com/fit-in/100x100/icons/iKN0gtrFJn4.png",
    "touchPosition": {
      "left": false,
      "right": false,
      "bottom": false,
      "top": false,
      "center": false
    }
  }]
}
```

#### Icon Options

| Option | Type | Description |
|--------|------|-------------|
| url | string | URL to the icon (must be publicly accessible) |
| touchPosition | object | Control how the icon is positioned in the design |

## Best Practices

1. **Image Quality** - Use high-resolution images for best results
2. **Logo Transparency** - For logos, use transparent PNG files when possible
3. **Multiple Assets** - You can include multiple assets of each type (up to 4 total)
4. **Asset Access** - Ensure all asset URLs are publicly accessible
5. **Auto-detection** - When not specifying options like `crop` or `removeBg`, Sivi will automatically detect the best settings
6. **touchPosition** - Touch positions are not mandatory, keep this null, Sivi will automatically detect the best settings. Also touch position is not guaranteed to be considered.

## Example with Multiple Asset Types

```json
"assets": {
  "images": [{
    "url": "https://example.com/product.jpg",
    "imagePreference": {
      "crop": true,
      "removeBg": true
    }
  }],
  "logos": [{
    "url": "https://example.com/logo.png",
    "logoStyles": ["direct", "outline"]
  }],
  "icons": [{
    "url": "https://example.com/icon.png"
  }]
}
```
