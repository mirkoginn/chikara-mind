import { useEffect } from "react";
import styles from "./welcome.module.css";



function Welcome({ onStart }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      onStart();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onStart]);

  return (
    <main
      className={styles.welcome}
      
    >
      <div className={styles.content}>

        <img
          src={`${import.meta.env.BASE_URL}img/logo.png`}
          alt="Chikara Mind"
          className={styles.logo}
        />

        <div className={styles.loader}>
          <div className={styles.loaderBar}></div>
        </div>

        <p className={styles.loadingText}>
          Find your balance
        </p>

      </div>
    </main>
  );
}

export default Welcome;