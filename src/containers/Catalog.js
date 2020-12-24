import React, { useState } from "react";
import axios from "axios";
import styles from "./Catalog.module.css";
import Form from "../components/Form/Form";
import Select from "../components/Select/Select";
import Paginator from "../components/Paginator/Paginator";
import RenderCards from "../components/RenderCards/RenderCards";

function callFetchMovies(setDataCards) {
  axios("http://0.0.0.0:8000/api/movies/")
    .then((response) => {
      setDataCards(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function setPages(dataCards, totalPages, setTotalPages, setPageActive) {
  if (dataCards && totalPages === 0) {
    setTotalPages(Math.ceil(dataCards.length / 20));
    setPageActive(1);
  }
}

function onHandlerMethod(setViewForm, viewForm, setCardSelected) {
  return (dataSelected) => {
    setViewForm(!viewForm);
    setCardSelected(dataSelected);
  };
}

function setViewFormAndRenderCards(
  setViewForm,
  viewForm,
  setCardSelected,
  pageActive,
  dataCards,
  setCardsToRender
) {
  const onHandler = onHandlerMethod(setViewForm, viewForm, setCardSelected);

  if (pageActive && pageActive !== 0) {
    RenderCards(pageActive, dataCards, onHandler, setCardsToRender);
  }
}

function handleSort(
  setViewForm,
  viewForm,
  setCardSelected,
  dataCards,
  setDataCards,
  pageActive,
  setCardsToRender
) {
  return (e) => {
    const key = e.target.value.split("-")[0];
    const typeSorting = e.target.value.split("-")[1];

    if (key !== "Select") {
      let dataCardsSort;
      if (typeSorting === "asc") {
        dataCardsSort = dataCards.sort((a, b) => {
          return a[key] > b[key];
        });
      } else {
        dataCardsSort = dataCards.sort((a, b) => {
          return a[key] < b[key];
        });
      }

      setDataCards(dataCardsSort);
      setViewFormAndRenderCards(
        setViewForm,
        viewForm,
        setCardSelected,
        pageActive,
        dataCards,
        setCardsToRender
      );
    }
  };
}

function Catalog() {
  const [dataCards, setDataCards] = useState();
  const [viewForm, setViewForm] = useState(false);
  const [dataCardSelected, setCardSelected] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [pageActive, setPageActive] = useState(0);
  let [cardsToRender, setCardsToRender] = useState();

  const fetchData = React.useCallback(() => {
    callFetchMovies(setDataCards);
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  React.useEffect(() => {
    setPages(dataCards, totalPages, setTotalPages, setPageActive);
  }, [totalPages, dataCards]);

  React.useEffect(() => {
    setViewFormAndRenderCards(
      setViewForm,
      viewForm,
      setCardSelected,
      pageActive,
      dataCards,
      setCardsToRender
    );
  }, [pageActive, dataCards, viewForm]);

  const handleChangeSort = handleSort(
    setViewForm,
    viewForm,
    setCardSelected,
    dataCards,
    setDataCards,
    pageActive,
    setCardsToRender
  );

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
              label: "Select...",
            },
            {
              name: "title-desc",
              label: "Title descendent",
            },
            {
              name: "title-asc",
              label: "Title Ascendent",
            },
            {
              name: "duration-desc",
              label: "Duration Descendent",
            },
            {
              name: "duration-asc",
              label: "Duration Ascendent",
            },
            {
              name: "yearOfPublished-asc",
              label: "Date Published Ascendent",
            },
            {
              name: "yearOfPublished-desc",
              label: "Date Published Descendent",
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
