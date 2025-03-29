import React from 'react'
import { ProductDetail } from '../interface/Product'
import { Link } from 'react-router-dom'

const ProductCard = (props:ProductDetail) => {
    return <div className="col-12 col-md-3 mt-3 placeholder-glow">
        <div className="card p-3 h-100 product-card">
            <div className='product-img mb-3'>
                <img src={props?.images[0]} alt="img" loading='lazy' />
            </div>
            <h4 className='fw-bold'>${props?.price}</h4>
            <h6 className='fw-bold'>{props?.title}</h6>
            <p className='fw-semibold text-muted text-capitalize'>{props?.category}</p>
            <Link to={`/product/${props.id}/details`}>
            <button className='btn btn-primary w-100'>View Details</button>
            </Link>
        </div>
    </div>
}

export default React.memo(ProductCard)