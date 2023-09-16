import React from 'react'
import AnimationImage from '../images/animation-image.jpeg'

export default function Home() {

  return (
    <>
      <h1>Home</h1>
      <div className='animation-container'>
        <img src={AnimationImage} alt="Animation" />
        <div 
          id="animated-words" 
          className="animated-words"
        >
          delicious
        </div>
        <h1 className="hero-heading">
          Flavour Finder
        </h1>
      </div>
    </>
  )
}
