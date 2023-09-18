// import { useForm } from 'react-hook-form'

export default function LoginForm(props) {
  // const { register, handleSubmit, errors } = useForm()

  // const onSubmit = (data) => {
  //   console.log(data)
  // }

  return (
    <>
      <h1>Login</h1>
      {/* <div className='form-container'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input name='email' ref={register({ required: true })} placeholder='Email' />
            {errors.email && <span>Email is required</span>}
          </div>

          <div>
            <input type='password' name='password' ref={register({ required: true })} placeholder='Password' />
            {errors.password && <span>Password is required</span>}
          </div>

          <button type='submit'>Log In</button>
        </form>

        <p>
          Don&apos;t have an account?{' '}
          <span onClick={props.switchToRegister} className='switch-link'>
            Sign up
          </span>
        </p>
      </div> */}
    </>
  )
}
