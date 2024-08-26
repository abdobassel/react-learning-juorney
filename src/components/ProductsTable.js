// src/components/ProductsTable.js
import React from 'react';

// بيانات افتراضية للمنتجات
const productsData = [
    { id: 1, name: "Product A", price: "$10" },
    { id: 2, name: "Product B", price: "$20" },
    { id: 3, name: "Product C", price: "$30" }
];

function handleEdit(id) {
    // منطق التعديل هنا
    console.log("Edit product with ID:", id);
}

function handleDelete(id) {
    // منطق الحذف هنا
    console.log("Delete product with ID:", id);
}

function ProductsTable() {
    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Products List</h1>
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
                    {productsData.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEdit(product.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductsTable;
