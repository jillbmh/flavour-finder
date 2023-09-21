import { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default function AccountModal({ isVisible, closeModal, setIsLoggedIn }) {
  const [isLogin, setIsLogin] = useState(false)

  const switchToRegister = () => {
    setIsLogin(false)
  }

  const switchToLogin = () => {
    setIsLogin(true)
  }

  return (
    <div className={`account-modal-container ${isVisible ? 'open' : ''}`}>
      <div className='form-container'>
        {isLogin ? (
          <LoginForm switchToRegister={switchToRegister} closeModal={closeModal} setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <RegisterForm switchToLogin={switchToLogin} closeModal={closeModal} />
        )}
      </div>
    </div>
  )
}
