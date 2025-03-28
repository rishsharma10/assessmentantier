import React, { useState } from "react";
import { ProductDetail } from "../interface/Product";
import { Link } from "react-router-dom";
import apiRequest from "../services/apiServices";

const EditProduct: React.FC = () => {
    const [product, setProduct] = useState<Partial<ProductDetail>>({
        title: "",
        description: "",
        price: 0,
        discountPercentage: 0,
        stock: 0,
        brand: "",
    });

    // Handle form input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...product
        }
        try {
           let apiRes = await apiRequest("products/add","POST",payload) 
        } catch (error) {
            
        }
        console.log("Product Data:", product);
        alert("Product added successfully!");
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
                            <input type="text" placeholder="Enter title" className="form-control p-2" name="title" value={product.title} onChange={handleChange} required />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input placeholder="Enter Description" className="form-control p-2" name="description" value={product.description} onChange={handleChange} required />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Stock</label>
                            <input placeholder="Enter Stock" type="number" className="form-control p-2" name="stock" value={product.stock} onChange={handleChange} required />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Brand</label>
                            <input placeholder="Enter Brand" type="text" className="form-control p-2" name="brand" value={product.brand} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Price ($)</label>
                            <input placeholder="Enter Price" type="number" className="form-control p-2" name="price" value={product.price} onChange={handleChange} required />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Discount (%)</label>
                            <input placeholder="Enter Discount" type="number" className="form-control p-2" name="discountPercentage" value={product.discountPercentage} onChange={handleChange} required />
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

export default EditProduct;
