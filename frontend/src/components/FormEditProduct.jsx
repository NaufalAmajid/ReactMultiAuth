import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const FormEditProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [msg, setMsg] = useState('');

  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/products/${id}`)
      setName(response.data.name)
      setPrice(response.data.price)
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message)
      }
    }
  }

  const updateProduct = async (e) => {
    e.preventDefault()
    try {
      const body = { name, price }
      const response = await axios.patch(`http://localhost:5000/products/${id}`, body)
      setMsg(response.data.message)
      alert(response.data.message)
      navigate('/products')
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message)
      }
    }
  }

  return (
    <div>
      <h1 className='title'>Products</h1>
      <h2 className="subtitle">Edit Product</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateProduct}>
              <p className="has-text-centered">{msg}</p>
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
                  <button className='button is-success' type='submit'>Update</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormEditProduct