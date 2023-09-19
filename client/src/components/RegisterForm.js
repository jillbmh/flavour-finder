import { useForm } from 'react-hook-form'
import { toggleModal } from './Header'

export default function RegisterForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = data => {
    console.log(data)
    console.log(errors)
  }

  return (
    <>
      <p>Sign up to be able to create, share, save and comment on recipes</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder='Username' {...register('username', { required: true, maxLength: 20 })} />
        {errors.username && <span>Username is required</span>}
        <input placeholder='Email' {...register('email', { required: true })} />
        <input placeholder='Password' {...register('password', { required: true, minLength: 8 })} />
        <input placeholder='Password Confirmation' {...register('passwordConfirmation', { required: true })} />

        <input type='submit' value='Sign Up' />
      </form>

      <p>
        {' '}
        Already have an account?{' '}
        <span onClick={props.switchToLogin} className='switch-link'>
          Log in
        </span>
      </p>
    </>
  )
}
