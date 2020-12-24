import React, { useState } from "react";
import styles from "./catalog.module.css";
import Card from "../components/Card/Card";
import axios from "axios";
import Form from "../components/Form/Form";
function Catalog() {
  const [dataCards, setDataCards] = useState();
  const [viewForm, setViewForm] = useState(false);
  const [dataCardSelected, setCardSelected] = useState(false);

  const handleChange = (e) => {
    const key = e.target.value;
    const dataCardsSort = dataCards.sort((a, b) => {
      return a[key] > b[key];
    });
    setDataCards(dataCardsSort);
  };
  const onHandler = (dataSelected) => {
    setViewForm(!viewForm);
    setCardSelected(dataSelected);
  };

  const fetchData = React.useCallback(() => {
    axios("http://0.0.0.0:8000/api/movies/")
      .then((response) => {
        setDataCards(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!dataCards) return <div>Is loading</div>;

  if (viewForm)
    return <Form cardSelected={dataCardSelected} setViewForm={setViewForm} />;

  const cardsRender = [];
  for (let i = 0; i < 20; i++) {
    cardsRender.push(
      <Card key={i} dataCard={dataCards[i]} onHandler={onHandler} />
    );
  }
  return (
    <div>
      <select name="OrderBy" onChange={(event) => handleChange(event)}>
        <option value="Title">Title</option>
        <option value="Duration">Duration</option>
        <option value="Year">yearOfPublished</option>
      </select>
      <div className={styles.cards}>{cardsRender}</div>
    </div>
  );
}

export default Catalog;
