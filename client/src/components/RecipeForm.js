import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'


export default function RecipeForm() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  // State

  const onSubmit = data => {
    console.log(data)
    console.log(errors)
  }
  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder='Title' {...register('title', { required: true })} />
        {/* {errors.username && <span>Username is required</span>} */}
        <input type='file' accept="image/png, image/jpeg, image/jpg" {...register('image', { required: true })} />
        <select defaultValue={'Choose a cuisine'} {...register('cuisine', { required: true })} >
          <option value="" disabled>Choose a cuisine</option>
          <option value="italian">Italian</option>
          <option value="japanese">Japanese</option>
          <option value="chinese">Chinese</option>
          <option value="indian">Indian</option>
          <option value="thai">Thai</option>
          <option value="mexican">Mexican</option>
          <option value="american">American</option>
          <option value="british">British</option>
          <option value="spanish">Spanish</option>
          <option value="korean">Korean</option>
          <option value="vietnamese">Vietnamese</option>
          <option value="asian">Asian</option>
        </select>

        <select defaultValue={'Choose the dish type'} {...register('type', { required: true })} >
          <option value="" disabled>Choose the dish type</option>
          <option value="starter">Starter</option>
          <option value="main">Main</option>
          <option value="side">Side</option>
          <option value="dessert">Dessert</option>
        </select>

        <input type='number'{...register('hours', { required: true })} />
        <input type='number' {...register('serves', { required: true })} />

        <input type='submit' value='Submit Recipe' />
      </form>
    </main>
  )


}
