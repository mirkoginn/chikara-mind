
import { Expand } from "lucide-react";
import styles from "./cards.module.css";


function Cards({ h2, imgSrc, p, onClick }) {

  return (
    <div className={styles.cards}>

      <img
        src={imgSrc}
        alt={h2}
      />

      <Expand className={styles.expandIcon} />

      <div className={styles.cardContent}>

        <h2>{h2}</h2>

        <p>{p}</p>

        <button
          className={styles.cardButton}
          onClick={onClick}
        >
          <span>Learn more →</span>
        </button>

      </div>

    </div>
  );
}


/* =========================
   FINAL DECORATIVE CARD
========================= */

export function UnderCard({ h2, imgSrc, p }) {

  return (
    <div className={styles.underCard}>

      <h2>{h2}</h2>

      <img
        src={imgSrc}
        alt=""
      />

      <p>{p}</p>

    </div>
  );
}


export default Cards;
