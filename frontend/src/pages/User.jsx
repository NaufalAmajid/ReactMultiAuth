import React, { useEffect } from 'react'
import Layout from './Layout'
import UserList from '../components/UserList'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GetMe } from '../features/AuthSlice'

const User = () => {
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
        <Layout><UserList /></Layout>
    )
}

export default User