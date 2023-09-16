import { Link } from 'react-router-dom'
import AccountIcon from '../images/account-icon.png'
import SearchIcon from '../images/search-icon.png'
import MenuIcon from '../images/menu-icon.png'
import CloseIcon from '../images/close-icon.png'
import NewLogo from '../images/new-logo.png'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [animation, setAnimation] = useState('none')
  const [openSideMenu, setOpenSideMenu] = useState(false)

  useEffect(() => {
    if (animation === 'shrinking') {
      setTimeout(() => {
        setIsMenuOpen(!isMenuOpen)
        setAnimation('growing')
      }, 200) // 300ms matches the animation duration. Adjust if needed.
    } else if (animation === 'growing') {
      setTimeout(() => {
        setAnimation('none')
      }, 200) // 300ms matches the animation duration. Adjust if needed.
    }
  }, [animation])

  const handleClick = () => {
    setAnimation('shrinking')
    setOpenSideMenu(!openSideMenu)
  }

  return (
    <header>
      {/* MENU ICON */}
      <div className='menu-icon-container'>
        <img
          src={isMenuOpen ? CloseIcon : MenuIcon}
          width={isMenuOpen ? '14px' : '18px'}
          className={`menu-icon ${
            animation === 'shrinking' ? 'shrink-icon' : animation === 'growing' ? 'grow-icon' : ''
          }`}
          onClick={handleClick}
          alt='menu-icon'
        />
      </div>

      {/* LOGO */}
      <Link to='/'>
        <img src={NewLogo} className='logo'></img>
      </Link>

      {/* BUTTONS */}
      <div className='header-buttons'>
        <div className='search-bar'>
          <input type='text' placeholder='Search...' />
          <img src={SearchIcon}></img>
        </div>
        <img src={SearchIcon} className='header-buttons-search'></img>
        <img src={AccountIcon}></img>
      </div>

      {/* MENU */}
      <div className={`side-menu ${openSideMenu ? 'open' : ''}`}>
        <Link to='/recipes'>Recipes</Link>
        <Link to='/blogs'>Blogs</Link>
      </div>
    </header>
  )
}
