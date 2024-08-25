import './App.css';
import Cards from './components/Cards'; // استخدم الاستيراد الافتراضي

import Signup from './components/Signup';
import { useEffect, useState } from 'react';


function App() {


  return (
    <div className='App'>
      <div className='container'>
        <Signup></Signup>
      </div>


    </div>
  );


}


export default App;
