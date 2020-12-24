import React, { useState } from "react";
import styles from "./catalog.module.css";
import Card from "../components/Card/Card";
import axios from "axios";
import Form from "../components/Form/Form";
import Select from "../components/Select/Select";
import Paginator from "../components/paginator/paginator";
function Catalog() {
  const [dataCards, setDataCards] = useState();
  const [viewForm, setViewForm] = useState(false);
  const [dataCardSelected, setCardSelected] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [pageActive, setPageActive] = useState(false);

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
  React.useEffect(() => {
    if (dataCards && totalPages === 0) {
      setTotalPages(Math.ceil(dataCards.length / 20));
      setPageActive(1);
    }
  }, [totalPages, dataCards]);
  React.useEffect(() => {
    if (pageActive != 0) {
      console.log("calculate data for this page");
    }
  }, [pageActive]);

  if (!dataCards) return <div>Is loading</div>;

  if (viewForm)
    return <Form cardSelected={dataCardSelected} setViewForm={setViewForm} />;

  const cardsRender = [];
  const firstItemOfPageActive = (pageActive - 1) * 20;
  let lastItemOfPageActive = pageActive * 20;
  if (lastItemOfPageActive > dataCards.length) {
    lastItemOfPageActive = dataCards.length;
  }
  for (let i = firstItemOfPageActive; i < lastItemOfPageActive; i++) {
    cardsRender.push(
      <Card key={i} dataCard={dataCards[i]} onHandler={onHandler} />
    );
  }
  return (
    <div>
      <Select
        options={[
          {
            name: "Title",
            label: "Title",
          },
          {
            name: "Duration",
            label: "Duration",
          },
          {
            name: "yearOfPublished",
            label: "Date Published",
          },
        ]}
        handleChange={handleChange}
      />
      <div className={styles.cards}>{cardsRender}</div>
      <Paginator
        totalPages={totalPages}
        pageActive={pageActive}
        setPageActive={setPageActive}
      />
    </div>
  );
}

export default Catalog;
