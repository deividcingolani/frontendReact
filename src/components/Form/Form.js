import React, { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
function Form({ cardSelected, setViewForm }) {
  const [title, setTitle] = useState(cardSelected.title);
  const [description, setDescription] = useState(cardSelected.description);
  const [duration, setDuration] = useState(cardSelected.duration);
  const [yearOfPublished, setYearOfPublished] = useState(
    cardSelected.yearOfPublished
  );
  const [validateField, setValidateField] = useState(false);
  const [error, setError] = useState(false);

  const handlerUpdateMovie = async () => {
    if (
      title.toString("") === "" ||
      description.toString("") === "" ||
      duration.toString("") === "" ||
      duration === 0 ||
      yearOfPublished.toString("") === "" ||
      yearOfPublished === 0
    ) {
      setValidateField(true);
    } else {
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
        setViewForm(false);
      } else {
        setError(true);
      }
    }
  };
  const handleChange = (event, setValue) => {
    setValue(event.target.value);
  };
  return (
    <div className={styles.form}>
      <div className={styles.divInputForm}>
        <label className={styles.label}>Title*</label>
        <input
          type="text"
          defaultValue={title}
          onChange={(e) => handleChange(e, setTitle)}
          className={styles.inputForm}
        />
        {validateField && title.toString("") === "" && (
          <div className={styles.errorInput}>This field is Required</div>
        )}
      </div>
      <div className={styles.divInputForm}>
        <label className={styles.label}>Description*</label>

        <input
          type="text"
          defaultValue={description}
          onChange={(e) => handleChange(e, setDescription)}
          className={styles.inputForm}
        />
        {validateField && description.toString("") === "" && (
          <div className={styles.errorInput}>This field is Required</div>
        )}
      </div>
      <div className={styles.divInputForm}>
        <label className={styles.label}>Duration*</label>
        <input
          type="number"
          defaultValue={duration}
          onChange={(e) => handleChange(e, setDuration)}
          className={styles.inputForm}
        />
        {validateField && duration === 0 && (
          <div className={styles.errorInput}>This field is Required</div>
        )}
      </div>
      <div className={styles.divInputForm}>
        <label className={styles.label}>Year Of Published*</label>

        <input
          type="text"
          defaultValue={yearOfPublished}
          onChange={(e) => handleChange(e, setYearOfPublished)}
          className={styles.inputForm}
        />
        {(validateField && yearOfPublished > new Date().getFullYear()) ||
          (yearOfPublished < 2020 && (
            <div className={styles.errorInput}>
              The year of published needs to be lower or equal to the actual
              year and bigger than 2020
            </div>
          ))}
      </div>
      {error && <div>There was a problem with the update of the data</div>}
      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => setViewForm(false)}>
          Back to Catalog
        </button>
        <button className={styles.button} onClick={() => handlerUpdateMovie()}>
          Update/Create Movie
        </button>
      </div>
    </div>
  );
}

export default Form;
