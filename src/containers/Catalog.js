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
  const [pageActive, setPageActive] = useState(0);
  let [cardsToRender, setCardsToRender] = useState();

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
    const onHandler = (dataSelected) => {
      setViewForm(!viewForm);
      setCardSelected(dataSelected);
    };
    if (pageActive && pageActive !== 0) {
      let cardsRender = [];
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
      setCardsToRender(cardsRender);
    }
  }, [pageActive, dataCards, viewForm]);

  const handleChangeSort = (e) => {

    const key = e.target.value;
     if(key!=="Select"){
       const dataCardsSort = dataCards.sort((a, b) => {
         return a[key] > b[key];
       });
       console.log(dataCardsSort);
       setDataCards(dataCardsSort);     }

  };

  if (!dataCards) return <div>Is loading</div>;
  if (viewForm)
    return <Form cardSelected={dataCardSelected} setViewForm={setViewForm} />;

  if (dataCards) {
    return (
      <div>
        <Select
          options={[
            {
              name: "Select",
              label: "Select..."
            },
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
          handleChange={handleChangeSort}
        />
        <div className={styles.cards}>{cardsToRender}</div>
        <Paginator
          totalPages={totalPages}
          pageActive={pageActive}
          setPageActive={setPageActive}
        />
      </div>
    );
  }
}

export default Catalog;
