import { Link } from 'react-router-dom'
import Logo from '../images/logo.png'
import AccountIcon from '../images/account-icon.png'
import SearchIcon from '../images/search-icon.png'
import MenuIcon from '../images/menu-icon.png'
import LogoText from '../images/logo-text.png'
import NewLogo from '../images/new-logo.png'

export default function Header() {
  return (
    <header>
      {/* Tablet Up Menu */}
      <div className='tablet-up-menu-items'>
        <Link to='/recipes'>Recipes</Link>
      </div>

      {/* Logo stuff */}
      <Link to='/'>
        {/* <div className='logo-container'>
          <img src={Logo}></img>
          <img src={LogoText}></img>
        </div> */}
        <img src={NewLogo}></img>
      </Link>

      {/* Icons */}
      <div className='header-buttons'>
        <div className='search-bar'>
          <input type='text' />
          <img src={SearchIcon}></img>
        </div>
        <img src={SearchIcon} className='header-buttons-search'></img>
        <img src={AccountIcon}></img>
        <img src={MenuIcon} width='18px' className='menu-icon'></img>
      </div>
    </header>
  )
}
