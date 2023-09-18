import { useForm } from 'react-hook-form'

export default function RegisterForm(props) {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = data => {
    console.log(data)
    console.log(errors)
  }

  return (
    <>
      <div className='form-container'>
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
      </div>
    </>
  )
}
