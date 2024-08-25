import './App.css';

import { data } from './components/Data';
import { Card } from './components/Card';
import { useEffect, useState } from 'react';

function App() {
  const [dataNames, setData] = useState([]);

  const nameshow = dataNames.map((n) => <Name key={n.id} name={n.name}></Name>)
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then(response => response.json()).then((data) => data.data.memes)
      .then((memes) => {
        const names = memes.map((name) => name);

        setData(names);
      });
  });


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

      </div>
      <div style={{

        alignItems: "center",
        color: "red",


      }}>
        {nameshow}
      </div>

    </div>
  );


}

function Name(props) {
  return (
    <div>
      <p>{props.name}</p>
    </div>
  );
}

export default App;
