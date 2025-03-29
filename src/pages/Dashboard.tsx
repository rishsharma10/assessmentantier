import React, { lazy } from 'react'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchProducts } from '../features/products/productSlice'
const DashBoardGraph = lazy(() => import("../components/DashBoardGraph"))

const Dashboard = () => {

    const { error, products: data }: any = useSelector((state: RootState) => state.product);
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const initData = async () => {
        dispatch(fetchProducts());
    };

    if (!userInfo?.accessToken) {
        navigate("/login")
    }

    React.useEffect(() => {
        initData()
    }, [])
    return (
        <section>
            <div className="container">
                <div className="card p-4 rounded-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className='m-0'>Product Graph</h3>
                    </div>
                </div>
                {error ? <span>Failed to fetch data</span> :
                <div className="card p-4 rounded-4 mt-3">
                    <DashBoardGraph data={data.products} />
                </div>}
            </div>
        </section>
    )
}

export default Dashboard