---
id: superuser-widget-functions-events
title: Widget Functions & Events
---

# Widget Functions & Events

The widget functions and events for superusers are identical to the general SDK implementation. All core functions (`show()`, `hide()`, `setOptions()`, `openDesignVariantEditor()`, `events()`, `removeEventsCallback()`) and event handling work the same way.

**Key considerations for superusers:**
- Superuser authentication flows via `SIVI_WIDGET_EVENT_NEED_AUTH` and `SIVI_WIDGET_EVENT_LOGIN_CTA` events
- Enhanced control over `enableLoginUI` configuration
- Access to all design editor capabilities

<div>
For complete documentation, refer to <a href="../widget-functions-events" target="_blank">Widget Functions & Events</a>
</div>

## Superuser-Specific Notes

- **Authentication**: Superuser can handle authentication programmatically through events rather than redirection end-user to Sivi's login page
- **Brand Setup**: Pre-populate user brand details via API to skip widget onboarding flows
