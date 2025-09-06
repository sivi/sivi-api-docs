---
id: sample-usage
title: Sample Usage
---

# Sivi UI SDK Sample Implementation

This guide demonstrates a complete implementation of the Sivi UI SDK in a React application. The sample shows how to integrate the Sivi design generation capabilities into a content editor application like Website builders, CMS, Email editors, Banner editors and so on, allowing users to generate and place designs directly within content templates.

## Overview

This sample implements a simplified content editor with the following features:
- A template with placeholders for design elements
- Integration with the Sivi UI SDK for AI-powered design generation
- Ability to select generated designs and place them in the template
- Celebration animation when designs are selected. <span style={{fontSize: 20}} role="img" aria-label="confetti emoji">&#127882;</span>

## Implementation Breakdown

### 1. Setup and Constants

```javascript
import './App.css'
import React from 'react'
import ConfettiExplosion from 'react-confetti-explosion';

const IFRAME_CONTAINER_ID = 'sivi-container'
```

This section imports the required dependencies and defines the container ID where the Sivi widget will be embedded.

### 2. Template Logic Hook

```javascript
const useTemplateLogic = ({ imageUrl, handleVisualClick, shapes }) => {
  const selectedVisual = React.useRef(null)
  const [visualShapes, setVisualShapes] = React.useState(shapes)

  const handleShapeClick = (event, id) => {
    const width = event.target.offsetWidth
    const height = event.target.offsetHeight

    selectedVisual.current = id

    handleVisualClick && handleVisualClick({
      width,
      height
    })
  }

  React.useEffect(() => {
    if (imageUrl && selectedVisual.current) {
      setVisualShapes(prev => {
        return {
          ...prev,
          [selectedVisual.current]: {
            imageUrl: imageUrl
          }
        }
      })
    }
  }, [imageUrl])

  return {
    visualShapes,
    handleShapeClick
  }
}
```

**What This Does:**
- Creates a custom hook to manage the template's design placement logic
- Tracks which placeholder is currently selected using a React ref
- Updates the appropriate placeholder when a new design is selected
- Provides dimensions of the selected area to the Sivi widget for appropriate sizing

### 3. Template Component

```javascript
const WebTemplate = ({ handleVisualClick, imageUrl }) => {
  const { visualShapes, handleShapeClick } = useTemplateLogic({
    imageUrl,
    handleVisualClick,
    shapes: {
      shape1: {
        url: null
      },
      shape2: {
        url: null
      }
    }
  })

  return (
    <div className='w-[600px] h-[700px] bg-gray-100 flex flex-col items-center p-4 gap-4'>
      <span className='text-8xl font-bold text-indigo-500'>
        Momentum Athletics
      </span>
      <div className='w-full h-full flex gap-4 flex-row items-center'>
        <div onClick={(e) => handleShapeClick(e, 'shape1')} className='cursor-pointer w-1/2 h-full bg-green-200 flex flex-col justify-center items-center'>
          {visualShapes.shape1.imageUrl ? 
            <img src={visualShapes.shape1.imageUrl} alt="Extracted Image" className='w-full h-full object-contain' /> : (
            <div className='w-full h-full flex justify-center items-center cursor-pointer'>
              <p className='text-gray-500 text-center'>Click to add visuals</p>
            </div>
          )}
        </div>
        <div className='w-1/2 h-full flex flex-col items-center'>
          <div id="shape2" onClick={(e) => handleShapeClick(e, 'shape2')} className='cursor-pointer w-full h-1/2 bg-blue-200 flex flex-col justify-center items-center'>
            {visualShapes.shape2.imageUrl ? 
              <img src={visualShapes.shape2.imageUrl} alt="Extracted Image" className='w-full h-full object-contain' /> : (
              <div className='w-full h-full flex justify-center items-center cursor-pointer'>
                <p className='text-gray-500 text-center'>Click to add visuals</p>
              </div>
            )}
          </div>
          <div className='w-full h-1/2 flex flex-col justify-center items-center'>
            <span className='text-4xl font-bold text-indigo-500 text-center'>
              Transform your fitness journey with expert tips and guided training.
            </span>
            <span className='text-2xl font-bold text-indigo-500'>
              Ignite your motivation and get stronger every day.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
```

**What This Does:**
- Renders a marketing template with placeholders for designs
- Uses the template logic hook to manage state and handle interactions
- Displays placeholders with "Click to add visuals" text when empty
- Shows the selected designs when available

### 4. Main Application Component

