---
id: intro
title: How does Sivi work?
sidebar_position: 1
---

# Sivi AI

Welcome to the official Sivi developer documentation. Here you'll find comprehensive guides and documentation to help you start working with Sivi as quickly as possible.

## What is Sivi?

Sivi provides powerful AI-driven design generation capabilities through both low-level core APIs and UI SDK. Whether you're building a design application, integrating design generation into your existing platform, or looking to generate designs programmatically, Sivi offers flexible solutions to meet your needs.

## How Sivi Generates Designs

Sivi uses advanced AI to create editable, multi-layered vector designs from either text prompts or content inputs. Understanding these generation pathways helps you choose the right approach for your specific needs.

### Design Generation vs. Image Generation

Before diving into the processes, it's important to understand what makes Sivi's design generation unique.
While design is frequently perceived as synonymous with images, design encompasses a broader set of elements including layout, typography, color, and vectors

**Design Generation (Sivi AI)** | **Image Generation (AI)**
:--- | :---
Produces multi-layered vector designs | Creates flat raster images
Each element can be individually edited, rearranged, restyled, or removed | Limited image editing capabilities
Pixel perfect rendering | Fonts and photos will have imperfections
Any dimension | Limited to 3 or 4 aspect ratios

| **Design = Text + Images + Logo + Shapes + Colors** | <img src="/img/design-layers.png" alt="Design layers diagram" style={{maxHeight: 410}} /> |
|:---|:---:|

### Sivi's Design Generation Process

1. **Input Processing**: Your text prompt is analyzed for design intent, style references, and content requirements
2. **Design Planning**: Sivi determines layout structure, visual hierarchy, and component relationships
3. **Element Generation**: Individual design elements are created with appropriate styling
4. **Composition**: Elements are assembled into a cohesive, multi-layered design
5. **Refinement**: The design is optimized for visual harmony and usability

### From Prompt to Design

Sivi transforms descriptive text into fully-realized designs through a sophisticated process.
Prompt is semantically analyzed to convert into a proper content copy relevant to the purpose and medium that would be used for publishing the design. 

```
┌────────────┐    ┌────────────┐    ┌────────────┐    ┌────────────┐
│            │    │            │    │            │    │            │
│  Text      │ -> │  Content & │ -> │ Sivi       │ -> │  Design    │
│  Prompt    │    │  Assets    │    │ Design     │    │  Output    │
│            │    │            │    │ Model      │    │            │
└────────────┘    └────────────┘    └────────────┘    └────────────┘
```



### From Content to Design

Sivi can also generate designs based on your final content copy with images, brand assets

```
┌────────────┐    ┌────────────┐    ┌────────────┐    ┌────────────┐
│            │    │            │    │            │    │            │
│  Content & │    │Generation  │    |  Sivi      |    |            |
│  Assets    │ -> │Preferences │ -> │  Design    │ -> │ Design     │
│  Input     │    │            │    │  Model     │    │ Output     │
│            │    │            │    │            │    │            │
└────────────┘    └────────────┘    └────────────┘    └────────────┘
```


## Documentation Overview

With the understanding of Sivi's design generation concepts, let's explore how to use it.

### Sivi UI SDK

The Sivi UI SDK provides ready-to-use components and libraries for integrating Sivi's design generation capabilities directly into your applications.

#### When to Use Sivi UI SDK

The Sivi UI SDK is the preferred option when you need:

- **Rapid Implementation**: Integrate design generation with minimal development effort
- **Pre-built Components**: Use ready-made UI components for design previews and editing
- **Simplified Integration**: Abstract away the complexity of API calls and response handling
- **Consistent Experience**: Provide a standardized design generation interface to users
- **Managed Updates**: Automatically receive improvements and new features

[Get started with the Sivi UI SDK →](./sivi-ui-sdk/overview.md)


### Sivi Core API

The Sivi Core APIs provide RESTful endpoints for creating designs from prompts or content, checking job status, and more. Use the API when you need programmatic access to Sivi's design generation capabilities.

#### When to Use Sivi Core API

The Sivi Core API is ideal for scenarios where you need:

- **Complete Flexibility**: Build custom design generation workflows within your own application architecture
- **Programmatic Control**: Generate designs through server-side processes or automated workflows
- **Backend Integration**: Incorporate design generation into existing backend systems
- **Custom UX**: Create your own user experience around design generation
- **Cross-Platform Support**: Use the same API endpoints across different platforms and technologies

[Get started with the Sivi API →](./sivi-api/overview.md)

## Sivi Design examples

![Sivi Designs](/img/sivi_designs.png)


## Need Help?

If you can't find what you need in the documentation, please contact: support@sivi.ai for additional assistance
