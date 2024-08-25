
import { data } from '../components/Data';
import Card from '../components/Card';
import { useEffect, useState } from 'react';



export default function Cards() {
    const dataList = data.map((card) =>
        <Card key={card.id} title={card.title} img={card.img} price={card.price} review={card.review}></Card>
    );
    return (
        <div style={{
            display: "flex",
            marginLeft: "20px",
            alignItems: "center",
            gap: "10px", justifyContent: "center"
        }}>
            {dataList}
        </div>
    );
}