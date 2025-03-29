import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ProductDetail } from '../interface/Product'
import { API_BASE_URL, useDeleteProductMutation } from '../services/apiServices'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'

const ProductDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate();
        const dispatch = useDispatch<AppDispatch>();
    const [state, setState] = useState<any>({} as ProductDetail)
    const [loading, setLoading] = useState(false)
    const initDetails = async () => {
        try {
            setLoading(true)
            let apiRes = await fetch(`${API_BASE_URL}products/${Number(id)}`)
            let result = await apiRes.json()
            setState(result)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }
    const [deleteProduct] = useDeleteProductMutation();
    const handleDelete = async () => {
        try {
             await deleteProduct(Number(id));
            // dispatch(deleteProduct(Number(id)))
            navigate(`/product/list/1`)
        } catch (error) {

        }
    }
      
    React.useEffect(() => {
        initDetails()
    }, [id])
    return (
        <section>
            {!loading ? <div className="container mt-4">
                <div className="card p-4 rounded-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="m-0">Product Details</h3>
                        <div className='d-flex gap-2'>
                            <Link to="/product/list/1"><button className="btn btn-primary">⬅ Back</button></Link>
                            <Link to={`/product/${id}/edit`}><button className="btn btn-warning">Edit</button></Link>
                            <button onClick={handleDelete} className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
                <div className='card p-4 rounded-4 mt-4'>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="product-gallery">
                                <img src={state?.thumbnail} className="img-fluid rounded" alt='img' loading='lazy' />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <h2>{state?.title}</h2>
                            <p>{state?.description}</p>
                            <div className="star-rating">
                                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="far fa-star"></i>
                                <span>({Number(state?.rating)?.toFixed(1)}) | {Number(state?.reviews?.length)} Reviews</span>
                            </div>
                            <h3 className="text-primary">${state?.price}</h3>
                            <p><strong>Brand:</strong> {state?.brand}</p>
                            <p><strong>SKU:</strong> {state?.sku}</p>
                            <p><strong>Return Policy:</strong> {state?.returnPolicy}</p>
                            <p><strong>Shipping:</strong> {state?.shippingInformation}</p>
                            {/* <p className='text-capitalize'><strong>Tags:</strong> {state?.tags[0]}</p> */}
                            <p><strong>Availability:</strong> <span className="text-danger">{state?.availabilityStatus}</span></p>

                            <div className="d-flex align-items-center">
                                <input type="number" className="form-control w-25 me-2" value="1" min="1" />
                                <button className="btn btn-primary me-2">Add to Cart</button>
                                <button className="btn btn-warning">Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card p-4 rounded-4 mt-5">
                    {Array.isArray(state?.reviews) && state?.reviews.map((res: any, index: number) => <div className="border my-1 p-3 rounded-4">
                        <strong>{res?.reviewerName}</strong> <small className="text-muted">- {(res?.date)}</small>
                        <p>{res?.comment}</p>
                    </div>)}

                </div>
            </div> : "Loading..."}
        </section >
    )
}

export default ProductDetails