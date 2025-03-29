import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ProductDetail } from '../interface/Product'
import ProductCard from '../components/ProductCard'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import { useDispatch } from 'react-redux'
import { fetchProducts } from '../features/products/productSlice'

const Product = () => {

    const { error, products: data }: any = useSelector((state: RootState) => state.product);
    const { userInfo } = useSelector((state: RootState) => state.auth);
    // const navigate = useNavigate();
    // const dispatch = useDispatch<AppDispatch>();

    // React.useEffect(() => {
    //     if (!userInfo?.accessToken) {
    //         navigate("/login");
    //     }
    //     // dispatch(fetchProducts());
    // }, [dispatch, data.length, userInfo, navigate]);

    return (
        <section>
            <div className="container">
                <div className="card p-4 rounded-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className='m-0'>Product List</h3>
                        <Link to={`/product/add`}><button className='btn btn-primary'>Add Product</button></Link>
                    </div>
                </div>
                {error ? <span>Failed to fetch data</span> :
                    <div className="row mt-4">
                        {Array.isArray(data) &&
                            data.slice().reverse().map((res: ProductDetail, index: number) => (
                                <ProductCard {...res} key={res.id} />
                            ))}
                    </div>}
            </div>
        </section>
    )
}

export default Product