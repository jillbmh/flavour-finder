import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import BrowseRecipes from './components/BrowseRecipes'
import SingleRecipe from './components/SingleRecipe'
import Blog from './components/Blog'

export default function App() {
  return (
    <BrowserRouter>
      {/* Show Header on all pages */}
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<BrowseRecipes />} />
        <Route path="/recipes/:id" element={<SingleRecipe />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  )
}
