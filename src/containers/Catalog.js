import React, { useEffect, useState } from "react";
import styles from "./catalog.module.css";
import Card from "../components/Card/Card";
import axios from "axios"
import Form from "../components/Form/Form";
function Catalog() {
  const [dataCards, setDataCards]= useState()
  const [viewForm, setViewForm]= useState(false)
  const [dataCardSelected, setCardSelected]= useState(false)
const onHandler=(dataSelected)=>{
    setViewForm(!viewForm)
  setCardSelected(dataSelected)

}
  useEffect(async () => {
    const {data} = await axios(
        'http://0.0.0.0:8000/api/movies/',
    );
    setDataCards(data)
  },[]);


  if(!dataCards) return <div>Is loading</div>

  if(viewForm) return <Form cardSelected={dataCardSelected} setViewForm={setViewForm}/>


  const cardsRender = [];
  for (let i = 0; i < 20; i++) {
    cardsRender.push(<Card key={i} dataCard={dataCards[i]} onHandler={onHandler}/>);
  }
  return <div className={styles.cards}>{cardsRender}</div>;
}

export default Catalog;
