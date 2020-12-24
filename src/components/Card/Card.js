import React, { useState } from "react";
import styles from "./card.module.css";

import movie from "../../assets/photo.jpeg";
function Catalog({ dataCard, onHandler }) {
  const [viewImg, setViewImg] = useState(true);

  return (
    <div>
      <div
        tabIndex={1}
        onFocus={(e) => {
          if (e.currentTarget === e.target) {
            setViewImg(false);
          }
        }}
        onBlur={(e) => {
          if (e.currentTarget === e.target) {
            setTimeout(() => {
              setViewImg(true);
            }, 300);
          }
        }}
        onMouseOver={(e) => {
          setViewImg(false);
        }}
        onMouseOut={(e) => {
          setViewImg(true);
        }}
      >
        <div
          className={[viewImg ? styles.displayBlock : styles.displayNone].join(
            " "
          )}
        >
          <div>
            <h4 className={styles.input}> {dataCard.title || "Movie"}</h4>
            <img src={movie} alt="Movie" className={styles.img} />
          </div>
        </div>
        <div
          className={[
            viewImg === false ? styles.displayBlock : styles.displayNone,
          ].join(" ")}
        >
          <div>
            <h4 className={styles.input}>Title: {dataCard.title}</h4>
            <h2 className={styles.input}> Duration: {dataCard.duration} Mins</h2>
            <h2 className={styles.input}>
              Date Published: {dataCard.yearOfPublished} Year
            </h2>
            <button
              className={styles.button}
              onClick={() => onHandler(dataCard)}
            >
              View/Edit Detailed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Catalog;
