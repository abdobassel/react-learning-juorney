// src/components/UsersTable.js
import React, { useEffect, useState } from 'react';

const usersData = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com" }
];

function handleEdit(id) {
    // منطق التعديل هنا
    console.log("Edit user with ID:", id);
}

function handleDelete(id) {
    // منطق الحذف هنا
    console.log("Delete user with ID:", id);
}

function UsersTable() {

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Users List</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th> {/* عمود الأفعال */}
                    </tr>
                </thead>
                <tbody>
                    {usersData.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEdit(user.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(user.id)}
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

export default UsersTable;
