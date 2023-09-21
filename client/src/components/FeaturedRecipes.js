import { Link } from 'react-router-dom'

export default function Featured() {
  return (
    <main className="featured-container">
      <Link to="/recipes/type/starter">
        <img 
          src='https://res.cloudinary.com/dlcb7n93a/image/upload/v1694916676/flavour-finder/7032138-3b643290901d4283963338d37a5e557e_xhizbv.jpg' 
          alt='Show stopping starters'
        />
        <p>Show Stopping Starters!</p>
      </Link>
    </main>
  )
}
