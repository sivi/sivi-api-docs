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

Preferred color hex codes. It is required only in mode custom.

## fontGroups

Preferred font groups. It is required only in mode custom.

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
| Plain Fill | Plain Fill |
| Inset Frame | Inset Frame |
| Inset Outline | Inset Outline |
| Patterned Boundary | Patterned Boundary |
| Stroked Outline | Stroked Outline |
| Corner Accent | Corner Accent |
| Bar Accent | Bar Accent |

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


## Example Usage

Here's a comprehensive example showing how to use the brand persona parameters:

```json
{
    "mode": "custom",
    "colors": ["#5662EC", "#EF9AB2"],
    "theme": ["light"],
    "frameStyle": ["Plain Fill"],
    "backdropStyle": ["minimalist"],
    "focus": ["text"],
    "imageStyle": ["cover"]
}
```

<!-- "tones": ["playful", "maximal"] -->

## Usage Notes

- When using the API, you should specify at least mode.
- Pass colors, theme, frameStyle, backdropStyle, focus, imageStyle only in mode custom.