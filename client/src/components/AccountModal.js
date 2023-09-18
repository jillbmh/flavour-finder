import { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Illustration from '../images/chef-illustration.png'


export default function AccountModal({ isVisible, closeModal }) {
  const [isLogin, setIsLogin] = useState(false)

  const switchToRegister = () => {
    setIsLogin(false)
  }

  const switchToLogin = () => {
    setIsLogin(true)
  }

  return (
    <div className={`account-modal-container ${isVisible ? 'open' : ''}`}>
      <img src={Illustration} width='480px' />
      <div className='form-and-title-container'>
        {isLogin ? <LoginForm switchToRegister={switchToRegister} /> : <RegisterForm switchToLogin={switchToLogin} />}
      </div>
    </div>
  )
}
