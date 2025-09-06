---
id: overview
title: Overview  
---

## Data Flow

![Sivi Widget Architecture](/img/sivi_widget_architecture.jpg)

The diagram illustrates the authentication and design generation flow for the Sivi UI SDK in a superuser integration scenario:

1. **User to your Web App**: Users interact with your web application where the Sivi Widget is embedded.

2. **Authentication Flow (Steps 1-4)**:
   - (1) Your web app requests Sivi tokens for authentication
   - (2) Your app server uses Sivi's API Key to request tokens for your users
   - (3) Sivi App Server validates and processes the authentication request
   - (4) Authentication tokens are returned to your web application
   - (5) Your web application provides them to the Sivi Widget and Widget takes care of refresh

3. **Design Generation (Step 5)**:
   - Using the authenticated token, users can interact with the Sivi Widget
   - The widget enables users to send design generation requests directly to the Sivi App Server
   - Users can submit their prompts and content through the widget interface
   
This architecture ensures secure, seamless integration while maintaining separation between your user management and Sivi's design services. The machine-to-machine authentication eliminates the need for users to create separate Sivi accounts.


## **Security Considerations**

- **Token Expiry**: The **access token** will expire after a short period to prevent reuse.
- **Secure Storage**: The **Sivi API Key** should be stored securely in **Your App Server** and never exposed to clients.
- **HTTPS Communication**: All requests must be encrypted via HTTPS to protect data integrity.
- **User Isolation**: Each design request is tied to an **abstract user ID**, preventing unauthorized access to other users data.

## Related Sections

- [Installation](./superuser-installation-config)
- [Authentication](./superuser-authentication)
- [Widget functions & events](./superuser-widget-functions-events)
- [Brand Setup](./superuser-brand-setup)



