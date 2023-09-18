import { useForm } from 'react-hook-form'

export default function RegisterForm(props) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const password = watch('password')

  const onSubmit = data => {
    console.log(data)
  }

  return (
    <>
      {/* <h1>Register</h1> */}
      <div className='form-container'>
        <h1>Register</h1>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <input placeholder='Username' {...register('example')} />

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
