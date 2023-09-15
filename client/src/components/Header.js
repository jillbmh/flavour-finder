import { Link } from 'react-router-dom'
import Logo from '../images/logo.png'
import AccountIcon from '../images/account-icon.png'
import SearchIcon from '../images/search-icon.png'
import MenuIcon from '../images/menu-icon.png'
import LogoText from '../images/logo-text.png'

export default function Header() {
  return (
    <header>
      {/* Tablet Up Menu */}
      <div className='tablet-up-menu-items'>
        <Link to='/recipes'>Recipes</Link>
      </div>

      {/* Logo stuff */}
      <Link to='/'>
        <div className='logo-container'>
          <img src={Logo}></img>
          <img src={LogoText}></img>
        </div>
      </Link>

      {/* Icons */}
      <div className='header-buttons-container'>
        <img src={SearchIcon}></img>
        <img src={AccountIcon}></img>
        <img src={MenuIcon} width='18px' className='menu-icon'></img>
      </div>
    </header>
  )
}
