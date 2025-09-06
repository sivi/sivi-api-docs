---
id: widget-functions-events
title: Widget Functions & Events
---

# Widget Functions & Events

This document outlines the core functions and events available in the Sivi UI SDK, which allow you to control the widget and respond to user interactions.

## Global Namespace

When the Sivi UI SDK script loads, it creates a global `SIVI` object in the browser window. This object provides all the methods needed to interact with the widget.

```javascript
// Access the SIVI namespace
const siviSDK = window.SIVI;
```

## Core Functions

The Sivi UI SDK provides the following core functions:

| Function | Description |
|----------|-------------|
| `show()` | Initializes and loads the Sivi widget in a specified container |
| `hide()` | Removes the widget iframe from the target element |
| `setOptions()` | Sets the options for the widget |
| `openDesignVariantEditor()` | Opens the design editor for a specific variant editing |
| `events()` | Registers a single event callback to process all widget events |
| `removeEventsCallback()` | Removes the previously registered event callback. Mostly used in unmount of a component |

### 1. Show Widget

The `show` method initializes and loads the Sivi UI SDK inside a specific container element in your application.

#### Syntax

```javascript
SIVI.show(options, containerId);
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | Object | Configuration options for the widget |
| `containerId` | String | ID of the HTML element where the widget will be embedded |

#### Options Object Properties

| Property | Type | Description | Required |
|----------|------|-------------|----------|
| `type` | String | Design type (e.g., "socialMedia", "displayAds") | No |
| `subtype` | String | Design subtype (e.g., "instagram", "facebook") | No |
| `dimension` | Object | Width and height dimensions for the design | No |
| `prompt` | String | Prompt text to pre-fill the prompt box | No |
| `language` | String | Language for the widget | No |
| `colors` | Array | List of color values | No |
| `numOfVariants` | Number | Number of design variants | No |
| `outputFormat` | String | Output format for the design | No |
| `config` | Object | Additional configuration options | No |

#### Example: Show Widget

```javascript
// Prepare your container element
// <div id="sivi-container" style="width: 100%; height: 600px;"></div>

const containerId = "sivi-container";

window.SIVI.show({
    type: "socialMedia",
    subtype: "instagram",
    dimension: {
        width: 1080,
        height: 1080
    },
    prompt: "Create a modern social media post about sustainable fashion", // Pre-fill prompt
    language: "english",
    colors: ["#5662EC", "#EF9AB2"],
    numOfVariants: 2,
    outputFormat: "png",
    config: {
        enableLoginUI: true, // For Standard SDK will be always true
        enableDesignEditor: true,
    }
}, containerId);
```

**Note**: Design type (e.g., displayAds, socialMedia). See [Supported Types & Subtypes](../sivi-api/common/design-types) for all available options. Dimension is required as width and height in pixels only if type and subtype is "custom".

**Note**: For Standard SDK, `enableLoginUI` will be always true. Superuser can chose to login in SIVI_WIDGET_EVENT_NEED_AUTH or SIVI_WIDGET_EVENT_LOGIN_CTA event. Preferrably, we should not set `enableLoginUI` to true. As we can do frictionless authentication. Refer [Superuser Authentication](./superuser-features/superuser-authentication) for more details.

**Note**: User brand details, if the user already has brand details in your application, it would be much simpler to set via the set-brand / login-user API and that avoid a brand onboarding flow in widget. Widget expects brand name and brand description set on user to skip the brand setup flow. This is also supported only in Superuser's User Management API.

### 2. Hide Widget

The `hide` method removes the Sivi widget iframe from your application.

#### Syntax

```javascript
SIVI.hide();
```

#### Example: Hiding the Widget

```javascript
// Hide the widget when a user clicks a button
document.getElementById('hide-widget-btn').addEventListener('click', function() {
    window.SIVI.hide();
});
```

### 3. Set Widget Options

The `setOptions` method updates the type, dimension, prompt, language and or any other options for the widget.

#### Syntax

```javascript
SIVI.setOptions(options);
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | Object | Configuration options for the widget |

#### Options Object Properties

| Property | Type | Description | Required |
|----------|------|-------------|----------|
| `type` | String | Design type (e.g., "socialMedia", "displayAds") | No |
| `subtype` | String | Design subtype (e.g., "instagram", "facebook") | No |
| `dimension` | Object | Width and height dimensions for the design | No |
| `prompt` | String | Prompt text to pre-fill the prompt box | No |
| `language` | String | Language for the widget | No |
| `colors` | Array | List of color values | No |
| `numOfVariants` | Number | Number of design variants | No |
| `outputFormat` | String | Output format for the design | No |
| `config` | Object | Additional configuration options | No |

#### Example: setOptions Widget

```javascript
// Set options for the widget
window.SIVI.setOptions({
    type: "socialMedia",
    subtype: "instagram",
    dimension: {
        width: 1080,
        height: 1080
    },
    prompt: "Create a modern social media post about sustainable fashion", // Pre-fill prompt
    language: "english",
    colors: ["#5662EC", "#EF9AB2"],
    numOfVariants: 2,
    outputFormat: "png",
    config: {
        enableLoginUI: true, // For Standard SDK will be always true
        enableDesignEditor: true,
    }
});
```


