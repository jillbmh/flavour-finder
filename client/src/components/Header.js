import { Link } from 'react-router-dom'
import AccountIcon from '../images/account-icon.png'
import SearchIcon from '../images/search-icon.png'
import MenuIcon from '../images/menu-icon.png'
import CloseIcon from '../images/close-icon.png'
import NewLogo from '../images/new-logo.png'
import ArrowIcon from '../images/arrow-icon.png'
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
      }, 250) // 300ms matches the animation duration. Adjust if needed.
    } else if (animation === 'growing') {
      setTimeout(() => {
        setAnimation('none')
      }, 250) // 300ms matches the animation duration. Adjust if needed.
    }
  }, [animation])

  const handleClick = () => {
    setAnimation('shrinking')
    setOpenSideMenu(!openSideMenu)
  }

  return (
    <div className='header-menu-container'>
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
      </header>
      {/* MENU */}
      <div className='side-menu-container'>
        <div className={`side-menu ${openSideMenu ? 'open' : ''}`}>
          <Link to='/recipes'>
            <span>Recipes</span>
            <img src={ArrowIcon} height='13px' />
          </Link>
          <Link to='/blogs'>
            <span>Blogs</span>
            <img src={ArrowIcon} height='13px' />
          </Link>
        </div>
      </div>
    </div>
  )
}
