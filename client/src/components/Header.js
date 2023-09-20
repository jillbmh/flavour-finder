import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AccountIcon from '../images/account-icon.png'
import SearchIcon from '../images/search-icon.png'
import MenuIcon from '../images/menu-icon.png'
import CloseIcon from '../images/close-icon.png'
import NewLogo from '../images/new-logo.png'
import ArrowIcon from '../images/arrow-icon.png'
import AccountModal from './AccountModal'

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false)
  const [isUserDropdownVisible, setUserDropdownVisible] = useState(true)
  const [animation, setAnimation] = useState('none')
  const [openSideMenu, setOpenSideMenu] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  useEffect(() => {
    if (animation === 'shrinking') {
      setTimeout(() => {
        setIsMenuOpen(!isMenuOpen)
        setAnimation('growing')
      }, 250)
    } else if (animation === 'growing') {
      setTimeout(() => {
        setAnimation('none')
      }, 250)
    }
  }, [animation])

  const handleClick = () => {
    setAnimation('shrinking')
    if (isModalVisible) {
      setTimeout(() => setOpenSideMenu(!openSideMenu), 500)
      setModalVisible(false)
    } else {
      setOpenSideMenu(!openSideMenu)
    }
  }

  const toggleModal = () => {
    if (isLoggedIn) {
      setUserDropdownVisible(!isUserDropdownVisible)
      return
    }
    if (isMenuOpen) {
      setOpenSideMenu(false)
      setTimeout(() => setModalVisible(!isModalVisible), 400)
      setAnimation('shrinking')
    } else {
      setModalVisible(!isModalVisible)
    }
  }
  
  const UserDropdown = () => {
    return (
      <div className='user-dropdown'>
        <Link to='/my-recipes/:userId'>My Recipes</Link>
        <Link to='/my-account/:userId'>My Account</Link>
        <Link to='/'>Log Out</Link>
      </div>
    )
  }

  return (
    <>
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
        <Link
          to='/'
          onClick={() => {
            if (openSideMenu) setAnimation('shrinking')
            setOpenSideMenu(false)
            setModalVisible(false)
          }}
        >
          <img src={NewLogo} className='logo' />
        </Link>

        {/* BUTTONS */}
        <div className='header-buttons'>
          <div className='search-bar'>
            <input type='text' placeholder='Search...' />
            <img src={SearchIcon}></img>
          </div>
          <img src={SearchIcon} className='header-buttons-search' />
          <img src={AccountIcon} onClick={toggleModal} />
        </div>
      </header>

      {/* MENU */}
      <div className={`side-menu ${openSideMenu ? 'open' : ''}`}>
        <Link
          to='/recipes'
          onClick={() => {
            if (openSideMenu) setAnimation('shrinking')
            setOpenSideMenu(false)
            setModalVisible(false)
          }}
        >
          <span>Recipes</span>
          <img src={ArrowIcon} height='13px' />
        </Link>
        <Link
          to='/blogs'
          onClick={() => {
            if (openSideMenu) setAnimation('shrinking')
            setOpenSideMenu(false)
            setModalVisible(false)
          }}
        >
          <span>Blogs</span>
          <img src={ArrowIcon} height='13px' />
        </Link>
      </div>

      {isLoggedIn && isUserDropdownVisible && <UserDropdown />}

      <AccountModal isVisible={isModalVisible} closeModal={toggleModal} />
    </>
  )
}