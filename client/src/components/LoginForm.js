import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Player, Controls } from '@lottiefiles/react-lottie-player'
import axios from 'axios'
import LoadingSpinner from '../images/Rolling-1s-200px.svg'
import ErrorIcon from '../images/error.png'
// import { Navigate } from 'react-router-dom'

export default function LoginForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    clearErrors,
  } = useForm()

  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const successIconRef = useRef(null)

  const onSubmit = data => {
    setIsLoading(true)

    const loginUser = async () => {
      try {
        const response = await axios.post('/api/login', data)

        console.log(response)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('username', response.data.username)
        localStorage.setItem('userId', response.data.userId)
        props.setUserId(response.data.userId)

        setTimeout(() => {
          setIsLoading(false)
          setShowSuccess(true)

          setTimeout(() => {
            props.closeModal()
            props.setIsLoggedIn(true)

            setTimeout(() => {
              setShowSuccess(false)
            }, 250)
          }, 1600)
        }, 1000)
      } catch (error) {
        console.log(error)
        // reset()
        setIsLoading(false)
        setError('loginFailed', {
          type: 'loginFailed',
          message: 'The email address or password is incorrect',
        })
      }
    }

    loginUser()
  }

  return (
    <>
      <div className='heading-container'>
        <h1>Login</h1>
        <button onClick={props.closeModal}>
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

      <div className='welcome-back-container'>
        <p>Welcome back!</p>
        <Player
          autoplay
          loop
          src='https://lottie.host/80783cd9-26e4-4e23-8b4b-25925db6efda/cQzQqQiozx.json'
          style={{ height: '22px', width: '22px' }}
        >
          <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
        </Player>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <input placeholder='Email' {...register('email', { required: true })} onChange={() => clearErrors('loginFailed')}/>
        <input type='password' placeholder='Password' {...register('password', { required: true })} onChange={() => clearErrors('loginFailed')} />
        {errors.loginFailed && errors.loginFailed.type === 'loginFailed' && (
          <div className='error'>
            <img src={ErrorIcon} width='15px' />
            <p>{errors.loginFailed.message}</p>
          </div>
        )}

        {isLoading ? (
          <div className='status-icon-container'>
            <img id='loading-icon' src={LoadingSpinner} />
          </div>
        ) : showSuccess ? (
          <div className='status-icon-container'>
            <Player
              ref={successIconRef}
              id='success-icon'
              autoplay
              keepLastFrame
              src='https://lottie.host/a016ac21-275a-4943-a7c2-a1ff2f38b3e9/IGfJPP0tln.json'
              style={{ height: '32px', width: '32px' }}
            >
              <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
            </Player>
          </div>
        ) : (
          <input id='submit-button' type='submit' value='Log In' />
        )}
      </form>

      <p>
        Don&apos;t have an account yet?{' '}
        <span onClick={props.switchToRegister} className='switch-link'>
          Sign up
        </span>
      </p>
    </>
  )
}