### 4. Open Design Editor

The `openDesignVariantEditor` method opens the design editor for a specific variant editing.

#### Syntax

```javascript
SIVI.openDesignVariantEditor({variantId: "variantId"});
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | Object | Configuration options for the widget |

#### Options Object Properties

| Property | Type | Description | Required |
|----------|------|-------------|----------|
| `variantId` | String | Variant ID | Yes |

#### Example: openDesignVariantEditor Widget

```javascript
// Set options for the widget
window.SIVI.openDesignVariantEditor({
    variantId: "sh0V7MlzOPm"
});
```


### 5. Event System

The Sivi UI SDK provides an event-driven architecture that allows your application to respond to actions within the widget.

### Available Events

| Event Name | Description | Data Payload | Availability |
|------------|-------------|-------------|-------------|
| `SIVI_WIDGET_EVENT_INIT` | Fired every time when the widget is initialized | Can be used for any notifications | Standard and Superuser |
| `SIVI_WIDGET_EVENT_NEED_AUTH` | Fired when the widget is initialized and widget doesnot have a valid access token | Authentication information can be provided | Superuser |
| `SIVI_WIDGET_EVENT_LOGIN_CTA` | Fired when user clicks the login button in the widget | Authentication token can be provided | Superuser |
| `SIVI_WIDGET_EVENT_DESIGNS_GENERATED` | Fired when designs are generated | Design metadata | Standard and Superuser |
| `SIVI_WIDGET_EVENT_DESIGN_VARIANT_SELECTED` | Fired when user selects a design variation | Selected design details | Standard and Superuser |

#### Syntax

```javascript
SIVI.events(async (event, responseCallback) => {
  switch (event.type) {
    case 'SIVI_WIDGET_EVENT_INIT': {
      console.log('Widget initialized will be called every time widget is initialized or reloaded')
      responseCallback('done')
      break
    }
    case 'SIVI_WIDGET_EVENT_NEED_AUTH': {
      console.log('On initialization of Widget, This event is triggered only when access and refresh token needs to be set on widget')
      responseCallback('done')
      break
    }
    case 'SIVI_WIDGET_EVENT_LOGIN_CTA': {
      console.log('Widget login will be called only when user clicks login button')
      responseCallback('done')
      break
    }
    case 'SIVI_WIDGET_EVENT_DESIGN_VARIANT_SELECTED': {
      /* 
        event.data = {
          "variantImageUrl": "https://resources.hellosivi.com/user-data/e5ef6aa0-8d6c-11ec-bd33-8d2f1bec7c21/generated/sg0yMSZzNnU--97026520-1f1b-11f0-ada0-01392001fe46--sh0V7MlzOPm.jpg",
          "variantEditLink": "https://instant.sivi.ai/#/variant/sh0V7MlzOPm/independent-design-editor?type=edited",
          "variantId": "sh0V7MlzOPm",
          "variantWidth": 1080,
          "variantHeight": 1080,
          "variantType": "EDITED"
        } */
      console.log('SIVI_WIDGET_EVENT_DESIGN_VARIANT_SELECTED event is triggered when user clicks on a design variation')
      const URL = event.data.variantImageUrl + '?timestamp=' + Date.now()
      setImageUrl(URL)
      responseCallback('done')
      break
    }
    case 'SIVI_WIDGET_EVENT_DESIGNS_GENERATED': {
      /*
        event.data = {
          "designId": "97026520-1f1b-11f0-ada0-01392001fe46",
          "variations": [
            {
              "variantImageUrl": "https://resources.hellosivi.com/user-data/e5ef6aa0-8d6c-11ec-bd33-8d2f1bec7c21/generated/sg0yMSZzNnU--97026520-1f1b-11f0-ada0-01392001fe46--sh0V7MlzOPm.jpg",
              "variantEditLink": "https://instant.sivi.ai/#/variant/sh0V7MlzOPm/independent-design-editor?type=edited",
              "variantId": "sh0V7MlzOPm",
              "variantWidth": 1080,
              "variantHeight": 1080,
              "variantType": "GENERATED"
            }
            // Additional variants...
          ]
        } */
      console.log('SIVI_WIDGET_EVENT_DESIGNS_GENERATED event is triggered when designs are generated')
      responseCallback('done')
      break
    }

    default: {
      responseCallback('done')
      break
    }
  }
})

```

### 6. Removing Event Callback

The `removeEventsCallback` method removes the previously registered event callback. This is most often used in the unmount of a container component.

#### Syntax

```javascript
SIVI.removeEventsCallback();
```



## Related Resources

- [Supported Design Types & Subtypes](../sivi-api/common/design-types)
- [Authentication](./authentication.md)
- [Sample Usage](./sample-usage.md)