// src/components/Dashboard.js
import React from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';


export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <ul>
                    <li><Link to="/dashboard/users">Users</Link></li>
                    <li><Link to="/dashboard/products">Products</Link></li>
                </ul>
            </aside>
            <main className="dashboard-content">
                <Outlet></Outlet>
            </main>
        </div>
    );
}



