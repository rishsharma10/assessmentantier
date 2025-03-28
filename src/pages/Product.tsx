import React, { useState } from 'react'
import apiRequest from '../services/apiServices'
import { Link } from 'react-router-dom'
import { ProductDetail } from '../interface/Product'
import ProductCard from '../components/ProductCard'

const Product = () => {

    const [state, setState] = useState([])
    const initData = async () => {
        try {
            let apiRes:any = await apiRequest(`products`, "GET")
            setState(apiRes?.products)
        } catch (error) {

        }
    }

    React.useEffect(() => {
        initData()
    }, [])

    return (
        <section>
            <div className="container">
                <div className="card p-4 rounded-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className='m-0'>Product List</h3>
                        <Link to={`/product/add`}><button className='btn btn-primary'>Add Product</button></Link>
                    </div>
                </div>
                <div className="row mt-4">
                    {Array.isArray(state) && state.map((res:ProductDetail,index:number) => <ProductCard {...res} key={res.id}/>)}
                </div>
            </div>
        </section>
    )
}

export default Product