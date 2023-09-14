import { Link } from 'react-router-dom'
import Logo from '../images/logo.png'

export default function Header() {
  return (
    <header>
      <span>Burger Menu Icon</span>
      <Link to='/'>
        <img src={Logo}></img>
      </Link>
      <span>Account Person Guy Icon</span>
    </header>
  )
}