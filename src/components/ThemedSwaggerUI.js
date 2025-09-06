import React from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import { useColorMode } from '@docusaurus/theme-common'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

export default function ThemedSwaggerUI(props) {
  const { colorMode } = useColorMode()
  const isDarkTheme = colorMode === 'dark'

  // Custom styles for dark mode
  const darkModeStyles = `
    .swagger-ui {
      color: #f5f6f7; /* Light text for dark background */
    }
    .swagger-ui .info .title,
    .swagger-ui .info h1, 
    .swagger-ui .info h2, 
    .swagger-ui .info h3, 
    .swagger-ui .info h4, 
    .swagger-ui .info h5, 
    .swagger-ui .opblock-tag,
    .swagger-ui .opblock .opblock-summary-operation-id, 
    .swagger-ui .opblock .opblock-summary-path,
    .swagger-ui .opblock .opblock-summary-path__deprecated,
    .swagger-ui .opblock .opblock-summary-description,
    .swagger-ui .tab a,
    .swagger-ui table thead tr th,
    .swagger-ui .parameter__name,
    .swagger-ui .parameter__type,
    .swagger-ui .response-col_status,
    .swagger-ui .response-col_description,
    .swagger-ui .responses-inner h4,
    .swagger-ui .responses-inner h5,
    .swagger-ui .model-title,
    .swagger-ui .model {
      color: #f5f6f7;
    }
    
    .swagger-ui .scheme-container {
      background-color: #2d333b;
    }
    
    .swagger-ui .opblock {
      background-color: #2d333b;
      border-color: #444c56;
    }
    
    .swagger-ui .opblock .opblock-summary {
      border-color: #444c56;
    }
    
    .swagger-ui .opblock-description-wrapper, 
    .swagger-ui .opblock-external-docs-wrapper, 
    .swagger-ui .opblock-title_normal {
      background-color: #22272e;
      color: #f5f6f7;
    }
    
    .swagger-ui .opblock .opblock-section-header {
      background-color: #22272e;
      border-color: #444c56;
    }
    
    .swagger-ui .try-out__btn {
      color: #f5f6f7;
    }
    
    .swagger-ui .btn {
      background-color: #22272e;
      color: #f5f6f7;
    }
    
    .swagger-ui select {
      background-color: #22272e;
      color: #f5f6f7;
      border-color: #444c56;
    }
    
    .swagger-ui input[type=text], 
    .swagger-ui textarea {
      background-color: #22272e;
      color: #f5f6f7;
      border-color: #444c56;
    }
    
    .swagger-ui .markdown p, 
    .swagger-ui .markdown li {
      color: #f5f6f7;
    }
    
    .swagger-ui .model-box {
      background-color: #22272e;
      border-color: #444c56;
    }
    
    .swagger-ui .topbar {
      background-color: #2d333b;
    }
    
    .swagger-ui .table-container {
      background-color: #22272e;
    }
    
    .swagger-ui table tbody tr td {
      border-color: #444c56;
      color: #f5f6f7;
    }
    
    .swagger-ui section.models {
      border-color: #444c56;
    }
    
    .swagger-ui section.models .model-container {
      background-color: #22272e;
      border-color: #444c56;
    }
    
    .swagger-ui .servers-title,
    .swagger-ui .servers > label {
      color: #f5f6f7;
    }
  `

  return (
    <div className="themed-swagger-ui">
      {isDarkTheme && <style>{darkModeStyles}</style>}
      <SwaggerUI {...props} />
    </div>
  )
}
