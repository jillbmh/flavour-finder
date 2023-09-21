import SliderMarker from '../images/speech-bubble.png'

export default function Filters({ filter, setFilter }) {
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
    </div>
  )
}
