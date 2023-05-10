import React, { useEffect } from 'react'
import Layout from './Layout'
import FormAddProduct from '../components/FormAddProduct'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GetMe } from '../features/AuthSlice'

const AddProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isError } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(GetMe())
    document.title = 'Add Product'
  }, [dispatch])

  useEffect(() => {
    if (isError) {
      navigate('/')
    }
  }, [isError, navigate])

  return (
    <Layout><FormAddProduct /></Layout>
  )
}

export default AddProduct