```javascript
function App() {
  let paramsRef = React.useRef(null)
  const [isExploding, setIsExploding] = React.useState(false);
  const [isVisualOpen, setIsVisualOpen] = React.useState(false)
  const [imageUrl, setImageUrl] = React.useState(null)
  const [currentTemplate, setCurrentTemplate] = React.useState(1)

  const handleVisualClick = ({ width, height }) => {
    if (!isVisualOpen) {
      setIsVisualOpen(true)

      paramsRef.current = {
        width,
        height
      }
    } else {
      const params = {
        type: "custom",
        subtype: "custom",
        dimension: {
          width: paramsRef.current.width,
          height: paramsRef.current.height
        },
      }

      window.SIVI.show(params, IFRAME_CONTAINER_ID)
    }
  }
```

**What This Does:**
- Sets up state management for the application
- Handles clicks on template placeholders
- Stores dimensions of clicked areas for the Sivi widget configuration

### 5. Sivi Widget Initialization

```javascript
  React.useEffect(() => {
    if (isVisualOpen) {
      if (paramsRef.current) {
        const params = {
          type: "custom",
          subtype: "custom",
          dimension: {
            width: paramsRef.current.width,
            height: paramsRef.current.height
          },
          prompt: "Create a modern social media post about sustainable fashion",
          language: "english",
          colors: ["#5662EC", "#EF9AB2"],
          numOfVariants: 2,
          outputFormat: "png",
          config: {
            enableDesignEditor: true,
          }
        }

        window.SIVI.show(params, IFRAME_CONTAINER_ID)
        paramsRef.current = null
      } else {
        window.SIVI.show(false, IFRAME_CONTAINER_ID)
      }
    }
  }, [isVisualOpen])

  const handleRemoveVisual = () => {
    window.SIVI.hide()
    setIsVisualOpen(false)
  }
```

**What This Does:**
- Initializes the Sivi widget when the visual editor should be opened
- Configures the widget with appropriate dimensions and parameters
- Sets up a default prompt and styling options
- Provides a method to close the widget and return to the main interface

### 6. Event Handling

```javascript
  React.useEffect(() => {
    window.SIVI.events(async (event, responseCallback) => {
      switch (event.type) {
        case 'SIVI_WIDGET_EVENT_DESIGN_VARIANT_SELECTED': {
          const URL = event.data.variantImageUrl + '?timestamp=' + Date.now()
          setIsExploding(true)
          setTimeout(() => {
            setIsExploding(false)
          }, 2000)
          setImageUrl(URL)
          responseCallback("done")
          break
        }
      }
    })
    return () => {
      window.SIVI.removeEventsCallback()
    }
  }, [])
```

**What This Does:**
- Sets up event listeners for the Sivi widget
- Handles the 'SIVI_WIDGET_EVENT_DESIGN_VARIANT_SELECTED' event when a user selects a design
- Updates the application state with the selected design URL
- Triggers a confetti animation to celebrate design selection
- Properly cleans up event listeners when the component unmounts

### 7. Application UI Rendering

```javascript
  const TemplateCmp = ({ 1: WebTemplate })[currentTemplate]

  return (
    <div className='h-full w-full'>
      <div className='w-full h-16 border-b-2 border-indigo-500 flex flex-row justify-between items-center px-4'>
        <span className='text-2xl font-bold text-indigo-500'>
          Mail Editor
        </span>
        <div></div>
      </div>
      <div className='flex flex-row h-[calc(100%-4rem)] w-full'>
        <div className='w-1/4 h-full border-r-2 border-indigo-500 p-4'>
          {isVisualOpen ? (
            <>
              <div id={IFRAME_CONTAINER_ID} className='w-full h-5/6 bg-violet-500 rounded-md border-2 border-indigo-200 overflow-hidden'>
                {/* Iframe placeholder */}
              </div>
              <button className='mt-4 w-full h-12 bg-white-500 text-black p-2 rounded-md transition-all duration-300' onClick={handleRemoveVisual}>
                Back to Home
              </button>
            </>
          ) : <div className='flex h-full w-full justify-center items-center'>
            <button onClick={() => setIsVisualOpen(true)} className='h-12 w-1/2 bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition-all duration-300'>
              AI Design Studio
            </button>
          </div>}
        </div>
        <div className='w-[calc(100%-36rem)] h-full flex justify-center items-center'>
          <div className='w-full h-[calc(100%-5rem)] flex justify-center items-center flex-col'>
            {isExploding && <ConfettiExplosion />}
            <TemplateCmp handleVisualClick={handleVisualClick} imageUrl={imageUrl} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
```

**What This Does:**
- Renders the complete application interface with a header and two-panel layout
- Shows either the launch button or the Sivi widget in the left panel
- Displays the content template in the main panel
- Includes the confetti animation when designs are selected


<!-- Complete boilerplate can be [downloaded from here](/samples/sivi-ui-sdk-general-1.4.0.zip) -->


## Superuser Implementation

For superuser-specific implementation examples, including authentication and user management, see the [Superuser Features Sample Usage](./superuser-features/superuser-sample-usage.md).