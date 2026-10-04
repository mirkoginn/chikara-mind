import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./quote.module.css";

function Quote() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    axios
      .get("https://dummyjson.com/quotes/random")
      .then((response) => {
        setQuote(response.data.quote);
        setAuthor(response.data.author);
      })
      .catch((error) => {
        console.error("Error loading quote:", error);
      });
  }, []);

  return (
    <div className={styles.quoteCard}>
      <p className={styles.label}>DAILY QUOTE</p>

      <blockquote className={styles.quote}>
        "{quote}"
      </blockquote>

      <p className={styles.author}>
        — {author}
      </p>
    </div>
  );
}

export default Quote;