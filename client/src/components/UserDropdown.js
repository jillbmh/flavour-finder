import { Link } from 'react-router-dom'

export default function UserDropdown({ isVisible, logOutuser }) {
  return (
    <div className={`user-dropdown ${isVisible ? 'open' : ''}`}>
      <Link className='nav-link' to='/my-recipes/:userId'>
        <div className='line-accent'></div>
        <span>My Profile</span>
      </Link>
      <Link className='nav-link' to='/my-account/:userId'>
        <div className='line-accent'></div>
        <span>My Recipes</span>
      </Link>
      <Link className='nav-link' to='/' onClick={logOutuser}>
        <div className='line-accent'></div>
        <span>Log Out</span>
      </Link>
    </div>
  )
}
