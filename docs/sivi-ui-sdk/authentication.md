---
id: authentication
---

# Authentication

This document explains how authentication works with the Sivi UI SDK and provides examples for general implementations.

## Authentication Methods Overview

Sivi UI SDK supports two authentication approaches:

1. **Standard UI SDK Authentication** - Default authentication flow with login UI. User will be redirected to Sivi's login page.
2. **Superuser Authentication** - Frictionless machine-to-machine authentication without end-user intervention. Refer [Superuser Authentication](./superuser-features/superuser-authentication) for more details.

## 1. Standard UI SDK Authentication [Automatic]

Standard implementations is the defualt authentication method and it is fully automatic. 

The authentication process follows these steps:
1. When your application first loads the Sivi widget, it displays a **"Get Started"** button
2. When users click this button, they are redirected to [instant.sivi.ai](https://instant.sivi.ai/) in a new tab
3. Users complete the login/signup process
4. Upon successful authentication, the widget receives access and refresh tokens
5. The authentication state is maintained across sessions via browser storage by the widget


## Security Best Practices

1. **Never expose your API Key** in client-side code
2. **Always authenticate users** on your backend server
3. **Use HTTPS** for all API calls

For more details on superuser features, see the [Superuser Features documentation](./superuser-features/overview).