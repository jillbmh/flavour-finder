import { useForm } from 'react-hook-form'
import { Player, Controls } from '@lottiefiles/react-lottie-player'

export default function LoginForm(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const password = watch('password')

  const onSubmit = data => {
    console.log(data)
  }

  return (
    <>
      <h1>Login</h1>

      <Player autoplay loop src='https://lottie.host/80783cd9-26e4-4e23-8b4b-25925db6efda/cQzQqQiozx.json' style={{ height: '300px', width: '300px' }}>
        <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
      </Player>

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
