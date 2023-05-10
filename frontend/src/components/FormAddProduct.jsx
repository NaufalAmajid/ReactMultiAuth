import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const FormAddProduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    const CreateProduct = async (e) => {
        e.preventDefault()
        try {
            const body = { name, price }
            await axios.post('http://localhost:5000/products', body)
            navigate('/products')
        } catch (err) {
            if (err.response.data.message) {
                setMessage(err.response.data.message)
            } else {
                setMessage(err.message)
            }
        }
    }

    return (
        <div>
            <h1 className='title'>Products</h1>
            <h2 className="subtitle">Create New Product</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={CreateProduct}>
                            <p className="has-text-centered">{message}</p>
                            <div className="field">
                                <label className="label">Name</label>
                                <div className="control">
                                    <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder='product name' />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Price</label>
                                <div className="control">
                                    <input type="text" className="input" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='price' />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button className='button is-success' type='submit'>Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormAddProduct