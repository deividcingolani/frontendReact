import React, { useState,useEffect } from "react";
import styles from "./card.module.css";

import movie from "../../assets/photo.jpeg";
import christmas from "../../assets/christmas.jpeg";
import spartanos from "../../assets/spartanos.jpeg";
import soccer from "../../assets/soccer.jpeg";

function getSrc(random) {
    switch (true) {
    case (random === 1):
      return movie
      case (random === 2):
        return spartanos
      case (random === 3):
        return christmas
      case (random === 4):
        return soccer
    default:
      return soccer
    }

}

function Catalog({ dataCard, onHandler }) {
  const [viewImg, setViewImg] = useState(true);
  const [random, setRandom] = useState(1);
useEffect(()=>{
  setRandom(Math.floor(Math.random() * 5) + 1 )
},[setRandom])
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
            <img src={getSrc(random) } alt="Movie" className={styles.img} />
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
