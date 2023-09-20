import { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Illustration from '../images/chef-illustration.png'
import RecipeUploadIllustration from '../images/upload-illustration.png'

export default function AccountModal({ isVisible, closeModal }) {
  const [isLogin, setIsLogin] = useState(true)

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
          <LoginForm switchToRegister={switchToRegister} closeModal={closeModal} />
        ) : (
          <RegisterForm switchToLogin={switchToLogin} closeModal={closeModal} />
        )}
      </div>
    </div>
  )
}
