import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAddProductMutation } from "../services/apiServices";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { sliceAddProduct } from "../features/products/productSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


export const validateProduct = (product: any): string | null => {
    for (const key in product) {
        if (product[key] === "" || product[key] === 0) {
            return `Please enter ${key}`;
        }
    }
    return null;
};


const AddProduct: React.FC = () => {
    const navigate = useNavigate();
    const { products: data }: any = useSelector((state: RootState) => state.product);
    const [addProduct] = useAddProductMutation();
    const dispatch = useDispatch<AppDispatch>();
    const [product, setProduct] = useState<any>({
        title: "",
        description: "",
        price: 0,
        discountPercentage: 0,
        stock: 0,
        category: "",
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };
    const generateUniqueId = (existingIds: number[]): number => {
        let newId: number;
        do {
            newId = Math.floor(100 + Math.random() * 900);
        } while (existingIds.includes(newId));
        return newId;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        debugger
        e.preventDefault();
        const errorMessage = validateProduct(product);
        if (product?.discountPercentage > 99) {
            return toast.warning(`Discount should not be greater than 99%`)
        }
        if (errorMessage) {
            return toast.warning(errorMessage)
        } else {
            const existingIds: any = Array.isArray(data) && data.map((res: any) => res.id);
            const newId = generateUniqueId(existingIds);
            let apiRes: any = await addProduct(product);
            dispatch(sliceAddProduct({ ...apiRes?.data, id: newId }))
            navigate(`/product/list/1`)
            toast.success(`Product added successfully`)
        }

    };

    return (
        <section>
            <div className="container">
                <div className="card p-4 rounded-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className='m-0'>Add Product</h3>
                        <Link to={`/product/list/1`}><button className='btn btn-primary'>Back</button></Link>
                    </div>
                </div>
                <div className="card p-4 rounded-4 mt-4">

                    <form onSubmit={handleSubmit} className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Title</label>
                            <input type="text" placeholder="Enter title" className="form-control p-2" name="title" value={product.title} onChange={handleChange} />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input placeholder="Enter Description" className="form-control p-2" name="description" value={product.description} onChange={handleChange} />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Stock</label>
                            <input placeholder="Enter Stock" type="number" className="form-control p-2" name="stock" value={product.stock || ""} onChange={handleChange} />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Category</label>
                            <input placeholder="Enter category" type="text" className="form-control p-2" name="category" value={product.category} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Price ($)</label>
                            <input placeholder="Enter Price" type="number" className="form-control p-2" name="price" value={product.price || ""} onChange={handleChange} />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Discount (%)</label>
                            <input placeholder="Enter Discount" type="number" className="form-control p-2" name="discountPercentage" value={product.discountPercentage || ""} onChange={handleChange} />
                        </div>
                        <div className="col-12 mt-5">
                            <button type="submit" className="btn btn-primary">Add Product</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>

    );
};

export default AddProduct;
