import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import BrowseRecipes from './components/BrowseRecipes'
import SingleRecipe from './components/SingleRecipe'
import Blog from './components/Blog'
import SingleBlog from './components/SingleBlog'
import Footer from './components/Footer'

export default function App() {
  return (
    <BrowserRouter>
      {/* Show Header on all pages */}
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recipes' element={<BrowseRecipes />} />
        <Route path='/recipes/:id' element={<SingleRecipe />} />
        <Route path='/blogs/:id' element={<SingleBlog />} />
        <Route path='/blogs' element={<Blog />} />
      </Routes>
      {/* Show Footer on all pages */}
      <Footer />
    </BrowserRouter>
  )
}
