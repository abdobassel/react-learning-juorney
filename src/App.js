import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Cards from './components/Cards';
import Header from './components/Header';

import Signup from './components/Signup';
import Login from './components/Login';

import { useContext, useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import DashboardHeader from './components/DashHeader';
import Products from './components/Products';
import Users from './components/Users';
import UpdateProduct from './components/UpdateProduct';
import AddProduct from './components/AddProduct';
import RequireAuth from './components/protected_routes/RequireAuth';
import { User } from './components/context/AuthProvider';

function App() {
  const location = useLocation(); // استخدام useLocation للحصول على المسار الحالي
  const { authToken } = useContext(User);

  // تحديد ما إذا كان المسار الحالي جزءًا من الداشبورد
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className='App'>
      {!isDashboard && <Header />} {/* إظهار الهيدر العادي فقط في الصفحات التي ليست جزءًا من الداشبورد */}
      {isDashboard && authToken && <DashboardHeader />} {/* إظهار هيدر الداشبورد فقط في صفحات الداشبورد إذا كان المستخدم مسجلاً دخوله */}

      <div className={isDashboard ? '' : 'container'}>
        <Routes>
          <Route path='' element={<Cards />}></Route>
          <Route path='/register' element={<Signup />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/logout' element={<Login />}></Route>

          <Route element={<RequireAuth />}>
            <Route path='/dashboard/*' element={<Dashboard />}>
              <Route path="users" element={<Users />} />
              <Route path="products" element={<Products />} />
              <Route path='products/:id' element={<UpdateProduct />}></Route>
              <Route path='products/add' element={<AddProduct />}></Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;