import { useEffect, useState } from "react";

import AudioPlayer from "../components/AudioPlayer.jsx";
import styles from "./Breathe.module.css";

const pathSettings = {
  body: {
    title: "Ground Yourself",
    description: "Relax your shoulders. Feel your body.",
    color: "#a8c39a",
  },
  mind: {
    title: "Clear Your Mind",
    description: "Bring your attention back to your breath.",
    color: "#f3efe5",
  },
  soul: {
    title: "Find Your Stillness",
    description: "Give yourself a quiet moment.",
    color: "#c6a96b",
  },
};

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remaining
  ).padStart(2, "0")}`;
}

function Breathe({ path = "mind", onGoHome }) {
  const normalizedPath = String(path).toLowerCase();
  const settings = pathSettings[normalizedPath] ?? pathSettings.mind;

  const [duration, setDuration] = useState(60);
  const [elapsed, setElapsed] = useState(0);
  const [phase, setPhase] = useState("info");
  const [paused, setPaused] = useState(false);

  const running = phase === "exercise" && !paused;
  const timeLeft = Math.max(0, duration - elapsed);

  // Each cycle: 4 seconds inhale + 4 seconds exhale.
  const cycleSecond = elapsed % 8;
  const inhaling = cycleSecond < 4;

  const breathSeconds = inhaling
    ? 4 - cycleSecond
    : 8 - cycleSecond;

  // Session timer.
  useEffect(() => {
    if (!running) return;

    const timeout = setTimeout(() => {
      const nextElapsed = elapsed + 1;

      setElapsed(nextElapsed);

      if (nextElapsed >= duration) {
        setPhase("finished");
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [running, elapsed, duration]);

  function startSession() {
    setElapsed(0);
    setPaused(false);
    setPhase("exercise");
  }

  function finishSession() {
    setPaused(false);
    setPhase("finished");
  }

  const circleLabel =
    phase === "info"
      ? "Breathe"
      : phase === "finished"
        ? "Well done"
        : paused
          ? "Paused"
          : inhaling
            ? "Inhale"
            : "Exhale";

  return (
    <main
      className={styles.breathe}
      style={{ "--breath-color": settings.color }}
    >
      <header className={styles.topbar}>
        <button
          type="button"
          className={styles.backButton}
          onClick={onGoHome}
        >
          ← Home
        </button>

        <div className={styles.music}>
          <AudioPlayer shouldPlay={running} />
        </div>
      </header>

      <section className={styles.content}>
        <header className={styles.heading}>
          <span className={styles.eyebrow}>
            CHIKARA MIND · BREATHING
          </span>

          <h1>{settings.title}</h1>

          <p>{settings.description}</p>
        </header>

        {/* CSS creates the circle and its animation. */}
        <div className={styles.circleStage}>
          <div className={styles.outerRing} aria-hidden="true" />

          <div
            className={`${styles.circle} ${
              phase === "exercise" ? styles.animated : ""
            }`}
            style={{
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            <div className={styles.circleText}>
              <span>{circleLabel}</span>

              {phase === "exercise" && !paused && (
                <strong>{breathSeconds}</strong>
              )}
            </div>
          </div>
        </div>

        {phase === "info" && (
          <div className={styles.controls}>
            <p className={styles.hint}>
              Inhale for 4 seconds, exhale for 4 seconds.
              <br />
              Breathe comfortably, without forcing.
            </p>

            <div className={styles.actions}>
              <label className={styles.duration}>
                <span>Duration</span>

                <select
                  value={duration}
                  onChange={(event) =>
                    setDuration(Number(event.target.value))
                  }
                >
                  <option value={60}>1 minute</option>
                  <option value={180}>3 minutes</option>
                  <option value={300}>5 minutes</option>
                </select>
              </label>

              <button
                type="button"
                className={styles.primaryButton}
                onClick={startSession}
              >
                Begin →
              </button>
            </div>
          </div>
        )}

        {phase === "exercise" && (
          <div className={styles.controls}>
            <div className={styles.timer}>
              {formatTime(timeLeft)}
            </div>

            <p className={styles.hint}>
              {paused
                ? "Continue whenever you feel ready."
                : "Follow the circle at a comfortable pace."}
            </p>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={() => setPaused((previous) => !previous)}
              >
                {paused ? "Resume" : "Pause"}
              </button>

              <button
                type="button"
                className={styles.secondaryButton}
                onClick={finishSession}
              >
                Finish
              </button>
            </div>
          </div>
        )}

        {phase === "finished" && (
          <div className={styles.controls} aria-live="polite">
            <p className={styles.hint}>
              Take a moment to notice how you feel.
            </p>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={startSession}
              >
                Breathe again
              </button>

              <button
                type="button"
                className={styles.secondaryButton}
                onClick={onGoHome}
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Breathe;