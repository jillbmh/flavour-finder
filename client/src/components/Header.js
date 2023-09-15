import { Link } from 'react-router-dom'
import Logo from '../images/logo.png'
import AccountIcon from '../images/account-icon.png'
import SearchIcon from '../images/search-icon.png'
import MenuIcon from '../images/menu-icon.png'
import LogoText from '../images/logo-text.png'

export default function Header() {
  return (
    <header>
      <Link to='/'>
        <div className='logo-container'>
          <img src={Logo} height='22px'></img>
          <img src={LogoText} height='20px'></img>
        </div>
      </Link>
      <div className='header-buttons-container'>
        <img src={SearchIcon} height='16px'></img>
        <img src={AccountIcon} height='16px'></img>
        <img src={MenuIcon} height='14px' width='18px'></img>
      </div>
    </header>
  )
}
