import React, { useState } from "react";
import { ProductDetail } from "../interface/Product";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { API_BASE_URL, useUpdateProductMutation } from "../services/apiServices";
import { useSelector } from "react-redux";
import { updateProduct } from "../features/products/productSlice";
import { validateProduct } from "./AddProduct";
import { toast } from "react-toastify";

const EditProduct: React.FC = () => {
    const [product, setProduct] = useState<any>({
        title: "",
        description: "",
        price: 0,
        discountPercentage: 0,
        stock: 0,
        category: "",
    });



    const { id } = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false)
    const { error, products: data }: any = useSelector((state: RootState) => state.product);
    console.log(data, 'datatatattatata');

    const initDetails = async () => {
        debugger
        try {
            setLoading(true)
            let apiRes = Array.isArray(data) && data.find((res: any) => Number(res.id) === Number(id))
            console.log(apiRes, "apiresss");

            setProduct(apiRes)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errorMessage = validateProduct(product);
        if (product?.discountPercentage > 99) {
            return toast.warning(`Discount should not be greater than 99%`)
        }
        if (errorMessage) {
            return toast.warning(errorMessage)
        } else {
            try {
                dispatch(updateProduct(product))
                navigate(`/product/${id}/details`)
            } catch (error: any) {
                alert(JSON.stringify(error?.message))
            }
        }



    };

    React.useEffect(() => {
        initDetails()
    }, [id])
    return (
        <section>
            <div className="container">
                <div className="card p-4 rounded-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className='m-0'>Edit Product</h3>
                        <Link to={`/product/list/1`}><button className='btn btn-primary'>Back</button></Link>
                    </div>
                </div>
                <div className="card p-4 rounded-4 mt-4">

                    <form onSubmit={handleSubmit} className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Title</label>
                            <input type="text" placeholder="Enter title" className="form-control p-2" name="title" value={product.title} onChange={handleChange}  />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input placeholder="Enter Description" className="form-control p-2" name="description" value={product.description} onChange={handleChange}  />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Stock</label>
                            <input placeholder="Enter Stock" type="number" className="form-control p-2" name="stock" value={product.stock} onChange={handleChange}  />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Category</label>
                            <input placeholder="Enter category" type="text" className="form-control p-2" name="category" value={product.category} onChange={handleChange}  />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Price ($)</label>
                            <input placeholder="Enter Price" type="number" className="form-control p-2" name="price" value={product.price} onChange={handleChange}  />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Discount (%)</label>
                            <input placeholder="Enter Discount" type="number" className="form-control p-2" name="discountPercentage" value={product.discountPercentage} onChange={handleChange}  />
                        </div>
                        <div className="col-12 mt-5">
                            <button type="submit" className="btn btn-primary">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>

    );
};

export default EditProduct;
