import React, { lazy, useState } from 'react'
import apiRequest from '../services/apiServices'
import { ProductDetail } from '../interface/Product'
const DashBoardGraph = lazy(() => import("../components/DashBoardGraph"))

interface Resp {
    limit:number,
    skip:number,
    total:number,
    products:ProductDetail
} 
const Dashboard = () => {

const [state, setState] = useState({} as Resp)
    const initData = async () => {
        try {
            let apiRes:any = await apiRequest("products","GET")
            setState(apiRes)
        } catch (error) {
            
        }
    }
    console.log(state,"statetet");
    
    React.useEffect(() => {
        initData()
    },[])


    return (
        <section>
            <div className="container">
                <div className="card p-4 rounded-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className='m-0'>Graph</h3>
                    </div>
                </div>
                <div className="card p-4 rounded-4 mt-3">
                    <DashBoardGraph data={state.products}/>
                </div>
            </div>
        </section>
    )
}

export default Dashboard