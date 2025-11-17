import './App.css'
import React from 'react'
import ConfettiExplosion from 'react-confetti-explosion'

const IFRAME_CONTAINER_ID = 'sivi-container'

const useTemplateLogic = ({ imageUrl, handleVisualClick, shapes }) => {
  const selectedVisual = React.useRef(null)
  const [visualShapes, setVisualShapes] = React.useState(shapes)

  const handleShapeClick = (event, id) => {
    const width = event.target.offsetWidth
    const height = event.target.offsetHeight

    selectedVisual.current = id

    handleVisualClick &&
      handleVisualClick({
        width,
        height,
      })
  }

  React.useEffect(() => {
    if (imageUrl && selectedVisual.current) {
      setVisualShapes((prev) => {
        return {
          ...prev,
          [selectedVisual.current]: {
            imageUrl: imageUrl,
          },
        }
      })
    }
  }, [imageUrl])

  return {
    visualShapes,
    handleShapeClick,
  }
}

const WebTemplate = ({ handleVisualClick, imageUrl }) => {
  const { visualShapes, handleShapeClick } = useTemplateLogic({
    imageUrl,
    handleVisualClick,
    shapes: {
      shape1: {
        url: null,
      },
      shape2: {
        url: null,
      },
    },
  })

  return (
    <div className="w-[600px] h-[700px] bg-gray-100 flex flex-col items-center p-4 gap-4">
      <span className="text-8xl font-bold text-indigo-500 ">Momentum Athletics</span>
      <div className="w-full h-full flex gap-4 flex-row items-center">
        <div onClick={(e) => handleShapeClick(e, 'shape1')} className="cursor-pointer w-1/2 h-full bg-green-200 flex flex-col justify-center items-center">
          {visualShapes.shape1.imageUrl ? (
            <img src={visualShapes.shape1.imageUrl} alt="Extracted Image" className="w-full h-full object-contain" />
          ) : (
            <div className="w-full h-full flex justify-center items-center cursor-pointer">
              <p className="text-gray-500 text-center">Click to add visuals</p>
            </div>
          )}
        </div>
        <div className="w-1/2 h-full flex flex-col items-center">
          <div id="shape2" onClick={(e) => handleShapeClick(e, 'shape2')} className="cursor-pointer w-full h-1/2 bg-blue-200 flex flex-col justify-center items-center">
            {visualShapes.shape2.imageUrl ? (
              <img src={visualShapes.shape2.imageUrl} alt="Extracted Image" className="w-full h-full object-contain" />
            ) : (
              <div className="w-full h-full flex justify-center items-center cursor-pointer">
                <p className="text-gray-500 text-center">Click to add visuals</p>
              </div>
            )}
          </div>
          <div className="w-full h-1/2 flex flex-col justify-center items-center">
            <span className="text-4xl font-bold text-indigo-500 text-center">Transform your fitness journey with expert tips and guided training.</span>
            <span className="text-2xl font-bold text-indigo-500">Ignite your motivation and get stronger every day.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const paramsRef = React.useRef(null) // This pattern is common when you need to "remember" a value across render cycles but don't need that value to trigger re-renders when it changes, which is perfect for storing configuration parameters like the target dimensions for the Sivi widget.
  const [isExploding, setIsExploding] = React.useState(false)
  const [isVisualOpen, setIsVisualOpen] = React.useState(false)
  const [imageUrl, setImageUrl] = React.useState(null)
  const [currentTemplate, setCurrentTemplate] = React.useState(1)

  const handleVisualClick = ({ width, height }) => {
    if (!isVisualOpen) {
      setIsVisualOpen(true)

      paramsRef.current = {
        width,
        height,
      }
    } else {
      const params = {
        type: 'custom',
        subtype: 'custom',
        dimension: {
          width: paramsRef.current.width,
          height: paramsRef.current.height,
        },
      }

      window.SIVI.show(params, IFRAME_CONTAINER_ID)
    }
  }

  React.useEffect(() => {
    if (isVisualOpen) {
      if (paramsRef.current) {
        const params = {
          type: 'custom',
          subtype: 'custom',
          dimension: {
            width: paramsRef.current.width,
            height: paramsRef.current.height,
          },
          prompt: 'Create a modern social media post about sustainable fashion',
          language: 'english',
          colors: ['#5662EC', '#EF9AB2'],
          numOfVariants: 2,
          outputFormat: 'png',
          config: {
            enableDesignEditor: true,
          },
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
          responseCallback('done')
          break
        }
        case 'SIVI_WIDGET_EVENT_INIT': {
          const user = {
            email: 'test@gmail.com',
          }
          const res = await fetch('http://localhost:4000/login-sivi', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user }),
          })
          const data = await res.json()
          responseCallback({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          })
          break
        }
      }
    })
    return () => {
      window.SIVI.removeEventsCallback()
    }
  }, [])

  const TemplateCmp = { 1: WebTemplate }[currentTemplate]

  return (
    <div className="h-full w-full">
      <div className="w-full h-16 border-b-2 border-indigo-500 flex flex-row justify-between items-center px-4">
        <span className="text-2xl font-bold text-indigo-500">Mail Editor</span>
        <div></div>
      </div>
      <div className="flex flex-row h-[calc(100%-4rem)] w-full">
        <div className="w-1/4 h-full border-r-2 border-indigo-500 p-4">
          {isVisualOpen ? (
            <>
              <div id={IFRAME_CONTAINER_ID} className="w-full h-5/6 bg-violet-500 rounded-md border-2 border-indigo-200 overflow-hidden">
                {/* Iframe placeholder */}
              </div>
              <button className="mt-4 w-full h-12 bg-white-500 text-black p-2 rounded-md transition-all duration-300" onClick={handleRemoveVisual}>
                Back to Home
              </button>
            </>
          ) : (
            <div className="flex h-full w-full justify-center items-center">
              <button onClick={() => setIsVisualOpen(true)} className="h-12 w-1/2 bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition-all duration-300">
                AI Design Studio
              </button>
            </div>
          )}
        </div>
        <div className="w-[calc(100%-36rem)] h-full flex justify-center items-center">
          <div className="w-full h-[calc(100%-5rem)] flex justify-center items-center flex-col">
            {isExploding && <ConfettiExplosion />}
            <TemplateCmp handleVisualClick={handleVisualClick} imageUrl={imageUrl} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
