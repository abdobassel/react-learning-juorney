import './App.css';

import { data } from './components/Data';
import { Card } from './components/Card';
import { useEffect, useState } from 'react';
import Signup from './components/Signup';

function App() {

  const dataList = data.map((card) =>
    <Card key={card.id} title={card.title} img={card.img} price={card.price} review={card.review}></Card>
  );
  return (
    <div className='App'>
      <div className='container'>
        <div style={{
          display: "flex",
          marginLeft: "20px",
          alignItems: "center",
          gap: "10px", justifyContent: "center"
        }}>
          {dataList}
        </div>

        <Signup></Signup>
      </div>


    </div>
  );


}


export default App;
