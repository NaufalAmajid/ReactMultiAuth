import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoPencil, IoTrash } from 'react-icons/io5'

const UserList = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users')
            setUsers(response.data)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    const deleteUser = async (uuid) => {
        const confirm = window.confirm('Are you sure want to delete this user?')
        if (confirm) {
            try {
                await axios.delete(`http://localhost:5000/users/${uuid}`)
                getUsers()
            } catch (error) {
                alert(error.response.data.message)
            }
        } else {
            return false
        }
    }

    return (
        <div>
            <h1 className='title'>Users</h1>
            <h2 className="subtitle">List Of Users</h2>
            <Link to={'/users/add'} className='button is-info mb-5'>Create Users</Link>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Act</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <Link to={`/users/edit/${user.uuid}`} className='button mr-3 is-small is-primary'><IoPencil /></Link>
                                <button className='button is-small is-danger' onClick={() => deleteUser(user.uuid)}><IoTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserList