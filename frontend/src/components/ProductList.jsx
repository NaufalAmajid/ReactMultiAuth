import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoPencil, IoTrash, IoCreate } from 'react-icons/io5'

const ProductList = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        const response = await axios.get('http://localhost:5000/products')
        setProducts(response.data)
    }

    const deleteProduct = async (uuid) => {
        const confirm = window.confirm('Are you sure want to delete this product?')
        if (confirm) {
            await axios.delete(`http://localhost:5000/products/${uuid}`)
            getProducts()
        }
    }

    return (
        <div>
            <h1 className='title'>Products</h1>
            <h2 className="subtitle">List Of Products</h2>
            <Link to={'/products/add'} className='button is-primary mb-5'><IoCreate /> Create</Link>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Created By</th>
                        <th>Act</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.express_user.name}</td>
                            <td>
                                <Link to={`/products/edit/${product.uuid}`} className='button is-small is-info mr-3'><IoPencil /></Link>
                                <button className='button is-small is-danger' onClick={() => deleteProduct(product.uuid)}><IoTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProductList