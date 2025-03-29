import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ProductDetail } from '../interface/Product'
import placeholder from "../../src/assests/placeholder.jpg"
import { API_BASE_URL, useDeleteProductMutation } from '../services/apiServices'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import { useSelector } from 'react-redux'
import { deleteProduct } from '../features/products/productSlice'

const ProductDetails = () => {
    const { id } = useParams()
    const { error, products: data }: any = useSelector((state: RootState) => state.product);
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [state, setState] = useState<any>({} as ProductDetail)
    const [loading, setLoading] = useState(false)

    const initDetails = async () => {
        try {
            setLoading(true)
            let apiRes = Array.isArray(data) && data.find((res: any) => Number(res.id) === Number(id))
            setState(apiRes)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }
    // const [deleteProduct] = useDeleteProductMutation();
    const handleDelete = async () => {
        const isConfirmed = window.confirm("Are you sure you want to delete this product?");
        
        if (!isConfirmed) return; // Stop execution if user cancels
    
        try {
            dispatch(deleteProduct(Number(id)));
            navigate(`/product/list/1`);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };
    
    console.log(state, 'statetettet');

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
                                <img src={state?.thumbnail ?? placeholder} className="img-fluid rounded" alt='img' loading='lazy' />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <h2>{state?.title}</h2>
                            <p>{state?.description}</p>
                            <div className="star-rating">
                                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="far fa-star"></i>
                                <span>({Number(state?.rating ?? 3.34)?.toFixed(1)}) | {Number(state?.reviews?.length ?? 3)} Reviews</span>
                            </div>
                            <h3 className="text-primary">${state?.price}</h3>
                            <p><strong>Brand:</strong> {state?.brand ?? "N/A"}</p>
                            <p><strong>SKU:</strong> {state?.sku ?? "0CHEHE"}</p>
                            <p><strong>Return Policy:</strong> {state?.returnPolicy ?? "2 days"}</p>
                            <p><strong>Shipping:</strong> {state?.shippingInformation ?? "3 days"}</p>
                            {/* <p className='text-capitalize'><strong>Tags:</strong> {state?.tags[0]}</p> */}
                            <p><strong>Availability:</strong> <span className="text-danger">{state?.availabilityStatus ?? "available"}</span></p>

                            <div className="d-flex align-items-center">
                                <input type="number" className="form-control w-25 me-2" value="1" min="1" />
                                <button className="btn btn-primary me-2">Add to Cart</button>
                                <button className="btn btn-warning">Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>

                {state?.reviews && state?.reviews?.length !== 0 && <div className="card p-4 rounded-4 mt-5">
                    {Array.isArray(state?.reviews) && state?.reviews.map((res: any, index: number) => <div className="border my-1 p-3 rounded-4">
                        <strong>{res?.reviewerName}</strong> <small className="text-muted">- {(res?.date)}</small>
                        <p>{res?.comment}</p>
                    </div>)}

                </div>}
            </div> : "Loading..."}
        </section >
    )
}

export default ProductDetails