import { Link } from 'react-router-dom'

export default function Featured() {
  return (
    <main className="featured-container">
      <Link to="/recipes/type/starter">
        <h4>Show Stopping Starters!</h4>
      </Link>

    </main>
  )
}
