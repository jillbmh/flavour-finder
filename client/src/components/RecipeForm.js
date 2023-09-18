import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'


export default function RecipeForm({ onLoad }) {
  const { register } = useForm()
  // State
  const [formData, setFormData] = useState(null)
  const [errors, setErrors] = useState('')

  useEffect(() => {

  }, [])



  return <h1>RecipeForm</h1>
}
