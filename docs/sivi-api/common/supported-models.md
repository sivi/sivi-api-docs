---
id: supported-models
title: Supported Models
description: Complete reference of supported AI models for design, image, and text generation
sidebar_position: 13
---

# Supported Models

This reference lists all supported AI models across Sivi's design, image, and text generation APIs.

## Design Generation Models

### Compose Models

| Name | Value | Credits | Label |
|------|-------|---------|-------|
| Auto Model | `auto` | 1–3 | per design |
| Sivi Gen-2.8H Lite | `sivi-gen-28h-lite` | 1+ | per design |
| Sivi Gen-2.8H Pro | `sivi-gen-28h-pro` | 2+ | per design |
| Sivi Gen-2.8H Max | `sivi-gen-28h-max` | 5+ | per design |
| Sivi Gen-2.7 | `sivi-gen-27` | 1 | per design |

### Imagine Models

#### Nano Banana Models

| Name | Value | Credits | Label |
|------|-------|---------|-------|
| Nano Banana | `nano-banana:1k` | 2 | per design |
| Nano Banana 2 1k | `nano-banana-2:1k` | 2 | per design |
| Nano Banana 2 2k | `nano-banana-2:2k` | 3 | per design |
| Nano Banana 2 4k | `nano-banana-2:4k` | 4 | per design |
| Nano Banana Pro 1k | `nano-banana-pro:1k` | 3 | per design |
| Nano Banana Pro 2k | `nano-banana-pro:2k` | 4 | per design |
| Nano Banana Pro 4k | `nano-banana-pro:4k` | 5 | per design |

#### GPT Models

| Name | Value | Credits | Label |
|------|-------|---------|-------|
| GPT Image 1 Low | `gpt-image-1:low` | 0.5 | per design |
| GPT Image 1 Medium | `gpt-image-1:medium` | 1 | per design |
| GPT Image 1 High | `gpt-image-1:high` | 3 | per design |

## Image Generation Models

Used in the [Generate Media](../core-api/media/generate-media) endpoint and [Update Brand](../core-api/brand/update-brand) `imageGenPreference` field.

| Name | Value | Credits | Label | Premium | Can Generate | Can Enhance |
|------|-------|---------|-------|---------|--------------|-------------|
| Auto | `auto` | 0.03–3 | per image | No | Yes | Yes |
| Flux Schnell | `flux-schnell` | 0.03 | per image | No | Yes | No |
| Flux Klein 4b | `flux-klein-4b` | 0.03 | per image | No | Yes | No |
| Flux Klein 9b | `flux-klein-9b` | 0.05 | per image | No | Yes | Yes |
| Flux Dev | `flux-dev` | 0.05 | per image | Yes | Yes | No |
| TwinFLOW Z Image Turbo | `twinflow-z-image-turbo` | 0.05 | per image | No | Yes | No |
| Z Image Turbo | `z-image-turbo` | 0.1 | per image | No | Yes | No |
| Nano Banana | `nano-banana:1k` | 2 | per image | Yes | Yes | Yes |
| Nano Banana 2 | `nano-banana-2:1k` | 2 | per image | Yes | Yes | Yes |
| Nano Banana Pro | `nano-banana-pro:1k` | 3 | per image | Yes | Yes | Yes |

### Supported Dimensions by Model

Most image models support the following dimensions:

| Width | Height | Aspect Ratio |
|-------|--------|-------------|
| 1024 | 1024 | 1:1 |
| 1344 | 768 | 7:4 |
| 1280 | 960 | 4:3 |
| 960 | 1280 | 3:4 |
| 768 | 1344 | 4:7 |

**Nano Banana, Nano Banana 2, and Nano Banana Pro** additionally support:

| Width | Height | Aspect Ratio |
|-------|--------|-------------|
| 1264 | 848 | ~3:2 |
| 848 | 1264 | ~2:3 |
| 1200 | 896 | ~4:3 |
| 896 | 1200 | ~3:4 |
| 1152 | 928 | ~5:4 |
| 928 | 1152 | ~4:5 |
| 1376 | 768 | ~16:9 |
| 768 | 1376 | ~9:16 |
| 1548 | 672 | ~23:10 |

## Text Generation Models

Used in the [Update Brand](../core-api/brand/update-brand) `textGenPreference` field.

| Name | Value | Credits | Label | Premium |
|------|-------|---------|-------|---------|
| Auto | `auto` | 2.5–3 | per 1M Tokens | No |
| Gemini Flash 3.0 | `gemini-3-flash-preview` | 8.3 | per 1M Tokens | No |
| Grok 4.1 | `grok-4-1-fast-non-reasoning` | 3.3 | per 1M Tokens | Yes |
| GLM 5 | `zai-org/glm-5-maas` | 16.6 | per 1M Tokens | Yes |

## Usage Notes

- When `auto` is specified, Sivi selects the best model based on the request context
- **Premium** models require an active subscription plan
- **Can Generate** = supports creating images from a text prompt alone
- **Can Enhance** = supports modifying existing images with a prompt
- **Can Combine** = supports combining multiple image assets in a single request
- Always verify that the model supports your intended operation before making a request
