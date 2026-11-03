---
id: settings
title: Settings
description: Detailed description of each fields in settings object
sidebar_position: 11
---

# settings

Settings will allow users to pass the preferences for the design generation request. Based on the mode of settings sivi will take the preferences and generate the design.


## mode

Mode parameter helps to choose preferences for the design. In auto mode sivi will take the preferences and generate the design. In brand mode sivi will take the brand persona preferences and generate the design. In custom mode sivi will take the custom preferences and generate the design.

| ID | Display Name |
|------|-------------|
| auto | Auto |
| brand | Brand |
| custom | Custom |


:::note
Only in mode custom, sivi will take preferences from the settings. Others modes will take preferences from the brand or auto based on the mode.
:::

## currentbId

currentbId parameter helps to identify the brand's preferences. It is required only in mode brand.

## colors

Preferred colors as hex codes or rgba strings (max 10). Colors are resolved in this order: the colors you send (custom), then the colors of the brand in `currentbId` (when `mode` is `brand`), and when both are empty Sivi picks colors that suit the request (auto).

## fontGroups

Preferred font groups for typography. Fonts are resolved in this order: the font groups you send (custom), then the fonts of the brand in `currentbId` (when `mode` is `brand`), and when both are empty Sivi picks one font group that suits the content (auto). Must contain exactly 3 font entries, one for each type: `heading`, `subHeading`, and `body`.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | String | Yes | Font ID from the [get-fonts](../core-api/get-fonts) endpoint |
| `name` | String | Yes | Display name of the font |
| `type` | String | Yes | Font usage type. Must be one of: `heading`, `subHeading`, `body` |
| `status` | String | Yes | Status of the font. Allowed values: `enabled`, `disabled` |
| `addedBy` | String | Yes | Source of the font. Allowed values: `system`, `user` |

```json
"fontGroups": [
  {
    "id": "cr9HpZiN7XA",
    "name": "FiraSans Condensed Black",
    "type": "heading",
    "status": "enabled",
    "addedBy": "system"
  },
  {
    "id": "crOvkYkeiiE",
    "name": "Raleway Bold",
    "type": "subHeading",
    "status": "enabled",
    "addedBy": "system"
  },
  {
    "id": "cJqSe7mFuRu",
    "name": "Raleway Light",
    "type": "body",
    "status": "enabled",
    "addedBy": "system"
  }
]
```

:::note
All three font types (`heading`, `subHeading`, `body`) are mandatory. Maximum of 3 font entries allowed.
:::

## theme

Preferred theme. It is required only in mode custom.

| ID | Display Name |
|------|-------------|
| light | Light |
| dark | Dark |
| colorful | Colorful |

## frameStyle

Preferred frame style. It is required only in mode custom.

| ID | Display Name |
|------|-------------|
| plain | Plain |
| box | Box |
| bar-accent | Bar Accent |

## backdropStyle

Preferred backdrop style. It is required only in mode custom.

| ID | Display Name |
|------|-------------|
| minimalist | Minimalist |
| imagery | Imagery |
| artistic | Artistic |

## focus

Preferred focus. It is required only in mode custom.

| ID | Display Name |
|------|-------------|
| text | Text |
| image | Image |
| neutral | Neutral |


## imageStyle

Preferred image style. It is required only in mode custom.

| ID | Display Name |
|------|-------------|
| cover | Cover |
| cover-with-linear-gradient | Cover With Linear Gradient |
| cover-with-overlay | Cover With Overlay |
| container | Container |
| section | Section |
| section-with-container | Section with Container |
| mask | Mask |
| cutout | Cutout |
| cutout-with-vectors | Cutout with vectors |
| content-free-form | Content Free Form |

<!-- ## genMode

Generation mode for the design. Possible values: `compose`, `imagine`. Based on this mode, the corresponding `designModel` value should be selected from the supported models. -->

## genPrimaryImages

Boolean, default `false`. When `true`, [designs-from-prompt](../core-api/designs-from-prompt) generates a primary (hero) image for the design from your prompt, and [content-from-prompt](../core-api/content-from-prompt) generates an image next to the text (content-from-prompt generates an image unless you send `false`). No image is generated if `medias` already contains a primary asset (anything other than a `logo` or `backdrop`).

## designModel

Model to use for design generation. See [Supported Models](../common/supported-models) for compose and image generation mode allowed models.

## Example Usage

Here's a comprehensive example showing how to use the brand persona parameters:

```json
{
    "mode": "custom",
    "colors": ["#5662EC", "#EF9AB2"],
    "theme": ["light"],
    "frameStyle": ["plain"],
    "backdropStyle": ["minimalist"],
    "focus": ["text"],
    "imageStyle": ["cover"]
}
```

<!-- "tones": ["playful", "maximal"] -->

## How settings are applied

Send only the fields you need. Sivi converts them into the full settings of the design; every field you leave out keeps its default. Fields Sivi does not use are ignored.

| API field | Applied as |
|---|---|
| `colors` | Custom color palette. Hex codes and rgb()/rgba() strings are accepted and stored as hex. |
| `fontGroups` | Custom fonts: one heading, one subHeading and one body font. |
| `mode`, `currentbId` | Where preferences come from, see below. `currentbId` selects the brand. |
| `theme`, `frameStyle`, `backdropStyle`, `focus`, `imageStyle` | Design style preferences. |
| `designModel`, `genPrimaryImages` | Generation model and primary image generation. |
| `numOfVariants` (request field) | Number of design variants. |

`colors` and `fontGroups` can also be sent at the top level of the request; `settings` takes precedence.

## Mode and preferences

- `auto`: Sivi chooses `theme`, `frameStyle`, `backdropStyle`, `focus` and `imageStyle` for the request. A `custom` or `brand` request whose `theme`, `frameStyle`, `focus` and `imageStyle` are all empty is treated as `auto`; once Sivi has chosen, the design is stored in `custom` mode.
- `brand`: preferences come from the brand in `currentbId` and are used as given.
- `custom`: the values you send in `settings` are used as given.

## Usage Notes

- When using the API, you should specify at least mode.
- Pass colors, theme, frameStyle, backdropStyle, focus, imageStyle only in mode custom.