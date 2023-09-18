import axios from 'axios'
import { useState, useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel'


export default function CarouselWrapper() {

  // State
  const [topRecipes, setTopRecipes] = useState([])

  useEffect(() => {
    async function getAllRecipeData() {
      try {
        const { data } = await axios.get('/api/recipes')

        const randomisedData = data.sort(() => 0.5 - Math.random())

        const selectedRecipes = randomisedData.slice(0, 5)
        setTopRecipes(selectedRecipes)
      } catch (error) {
        console.log(error)
      }
    }
    getAllRecipeData()
  }, [])

  return (
    <Carousel fade={true} data-bs-theme="dark">
      {
        topRecipes.map((val, index) => {
          return (

            <Carousel.Item key={`${val._id}`}>
              <img
                style={{
                  maxHeight: '65vh', minHeight: '65vh', objectFit: 'cover',
                }}
                className="d-block w-100"
                src={val.image}
                alt={`Image of ${val.title}`}
              />
              <Carousel.Caption>
                <h5>{val.title}</h5>
              </Carousel.Caption>
            </Carousel.Item>
          )
        })
      }
    </Carousel>
  )
}
