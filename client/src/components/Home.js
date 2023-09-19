import React from 'react'
import CarouselWrapper from './Carousel'
import AnimationImage from '../images/animation-image.jpeg'
import Blogs from './Blog.js'

export default function Home() {
  return (
    <main>
      <CarouselWrapper />
      <Blogs />

      {/* <div className='animation-container'>
        <img src={AnimationImage} alt='Animation' />
        <div id='animated-words' className='animated-words'>
          delicious
        </div>
        <h1 className='hero-heading'>Recipe Title</h1>
      </div> */}
    </main>
  )
}
