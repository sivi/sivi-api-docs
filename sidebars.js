// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  // Main sidebar with nested categories for API and SDK
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Sivi UI SDK',
      items: [
        'sivi-ui-sdk/overview',
        'sivi-ui-sdk/installation-config',
        'sivi-ui-sdk/authentication',
        'sivi-ui-sdk/widget-functions-events',
        'sivi-ui-sdk/sample-usage',
        {
          type: 'category',
          label: 'Superuser Features',
          items: [
            'sivi-ui-sdk/superuser-features/overview',
            'sivi-ui-sdk/superuser-features/superuser-installation-config',
            'sivi-ui-sdk/superuser-features/superuser-authentication',
            'sivi-ui-sdk/superuser-features/superuser-widget-functions-events',
            'sivi-ui-sdk/superuser-features/superuser-brand-setup',
            'sivi-ui-sdk/superuser-features/superuser-sample-usage',
            'sivi-ui-sdk/superuser-features/enterprise-onboarding',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Sivi API',
      items: [
        'sivi-api/overview',
        {
          type: 'category',
          label: 'Core API',
          items: [
            'sivi-api/core-api/core-overview',
            {
              type: 'category',
              label: 'Endpoints',
              items: [
                'sivi-api/core-api/designs-from-prompt',
                'sivi-api/core-api/designs-from-content',
                'sivi-api/core-api/content-from-prompt',
                'sivi-api/core-api/get-request-status',
                'sivi-api/core-api/get-design-variants',
                'sivi-api/core-api/update-webhook',
                {
                  type: 'category',
                  label: 'Brand',
                  items: [
                    'sivi-api/core-api/brand/get-brands',
                    'sivi-api/core-api/brand/create-brand',
                    'sivi-api/core-api/brand/extract-brand',
                    'sivi-api/core-api/brand/set-default-brand',
                    'sivi-api/core-api/brand/archive-brand',
                    'sivi-api/core-api/brand/update-brand',
                  ],
                },
                {
                  type: 'category',
                  label: 'Media',
                  items: [
                    'sivi-api/core-api/media/get-media',
                    'sivi-api/core-api/media/create-media',
                    'sivi-api/core-api/media/update-media',
                    'sivi-api/core-api/media/delete-media',
                    'sivi-api/core-api/media/generate-media',
                  ],
                },
                {
                  type: 'category',
                  label: 'Files',
                  items: [
                    'sivi-api/core-api/files/get-presigned-url',
                  ],
                },
                {
                  type: 'category',
                  label: 'Fonts',
                  items: [
                    'sivi-api/core-api/fonts/get-fonts',
                    'sivi-api/core-api/fonts/upload-fonts',
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'User Management API',
          items: [
            'sivi-api/user-management-api/user-overview',
            {
              type: 'category',
              label: 'Endpoints',
              items: [
                'sivi-api/user-management-api/login-user',
                'sivi-api/user-management-api/delete-user',
                // 'sivi-api/user-management-api/update-user-plan',
                // 'sivi-api/user-management-api/set-brand',
                // 'sivi-api/user-management-api/extract-brand',
                // 'sivi-api/user-management-api/reactivate-user',
                // 'sivi-api/swagger/user-management-api',
                'sivi-api/user-management-api/set-user-credit-limit',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Common Reference',
          items: ['sivi-api/common/design-types', 'sivi-api/common/supported-languages', 'sivi-api/common/asset-types', 'sivi-api/common/content-block-types', 'sivi-api/common/brand-persona-details', 'sivi-api/common/media-types', 'sivi-api/common/supported-models', 'sivi-api/common/settings', 'sivi-api/common/quota-and-limits'],
        },
      ],
    },
  ],
}

export default sidebars
