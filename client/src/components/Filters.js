import { useState, useRef } from 'react'

export default function Filters({ filter, setFilter }) {
  const [value, setValue] = useState(0)
  const sliderRef = useRef(null)

  const handleInputChange = event => {
    const newValue = event.target.value
    setValue(newValue)
  }

  const handleSliderChange = event => {
    const newValue = event.target.value
    setValue(newValue)
  }

  const sliderValuePosition = () => {
    if (sliderRef.current) {
      const slider = sliderRef.current
      const trackWidth = slider.clientWidth
      const thumbWidth = (slider.clientWidth / (slider.max - slider.min)) * (slider.step || 1)
      const thumbPosition = (value / slider.max) * trackWidth - thumbWidth / 2
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
        <span className='slider-value' style={sliderValuePosition}>
          {value}
        </span>
      </div>
    </div>
  )
}