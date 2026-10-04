import { useEffect, useState } from "react";

import AudioPlayer from "./AudioPlayer.jsx";
import styles from "./MeditationExercise.module.css";

// =========================
// EXERCISES
// =========================

const exercises = [
  {
    title: "Inner Calm",
    description:
      "Sit comfortably. Relax your shoulders and let your breath flow naturally.",
    image: "/img/meditation1.png",
  },
  {
    title: "Tree Balance",
    description:
      "Find a comfortable balance and focus on a steady point. Keep your breathing natural.",
    image: "/img/meditation2.png",
  },
];

// =========================
// FORMAT TIMER
// =========================

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

// =========================
// MEDITATION SESSION
// =========================

function MeditationExercise({ onClose }) {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [phase, setPhase] = useState("info");

  const [duration, setDuration] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);

  const [countdown, setCountdown] = useState(3);
  const [paused, setPaused] = useState(false);

  const exercise = exercises[currentExercise];

  const isLastExercise =
    currentExercise === exercises.length - 1;

  const progress = Math.min(
    100,
    Math.max(0, ((duration - timeLeft) / duration) * 100)
  );

  // =========================
  // BLOCK BACKGROUND SCROLL
  // =========================

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // =========================
  // VISUAL COUNTDOWN
  // =========================

  useEffect(() => {
    if (phase !== "countdown") return;

    const timeout = setTimeout(() => {
      if (countdown > 1) {
        setCountdown((previous) => previous - 1);
      } else {
        setPhase("exercise");
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [phase, countdown]);

  // =========================
  // EXERCISE TIMER
  // =========================

  useEffect(() => {
    if (phase !== "exercise" || paused) return;

    const timeout = setTimeout(() => {
      if (timeLeft <= 1) {
        setTimeLeft(0);
        setPhase("finished");
      } else {
        setTimeLeft((previous) => previous - 1);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [phase, paused, timeLeft]);

  // =========================
  // START EXERCISE
  // =========================

  function startExercise() {
    setTimeLeft(duration);
    setCountdown(3);
    setPaused(false);
    setPhase("countdown");
  }

  // =========================
  // NEXT EXERCISE
  // =========================

  function nextExercise() {
    if (isLastExercise) return;

    setCurrentExercise((previous) => previous + 1);
    setTimeLeft(duration);
    setCountdown(3);
    setPaused(false);
    setPhase("info");
  }

  // =========================
  // RENDER
  // =========================

  return (
    <section
      className={styles.exercise}
      role="dialog"
      aria-modal="true"
      aria-label={`${exercise.title} meditation session`}
      style={{
        backgroundImage: `url("${exercise.image}")`,
      }}
    >
      {/* TOP CONTROLS */}

      <header className={styles.topbar}>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close meditation"
        >
          ✕
        </button>

        <div className={styles.music}>
          <AudioPlayer
            shouldPlay={phase === "exercise" && !paused}
          />
        </div>
      </header>

      {/* SESSION NUMBER */}

      <div className={styles.exerciseLabel}>
        CHIKARA MIND

        <span>
          {currentExercise + 1} / {exercises.length}
        </span>
      </div>

      {/* VISUAL COUNTDOWN */}

      {phase === "countdown" && (
        <div className={styles.countdown}>
          <span>Get comfortable</span>

          <strong>{countdown}</strong>

          <p>Your moment begins now.</p>
        </div>
      )}

      {/* BOTTOM CONTENT */}

      <div className={styles.bottomPanel}>
        {/* EXERCISE INFORMATION */}

        {phase === "info" && (
          <div className={styles.info}>
            <span className={styles.eyebrow}>
              A MOMENT FOR YOURSELF
            </span>

            <h1>{exercise.title}</h1>

            <p className={styles.description}>
              {exercise.description}
            </p>

            <div className={styles.actions}>
              <label className={styles.duration}>
                <span>Duration</span>

                <select
                  value={duration}
                  onChange={(event) => {
                    setDuration(Number(event.target.value));
                  }}
                >
                  <option value={15}>15 sec · Test</option>
                  <option value={60}>1 minute</option>
                  <option value={180}>3 minutes</option>
                  <option value={300}>5 minutes</option>
                  <option value={600}>10 minutes</option>
                </select>
              </label>

              <button
                type="button"
                className={styles.primaryButton}
                onClick={startExercise}
              >
                Begin →
              </button>
            </div>
          </div>
        )}

        {/* ACTIVE EXERCISE */}

        {phase === "exercise" && (
          <div className={styles.active}>
            <div className={styles.timerRow}>
              <div>
                <span className={styles.eyebrow}>
                  {paused ? "TAKE YOUR TIME" : "STAY PRESENT"}
                </span>

                <h1>{exercise.title}</h1>
              </div>

              <span className={styles.timer}>
                {formatTime(timeLeft)}
              </span>
            </div>

            <div
              className={styles.progress}
              role="progressbar"
              aria-label="Exercise progress"
              aria-valuemin={0}
              aria-valuemax={duration}
              aria-valuenow={duration - timeLeft}
            >
              <div
                className={styles.progressFill}
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <div className={styles.sessionActions}>
              <p>
                {paused
                  ? "Continue whenever you feel ready."
                  : "Breathe. Relax. Stay present."}
              </p>

              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => {
                  setPaused((previous) => !previous);
                }}
              >
                {paused ? "Resume" : "Pause"}
              </button>
            </div>
          </div>
        )}

        {/* EXERCISE FINISHED */}

        {phase === "finished" && (
          <div
            className={styles.finished}
            aria-live="polite"
          >
            <span className={styles.eyebrow}>
              {isLastExercise
                ? "SESSION COMPLETE"
                : "EXERCISE COMPLETE"}
            </span>

            <h1>A little more balanced.</h1>

            <p className={styles.description}>
              Take a slow breath and notice how you feel.
            </p>

            <div className={styles.actions}>
              {!isLastExercise && (
                <button
                  type="button"
                  className={styles.primaryButton}
                  onClick={nextExercise}
                >
                  Next exercise →
                </button>
              )}

              <button
                type="button"
                className={
                  isLastExercise
                    ? styles.primaryButton
                    : styles.secondaryButton
                }
                onClick={onClose}
              >
                Finish
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default MeditationExercise;