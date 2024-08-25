import logo from './palestine-flag-protest.webp';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { data } from './components/Data';
import { Card } from './components/Card';
import { useState } from 'react';

function App() {
  const [name, setChangename] = useState(true);
  console.log(name);
  function toggle() {
    setChangename((v) => !v);

  }
  const [firstname, setFirstname] = useState("");
  const [lastname, setlastname] = useState("");


  const dataList = data.map((card) =>
    <Card key={card.id} title={card.title} img={card.img} price={card.price} review={card.review}></Card>
  );
  return (
    <div className='App'>
      <div className='container'>
        <div onClick={toggle} style={{ display: "flex", marginLeft: "20px", alignItems: "center", gap: "10px", justifyContent: "center" }}>  {dataList}
        </div>
      </div>
      {name ? "True" : "False"}
      <form action=''>
        <label htmlFor='' >Firrst name</label>
        <input
          value={
            firstname
          }
          onChange={(e) => setFirstname(e.target.value)}
        ></input>
        <br></br>
        <label htmlFor='' >Last name</label>
        <input
          value={
            lastname
          }
          onChange={(e) => setlastname(e.target.value)}
        ></input>

      </form>
    </div>
  );


}

export default App;
