---
id: media-types
title: Media Types & SubTypes
description: Complete reference of supported media types and their subTypes
sidebar_position: 12
---

# Media Types & SubTypes

This reference lists all supported media `type` and `subType` values used across the Media and Files APIs.

## Valid Type and SubType Combinations

| Type | Allowed SubTypes | Default SubType |
|------|-----------------|-----------------|
| `photo` | `photograph` | `photograph` |
| `logo` | `logo` | `logo` |
| `illustration` | `illustration` | `illustration` |
| `screenshot` | `iphone`, `ipad`, `macbook`, `imac`, `laptop`, `desktop`, `tablet`, `smartphone` | `iphone` |
| `backdrop` | `backgroundImage`, `pattern`, `texture` | `backgroundImage` |
| `icon` | `icon` | `icon` |
| `inspiration` | `design` | `design` |

## Usage

- When creating media via [Create Media](../core-api/media/create-media), the `type` is required and `subType` is optional
- If `subType` is omitted, the **Default SubType** for the given `type` is used
- When filtering media via [Get Media](../core-api/media/get-media), both `type` and `subType` are optional filters
- The `type` and `subType` combination must be valid; invalid combinations will return an error
- When requesting a presigned upload URL via [Get Presigned URL](../core-api/files/get-presigned-url), the `type` must match the file being uploaded

## File Extensions by Type

| Type | Supported Extensions |
|------|---------------------|
| `photo` | `jpg`, `jpeg`, `png`, `webp` |
| `logo` | `jpeg`, `png`, `svg`, `webp` |
| `illustration` | `svg` |
| `screenshot` | `jpg`, `jpeg`, `png`, `webp` |
| `backdrop` | `jpg`, `jpeg`, `png` |
| `icon` | `svg`, `png` |
| `inspiration` | `jpg`, `jpeg`, `png`, `webp` |
| `font` | `ttf` |
| `inspiration` | `jpg`, `jpeg`, `png`, `webp` |
| `icon` | `svg` |