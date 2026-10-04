import Navbar from "./navbar.jsx";
import styles from "./home.module.css";
import Cards from "./cards.jsx";
import Quote from "./quotecard.jsx";
import MoodJournal from "./moodJournal.jsx";
import { UnderCard } from "./cards.jsx";

function Home({
  user,
  onPathChange,
  onGoHome,
  onGoMeditate,
  onGoBreathe,
}) {
  return (
    <div className={styles.home}>
      {/* NAVBAR */}

      <Navbar
        name={user?.name}
        path={user?.path}
        onPathChange={onPathChange}
        onGoHome={onGoHome}
      />

      {/* WELCOME SECTION */}

      <div className={styles.welcomeSection}>
        <div className={styles.content}>
          <p className={styles.welcome}>
            WELCOME BACK
          </p>

          <h1>
            Good evening, {user?.name}
          </h1>

          <h2>
            Welcome to Chikara Mind
          </h2>

          <p className={styles.subtitle}>
            A moment for yourself, a step toward balance.
          </p>

          <p className={styles.path}>
            Your path is: <span>{user?.path}</span>
          </p>
        </div>

        <div className={styles.quoteContainer}>
          <Quote />
        </div>
      </div>

      {/* MAIN CARDS */}

      <div className={styles.cardsContainer}>
        <Cards
          h2="Meditate"
          p="Find your inner balance and take a moment for yourself."
          src={`${import.meta.env.BASE_URL}img/meditate.png`}
          onClick={onGoMeditate}
        />

        <Cards
          h2="Breathe"
          p="Slow down, breathe deeply and reconnect with yourself."
          src={`${import.meta.env.BASE_URL}img/breathe.png`}
          onClick={onGoBreathe}
        />
      </div>

      {/* MOOD JOURNAL */}

      <MoodJournal />

      {/* FINAL CARD */}

      <UnderCard
        h2="A little further every day."
        src={`${import.meta.env.BASE_URL}img/final-card.png`}
        p="BODY  •  MIND  •  SOUL"
      />
    </div>
  );
}

export default Home;