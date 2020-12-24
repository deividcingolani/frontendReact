import React, { useState } from "react";
import styles from "./styles.css";
import axios from "axios";
function Form({ cardSelected, setViewForm }) {
  const [title, setTitle] = useState(cardSelected.title);
  const [description, setDescription] = useState(cardSelected.description);
  const [duration, setDuration] = useState(cardSelected.duration);
  const [yearOfPublished, setYearOfPublished] = useState(
    cardSelected.yearOfPublished
  );
  const [error, setError] = useState(false);

  const handlerUpdateMovie = async () => {
    const body = {
      title,
      description,
      duration,
      yearOfPublished,
    };

    const { status } = await axios.put(
      "http://0.0.0.0:8000/api/movies/" + cardSelected.id + "/",
      body
    );
    if (status === 200) {
      setViewForm(true);
    } else {
      setError(true);
    }
  };

  const handleChange = (event, setValue) => {
    setValue(event.target.value);
  };
  return (
    <div className={styles.form}>
      My form
      <label>
        Title:
        <input
          type="text"
          defaultValue={title}
          onChange={(e) => handleChange(e, setTitle)}
        />
      </label>
      <label>
        Description
        <input
          type="text"
          defaultValue={description}
          onChange={(e) => handleChange(e, setDescription)}
        />
      </label>
      <label>
        Duration
        <input
          type="number"
          defaultValue={duration}
          onChange={(e) => handleChange(e, setDuration)}
        />
      </label>
      <label>
        Year Of Published
        <input
          type="text"
          defaultValue={yearOfPublished}
          onChange={(e) => handleChange(e, setYearOfPublished)}
        />
      </label>
      {error && <div>There was a problem with the update of the data</div>}
      <div className={styles.buttons}>
        <button onClick={() => setViewForm(false)}>Back to Catalog</button>
        <button onClick={() => handlerUpdateMovie()}>
          Update/Create Movie
        </button>
      </div>
    </div>
  );
}

export default Form;
