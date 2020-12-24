import React,{useState} from "react";
import styles from "./card.module.css";
import movie from '../../assets/photo.jpeg';
function Catalog({dataCard, onHandler} ) {
    const [viewImg, setViewImg]= useState(true)


    return (
    <div>
        <div
            tabIndex={1}
            onFocus={(e) => {
                if (e.currentTarget === e.target) {
                    console.log('focused self', dataCard.id);
                    setViewImg(false)
                }
            }}
            onBlur={(e) => {
                if (e.currentTarget === e.target) {
                    setTimeout(()=>{
                        console.log('unfocused self', dataCard.id);
                        setViewImg(true)
                    },500)

                }
            }}
        >
            {viewImg?<img src={movie} alt="Movie" className={styles.img}/>:
                <div><h4 className={styles.input}>Title: {dataCard.title}</h4>
                <h2 className={styles.input}> Duration: {dataCard.duration} Mins</h2>
                <h2 className={styles.input}>Date Published: {dataCard.yearOfPublished}</h2>
                    <button onClick={()=>onHandler(dataCard)}>View/Edit Detailed</button>
                </div>}

      </div>
    </div>
  );
}

export default Catalog;
