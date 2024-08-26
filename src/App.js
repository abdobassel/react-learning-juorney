import { Route, Routes } from 'react-router-dom';
import './App.css';
import Cards from './components/Cards';
import Header from './components/Header';

import Signup from './components/Signup';
import Login from './components/Login';

import { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import DashboardHeader from './components/DashHeader';
import Products from './components/Products';
import Users from './components/Users';


function App() {

  const isDashboard = window.location.pathname.startsWith('/dashboard');

  return (
    <div className='App'>
      {!isDashboard && <Header />} {/* إظهار الهيدر العادي فقط في الصفحات التي ليست جزءًا من الداشبورد */}
      {isDashboard && <DashboardHeader />} {/* إظهار هيدر الداشبورد فقط في صفحات الداشبورد */}

      <div className={isDashboard ? '' : 'container'}>
        <Routes>
          <Route path='/' element={<Cards />}></Route>
          <Route path='/logout' element={<Cards></Cards>}></Route>
          <Route path='/register' element={<Signup />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/dashboard/*' element={<Dashboard></Dashboard>}>
            { /*    inside Route in Dashboard   */}
            <Route path="users" element={<Users />} />
            <Route path="products" element={<Products />} />
          </Route>  {/* Add the Dashboard route */}

        </Routes>
      </div>


    </div>
  );


}


export default App;
