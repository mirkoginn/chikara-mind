import { useState } from "react";
import styles from "./moodJournal.module.css";

function MoodJournal() {
  const [selectedMood, setSelectedMood] = useState("");
  const [journalText, setJournalText] = useState("");

  const moods = [
    { emoji: "😄", label: "Great" },
    { emoji: "😌", label: "Calm" },
    { emoji: "😐", label: "Neutral" },
    { emoji: "😔", label: "Sad" },
    { emoji: "😣", label: "Stressed" }
  ];


  // Save a new journal entry
  function handleSave() {

    // Do not save if no mood has been selected
    if (!selectedMood) {
      alert("Please select your mood.");
      return;
    }

    // Do not save if the text is empty
    if (!journalText.trim()) {
      alert("Please write something about your day.");
      return;
    }


    // Create current date and time
    const now = new Date();


    // Create the new journal entry
    const newEntry = {
      id: Date.now(),

      date: now.toLocaleDateString("en-GB"),

      time: now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit"
      }),

      mood: selectedMood,

      text: journalText.trim()
    };


    // Read old entries from localStorage
    const savedEntries =
      JSON.parse(localStorage.getItem("journalEntries")) || [];


    // Add the new entry
    const updatedEntries = [
      newEntry,
      ...savedEntries
    ];


    // Save the updated array
    localStorage.setItem(
      "journalEntries",
      JSON.stringify(updatedEntries)
    );


    // Clear the form
    setSelectedMood("");
    setJournalText("");

    console.log("Journal entry saved:", newEntry);
  }


  return (
    <section className={styles.container}>

      {/* Mood card */}
      <div className={styles.card}>

        <p className={styles.label}>
          DAILY CHECK-IN
        </p>

        <h2>How do you feel today?</h2>

        <p className={styles.description}>
          Take a moment to notice how you feel.
        </p>


        <div className={styles.moods}>

          {moods.map((mood) => (

            <button
              key={mood.label}
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



      {/* Journal card */}
      <div className={styles.card}>

        <p className={styles.label}>
          YOUR THOUGHTS
        </p>

        <h2>A thought for today</h2>

        <p className={styles.description}>
          Write down what is on your mind.
        </p>


        <textarea
          className={styles.textarea}
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
            className={styles.saveButton}
            onClick={handleSave}
          >
            Save to Diary
            <span>→</span>
          </button>

        </div>

      </div>

    </section>
  );
}

export default MoodJournal;