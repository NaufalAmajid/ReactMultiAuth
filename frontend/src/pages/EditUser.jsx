import React, { useEffect } from 'react'
import Layout from './Layout'
import FormEditUser from '../components/FormEditUser'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GetMe } from '../features/AuthSlice'

const EditUser = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError, user } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(GetMe())
    }, [dispatch])

    useEffect(() => {
        if (isError) {
            navigate('/')
        }
        if (user && user.role !== 'admin') {
            navigate('/dashboard')
        }
    }, [isError, user, navigate])

    return (
        <Layout><FormEditUser /></Layout>
    )
}

export default EditUser