import { Link } from 'react-router-dom'
import Logo from '../images/logo.png'
import AccountIcon from '../images/account-icon.png'
import MenuIcon from '../images/menu-icon.png'
import LogoText from '../images/logo-text.png'

export default function Header() {
  return (
    <header>
      <img src={MenuIcon} width="20px"></img>
      <Link to='/'>
        <div className="logo-container">
          <img src={Logo} height="26px"></img>
          <img src={LogoText} height="10px"></img>
          {/* <span>Flavour Finder</span> */}
        </div>
      </Link>
      <img src={AccountIcon} width="16px"></img>
    </header>
  )
}