import { useState } from "react";

import Navbar from "./navbar.jsx";
import MeditationExercise from "../components/MeditationExercise.jsx";

import styles from "./meditate.module.css";

// Inserisci gli URL completi dei video YouTube in "url".
// Puoi modificare liberamente titoli e descrizioni.
const yogaVideos = [
  {
    id: 1,
    title: "Mindful Breathing",
    description: "A ten-minute guided meditation focused on your breath.",
    url: "https://www.youtube.com/watch?v=ewfseuzt4VU",
  },
  {
    id: 2,
    title: "Beginner’s Mind",
    description: "Explore mindfulness through a gentle breathing practice.",
    url: "https://www.youtube.com/watch?v=-BacXMXwtjs",
  },
  {
    id: 3,
    title: "Morning Pause",
    description: "Take five minutes for yourself before starting your day.",
    url: "https://www.youtube.com/watch?v=YoCIO-z7hQU",
  },
  {
    id: 4,
    title: "A New Beginning",
    description: "Begin your morning with a guided moment of awareness.",
    url: "https://www.youtube.com/watch?v=vnKUYk-NqFo",
  },
  {
    id: 5,
    title: "Cultivate Gratitude",
    description: "A guided practice of gratitude for those who support you.",
    url: "https://www.youtube.com/watch?v=luQeML8MiHw",
  },
];

function Meditate({ user, onPathChange, onGoHome, path }) {
  const [exerciseOpen, setExerciseOpen] = useState(false);

  if (exerciseOpen) {
    return (
      <MeditationExercise
        onClose={() => setExerciseOpen(false)}
      />
    );
  }

  return (
    <main className={styles.meditate}>
      <Navbar
        user={user}
        path={path}
        onPathChange={onPathChange}
        onGoHome={onGoHome}
      />

      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>YOUR MOMENT OF PEACE</span>

          <h1>Meditate & Move</h1>

          <p>
            Take a moment for yourself. Find your calm through
            meditation and mindful movement.
          </p>
        </header>

        <section
          className={styles.cardGrid}
          aria-label="Meditation and yoga exercises"
        >
          {/* MEDITATION */}
          <article className={styles.card}>
            <div className={styles.imageContainer}>
              <img
                className={styles.cardImage}
                src={`${import.meta.env.BASE_URL}img/welcome.png`}
                alt="A peaceful setting for meditation"
              />

              <span className={styles.badge}>Meditation</span>
            </div>

            <div className={styles.cardContent}>
              <h2>Inner Calm</h2>

              <p>
                A meditation to slow down and reconnect with yourself.
              </p>

              <button
                type="button"
                className={styles.cardButton}
                onClick={() => setExerciseOpen(true)}
              >
                Start meditation
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </article>

          {/* FIVE YOGA VIDEOS */}
          {yogaVideos.map((video, index) => (
            <article className={styles.card} key={video.id}>
              <div
                className={`${styles.yogaCover} ${
                  styles[`yogaCover${index + 1}`]
                }`}
                aria-hidden="true"
              >
                <span className={styles.badge}>Yoga · YouTube</span>

                <span className={styles.coverNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className={styles.playIcon}>▶</span>

                <span className={styles.coverLabel}>MINDFUL MOVEMENT</span>
              </div>

              <div className={styles.cardContent}>
                <h2>{video.title}</h2>

                <p>{video.description}</p>

                {video.url.trim() ? (
                  <a
                    className={styles.cardButton}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Watch ${video.title} on YouTube in a new tab`}
                  >
                    Watch on YouTube
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    className={styles.cardButton}
                    disabled
                  >
                    Video coming soon
                  </button>
                )}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

export default Meditate;