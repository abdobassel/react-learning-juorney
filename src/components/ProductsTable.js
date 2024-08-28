// src/components/ProductsTable.js
import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


// بيانات افتراضية للمنتجات
// const productsData = [
//     { id: 1, name: "Product A", price: "$10" },
//     { id: 2, name: "Product B", price: "$20" },
//     { id: 3, name: "Product C", price: "$30" }
// ];

function handleEdit(id) {
    // منطق التعديل هنا
    console.log("Edit product with ID:", id);
}


function ProductsTable() {

    function handleDelete(id) {

        const token = window.localStorage.getItem('token');
        axios.post(
            'http://127.0.0.1:8000/api/product/delete',
            { product_id: id },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then((response) => {
                console.log("Product deleted successfully:", response);
                // هنا ممكن تحديث المنتجات بعد الحذف إذا كنت تريد عرض القائمة بدون المنتج المحذوف
                setProductsData((prevProducts) => prevProducts.filter(product => product.id !== id));
            });
    }
    const [productsDataList, setProductsData] = useState([]);
    const showProducts = productsDataList.map((product, index) => <tr key={product.id}>
        <td>{index + 1}</td>
        <td>{product.name_en}</td>
        <td>{product.price}</td>
        <td>
            <Link to={`${product.id}`}>
                <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(product.id)}
                >
                    Edit
                </button>
            </Link>
            <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(product.id)}
            >
                Delete
            </button>
        </td>
    </tr>);
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products')
            .then((response) => response.json())
            .then((data) => setProductsData(data.result))
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-center mb-4">Products List</h1>
                <Link to="add">
                    <button className="btn btn-primary">
                        Add Product
                    </button>
                </Link>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th> {/* عمود الأفعال */}
                    </tr>
                </thead>
                <tbody>
                    {showProducts}
                </tbody>
            </table>
        </div>
    );
}

export default ProductsTable;
