import { Link } from 'react-router-dom'
import { isAuthenticated } from '../utils/auth'

export default function UserDropdown({ isVisible, logOutuser, setUserDropdownVisible }) {
  const userId = isAuthenticated()
  return (
    <div className={`user-dropdown ${isVisible ? 'open' : ''}`}>
      <Link className='nav-link' to={`/user/${userId}`} onClick={() => setUserDropdownVisible(false)}>
        <div className='line-accent'></div>
        <span>My Profile</span>
      </Link>
      <Link className='nav-link' to={`/user/${userId}/create`} onClick={() => setUserDropdownVisible(false)}>
        <div className='line-accent'></div>
        <span>Create Recipe</span>
      </Link>
      <Link className='nav-link' to='/' onClick={logOutuser}>
        <div className='line-accent'></div>
        <span>Log Out</span>
      </Link>
    </div>
  )
}
