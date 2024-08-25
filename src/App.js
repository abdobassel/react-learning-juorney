import { Route, Routes } from 'react-router-dom';
import './App.css';
import Cards from './components/Cards'; // استخدم الاستيراد الافتراضي
import Header from './components/Header';

import Signup from './components/Signup';
import Login from './components/Login';

import { useEffect, useState } from 'react';


function App() {


  return (
    <div className='App'>
      <Header></Header>
      <div className='container'>
        <Routes>
          <Route path='/register' element={<Signup></Signup>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
        </Routes>
      </div>


    </div>
  );


}


export default App;
