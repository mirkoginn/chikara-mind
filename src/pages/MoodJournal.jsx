import { useEffect, useRef, useState } from "react";

import ModalJournal from "./ModalJournal.jsx";
import styles from "./moodJournal.module.css";

function MoodJournal() {
  const [selectedMood, setSelectedMood] = useState("");
  const [journalText, setJournalText] = useState("");
  const [savedModalOpen, setSavedModalOpen] = useState(false);
  const [journalOpen, setJournalOpen] = useState(false);

  const savedDialogRef = useRef(null);

  const moods = [
    { emoji: "😄", label: "Great" },
    { emoji: "😌", label: "Calm" },
    { emoji: "😐", label: "Neutral" },
    { emoji: "😔", label: "Sad" },
    { emoji: "😣", label: "Stressed" },
  ];

  // Apre l'avviso e mantiene il focus al suo interno.
  useEffect(() => {
    const dialog = savedDialogRef.current;

    if (!savedModalOpen || !dialog) return;

    dialog.showModal();

    return () => {
      if (dialog.open) {
        dialog.close();
      }
    };
  }, [savedModalOpen]);

  function handleSave() {
    if (!selectedMood) {
      alert("Please select your mood.");
      return;
    }

    if (!journalText.trim()) {
      alert("Please write something about your day.");
      return;
    }

    const now = new Date();

    const newEntry = {
      id: crypto.randomUUID(),
      date: now.toLocaleDateString("en-GB"),
      time: now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      mood: selectedMood,
      text: journalText.trim(),
    };

    try {
      const savedEntries =
        JSON.parse(localStorage.getItem("journalEntries")) || [];

      if (!Array.isArray(savedEntries)) {
        throw new Error("Invalid journal data.");
      }

      localStorage.setItem(
        "journalEntries",
        JSON.stringify([newEntry, ...savedEntries])
      );
    } catch (error) {
      console.error("Unable to save journal entry:", error);

      alert(
        "Unable to save your entry. Your text has been kept. Please try again."
      );

      return;
    }

    // Mostra la conferma solo dopo il salvataggio riuscito.
    setSelectedMood("");
    setJournalText("");
    setSavedModalOpen(true);
  }

  function handleGoToDiary() {
    setSavedModalOpen(false);
    setJournalOpen(true);
  }

  return (
    <>
      <section className={styles.container}>
        {/* MOOD CARD */}
        <div className={styles.card}>
          <p className={styles.label}>DAILY CHECK-IN</p>

          <h2>How do you feel today?</h2>

          <p className={styles.description}>
            Take a moment to notice how you feel.
          </p>

          <div className={styles.moods}>
            {moods.map((mood) => (
              <button
                type="button"
                key={mood.label}
                aria-pressed={selectedMood === mood.emoji}
                className={`${styles.moodButton} ${
                  selectedMood === mood.emoji
                    ? styles.selected
                    : ""
                }`}
                onClick={() => setSelectedMood(mood.emoji)}
              >
                <span className={styles.emoji}>
                  {mood.emoji}
                </span>

                <span className={styles.moodLabel}>
                  {mood.label}
                </span>
              </button>
            ))}
          </div>

          {selectedMood && (
            <p className={styles.selectedMood}>
              Today you feel <span>{selectedMood}</span>
            </p>
          )}
        </div>

        {/* JOURNAL CARD */}
        <div className={styles.card}>
          <p className={styles.label}>YOUR THOUGHTS</p>

          <h2>A thought for today</h2>

          <p className={styles.description}>
            Write down what is on your mind.
          </p>

          <textarea
            className={styles.textarea}
            aria-label="Your thoughts"
            placeholder="Write something about your day..."
            value={journalText}
            onChange={(event) =>
              setJournalText(event.target.value)
            }
            maxLength={300}
          />

          <div className={styles.footer}>
            <span className={styles.counter}>
              {journalText.length}/300
            </span>

            <button
              type="button"
              className={styles.saveButton}
              onClick={handleSave}
            >
              Save to Diary
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* SAVE CONFIRMATION */}
      <dialog
        ref={savedDialogRef}
        className={styles.savedDialog}
        aria-labelledby="journal-saved-title"
        aria-describedby="journal-saved-description"
        onCancel={() => setSavedModalOpen(false)}
        onClose={() => setSavedModalOpen(false)}
      >
        <span className={styles.savedIcon} aria-hidden="true">
          ✓
        </span>

        <p className={styles.label}>YOUR MOMENT IS SAFE</p>

        <h2 id="journal-saved-title">
          Saved to your Diary
        </h2>

        <p
          id="journal-saved-description"
          className={styles.savedDescription}
        >
          Your mood and thoughts have been saved.
          You can find them in the Diary section.
        </p>

        <div className={styles.savedActions}>
          <button
            type="button"
            className={styles.savedOkButton}
            onClick={() => setSavedModalOpen(false)}
          >
            OK
          </button>

          <button
            type="button"
            className={styles.savedDiaryButton}
            onClick={handleGoToDiary}
          >
            Go to Diary
            <span aria-hidden="true"> →</span>
          </button>
        </div>
      </dialog>

      {/* EXISTING DIARY */}
      {journalOpen && (
        <ModalJournal
          onClose={() => setJournalOpen(false)}
        />
      )}
    </>
  );
}

export default MoodJournal;