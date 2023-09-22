import { useForm } from 'react-hook-form'
import { toggleModal } from './Header'
import axios from 'axios'
import ErrorIcon  from '../images/error.png'

export default function RegisterForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm()

  const onSubmit = data => {
    props.switchToLogin()
    const createAccount = async () => {
      document.getElementsByClassName('submit-button')[0].style.display = 'none'
      try {
        const response = await axios.post('/api/register', data)
        console.log(response)
      } catch (error) {
        if (error.response.data.code === 11000) {
          if (Object.keys(error.response.data.keyValue).find(item => item === 'username')) {
            setError('username', {
              type: 'duplicate',
              message: 'Username already taken',
            })
          }
          
          if (Object.keys(error.response.data.keyValue).find(item => item === 'email')) {
            setError('email', {
              type: 'duplicate',
              message: 'Email already taken',
            })
          }
        }
        document.getElementsByClassName('submit-button')[0].style.display = null
      }
    }

    createAccount()
  }

  return (
    <>
      <div className='heading-container'>
        <h1>Sign Up</h1>
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

      <p>Sign up to be able to create, share, save and comment on recipes</p>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <input placeholder='Username' {...register('username', { required: true, maxLength: 20 })} />
        {errors.username && errors.username.type === 'required' && (
          <div className='error'>
            <img src={ErrorIcon} width='15px' />
            <p>Username is required</p>
          </div>
        )}
        {errors.username && errors.username.type === 'maxLength' && (
          <div className='error'>
            <img src={ErrorIcon} width='15px' />
            <p>Username must be less than 20 characters</p>
          </div>
        )}
        {errors.username && errors.username.type === 'duplicate' && (
          <div className='error'>
            <img src={ErrorIcon} width='15px' />
            <p>{errors.username.message}</p>
          </div>
        )}

        <input
          placeholder='Email'
          {...register('email', { required: true, pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i })}
        />
        {errors.email && errors.email.type === 'required' && (
          <div className='error'>
            <img src={ErrorIcon} width='15px' />
            <p>Email is required</p>
          </div>
        )}
        {errors.email && errors.email.type === 'pattern' && (
          <div className='error'>
            <img src={ErrorIcon} width='15px' />
            <p>Please check your email format</p>
          </div>
        )}
        {errors.email && errors.email.type === 'duplicate' && (
          <div className='error'>
            <img src={ErrorIcon} width='15px' />
            <p>{errors.email.message}</p>
          </div>
        )}

        <input type='password' placeholder='Password' {...register('password', { required: true, minLength: 4 })} />
        {errors.password && errors.password.type === 'required' && (
          <div className='error'>
            <img src={ErrorIcon} width='15px' />
            <p>Password is required</p>
          </div>
        )}
        {errors.password && errors.password.type === 'minLength' && (
          <div className='error'>
            <img src={ErrorIcon} width='15px' />
            <p>Password must be at least 4 characters</p>
          </div>
        )}

        <input
          type='password'
          placeholder='Password Confirmation'
          {...register('passwordConfirmation', { required: true })}
        />
        {errors.passwordConfirmation && (
          <div className='error'>
            <img src={ErrorIcon} width='15px' />
            <p>Password confirmation is required</p>
          </div>
        )}

        <input className='submit-button' type='submit' value='Sign Up' />
      </form>

      <p>
        Already have an account?{' '}
        <span onClick={props.switchToLogin} className='switch-link'>
          Log in
        </span>
      </p>
    </>
  )
}
