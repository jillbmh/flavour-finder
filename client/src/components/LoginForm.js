import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Player, Controls } from '@lottiefiles/react-lottie-player'
import axios from 'axios'
import LoadingSpinner from '../images/Rolling-1s-200px.svg'

export default function LoginForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const successIconRef = useRef(null)

  const onSubmit = data => {
    const loginUser = async () => {
      document.getElementById('submit-button').style.display = 'none'
      document.getElementById('loading-icon').style.display = 'block'
      try {
        const response = await axios.post('/api/login', data)

        setTimeout(() => {
          console.log(response)
          localStorage.setItem('token', response.data.token)
          console.log(localStorage.getItem('token'))

          document.getElementById('loading-icon').style.display = 'none'
          document.getElementById('success-icon').style.display = 'block'
          successIconRef.current.play()

          setTimeout(() => {
            props.closeModal()
          }, 2000)
        }, 1500)
      } catch (error) {
        console.log(error)
        document.getElementById('loading-icon').style.display = 'none'
        document.getElementById('submit-button').style.display = 'block'
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
        <input placeholder='Email' {...register('email', { required: true })} />
        <input type='password' placeholder='Password' {...register('password', { required: true })} />

        <input id='submit-button' type='submit' value='Log In' />
        <div className='status-icon-container'>
          <Player
            ref={successIconRef}
            id='success-icon'
            keepLastFrame
            src='https://lottie.host/a016ac21-275a-4943-a7c2-a1ff2f38b3e9/IGfJPP0tln.json'
            style={{ height: '32px', width: '32px' }}
          >
            <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
          </Player>
          <img id='loading-icon' src={LoadingSpinner} />
        </div>
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
