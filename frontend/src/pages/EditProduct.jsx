import React, { useEffect } from 'react'
import Layout from './Layout'
import FormEditProduct from '../components/FormEditProduct'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GetMe } from '../features/AuthSlice'

const EditProduct = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(GetMe())
        document.title = 'Edit Product'
    }, [dispatch])

    useEffect(() => {
        if (isError) {
            navigate('/')
        }
    }, [isError, navigate])
    
    return (
        <Layout><FormEditProduct /></Layout>
    )
}

export default EditProduct