import { useState, useEffect, useRef } from 'react'
import SliderMarker from '../images/speech-bubble.png'

export default function Filters({ filter, setFilter }) {
  const [value, setValue] = useState(0)
  const [isMarkerVisible, setIsMarkerVisible] = useState(false) // Add this line
  const sliderRef = useRef(null)
  const hideTimeout = useRef(null) // Reference for the timeout

  const handleSliderChange = event => {
    const newValue = event.target.value
    setValue(newValue)
  }

  useEffect(() => {
    const showMarker = () => {
      setIsMarkerVisible(true)
      clearTimeout(hideTimeout.current) // Clear any ongoing timeout
    }

    const hideMarkerAfterDelay = () => {
      clearTimeout(hideTimeout.current) // Clear any ongoing timeout
      hideTimeout.current = setTimeout(() => {
        setIsMarkerVisible(false)
      }, 500)
    }

    const slider = sliderRef.current
    if (slider) {
      slider.addEventListener('mousedown', showMarker)
      slider.addEventListener('mouseup', hideMarkerAfterDelay)

      // Add these if you want to support touch devices
      slider.addEventListener('touchstart', showMarker)
      slider.addEventListener('touchend', hideMarkerAfterDelay)
    }

    return () => {
      if (slider) {
        slider.removeEventListener('mousedown', showMarker)
        slider.removeEventListener('mouseup', hideMarkerAfterDelay)

        // For touch devices
        slider.removeEventListener('touchstart', showMarker)
        slider.removeEventListener('touchend', hideMarkerAfterDelay)
      }
    }
  }, [])

  const sliderValuePosition = () => {
    if (sliderRef.current) {
      const slider = sliderRef.current
      const min = parseInt(slider.min, 10)
      const max = parseInt(slider.max, 10)
      const val = parseInt(value, 10)

      const percentage = (val - min) / (max - min)

      const trackWidth = slider.clientWidth

      const thumbWidth = 16

      const thumbPosition = percentage * (trackWidth - thumbWidth)
      return { left: `${thumbPosition}px` }
    }
    return { left: '0' }
  }

  return (
    <div className='filters-container'>
      <select value={filter.cuisine} onChange={e => setFilter(prev => ({ ...prev, cuisine: e.target.value }))}>
        <option value=''>All Cuisines</option>
        <option value='italian'>Italian</option>
        <option value='japanese'>Japanese</option>
        <option value='chinese'>Chinese</option>
        <option value='indian'>Indian</option>
        <option value='thai'>Thai</option>
        <option value='mexican'>Mexican</option>
        <option value='american'>American</option>
        <option value='british'>British</option>
        <option value='spanish'>Spanish</option>
        <option value='korean'>Korean</option>
        <option value='vietnamese'>Vietnamese</option>
        <option value='asian'>Asian</option>
      </select>

      <select value={filter.type} onChange={e => setFilter(prev => ({ ...prev, type: e.target.value }))}>
        <option value=''>All Meal Types</option>
        <option value='starter'>Starter</option>
        <option value='main'>Main</option>
        <option value='side'>Side</option>
        <option value='dessert'>Dessert</option>
      </select>

      <div className='slider-container'>
        <label htmlFor='spiceLevel'>Spice Level</label>
        <input
          id='spiceLevel'
          ref={sliderRef}
          type='range'
          name='spiceLevel'
          min='0'
          max='5'
          value={value}
          onChange={handleSliderChange}
        />

        <div className={`slider-marker ${isMarkerVisible ? 'visible' : ''}`} style={sliderValuePosition()}>
          <img src={SliderMarker} alt='Slider Marker' />
          <span className='slider-value'>{value}</span>
        </div>
      </div>
    </div>
  )
}
