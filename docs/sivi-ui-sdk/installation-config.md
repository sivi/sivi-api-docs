---
id: installation-config
title: Installation & Configuration
---

# Installation & Configuration

## Prerequisites
1. **JavaScript**: Your client web application must support JavaScript.
2. **HTTPS**: Your client web application must be served over HTTPS.
3. **DOM Container**: Your client web application must have a DOM container element with an ID attribute. Container should have a minimum of 360px width and 500px height. Widget automatically support mobile and web experience.
4. **Direct script**: Your client web application must embed the Sivi SDK script tag in the HTML is highly recommended than Google Tag Manager like installations as it has UI elements.

### Getting Started

To get started, [sign up for a Sivi account](https://instant.sivi.ai)

## **2. Embed the Sivi's UI SDK Script**
Install the widget script based on your account privileges.

### General
Add the following **script tag** to your application’s HTML, preferably in the `<head>` section :
```html
<script src="https://sdk.sivicloud.com/script.js?namespace=SIVI&accountEmail={accountEmail}"></script>
```

**Replace** `{accountEmail}` with the **Account Email** that you used to sign up for a Sivi account.