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
      <div className='form-container'>
        <div className='heading-container'>
          <h1>Register</h1>
          <button onClick={closeModal}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon icon-tabler icon-tabler-x'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='#f7f3e8'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M18 6l-12 12' />
              <path d='M6 6l12 12' />
            </svg>
          </button>
        </div>
        {isLogin ? <LoginForm switchToRegister={switchToRegister} /> : <RegisterForm switchToLogin={switchToLogin} />}
      </div>
    </div>
  )
}
