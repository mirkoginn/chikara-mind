import { useState } from "react";
import {
  X,
  Trash2,
  BookOpen,
  ArrowLeft
} from "lucide-react";

import styles from "./modalJournal.module.css";


function ModalJournal({ onClose }) {

  // Read journal entries when the modal opens
  const [entries, setEntries] = useState(() => {

    const savedEntries = localStorage.getItem("journalEntries");

    return savedEntries
      ? JSON.parse(savedEntries)
      : [];

  });


  // Delete a journal entry
  function deleteEntry(id) {

    const updatedEntries = entries.filter(
      (entry) => entry.id !== id
    );

    setEntries(updatedEntries);

    localStorage.setItem(
      "journalEntries",
      JSON.stringify(updatedEntries)
    );

  }


  return (

    <div
      className={styles.overlay}
      onClick={onClose}
    >

      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
      >


        {/* =========================
            HEADER
        ========================= */}

        <div className={styles.header}>

          <div className={styles.titleContainer}>

            <BookOpen size={22} />

            <div>

              <p className={styles.label}>
                CHIKARA MIND
              </p>

              <h2>
                Your Journal
              </h2>

            </div>

          </div>


          <button
            className={styles.closeButton}
            onClick={onClose}
            title="Close journal"
          >

            <X size={22} />

          </button>

        </div>



        {/* =========================
            JOURNAL INFO
        ========================= */}

        <div className={styles.journalInfo}>

          <span>

            {entries.length}{" "}

            {entries.length === 1
              ? "entry"
              : "entries"
            }

          </span>


          <span>
            Your moments, thoughts and emotions.
          </span>

        </div>



        {/* =========================
            JOURNAL CONTENT
        ========================= */}

        <div className={styles.entriesContainer}>


       {/* JOURNAL INTRO */}

{entries.length > 0 && (

  <div className={styles.journalMessage}>

    <p className={styles.journalMessageLabel}>
      YOUR JOURNEY
    </p>

    <h3 className={styles.journalMessageTitle}>
      A space for the moments that matter.
    </h3>

    <p className={styles.journalMessageText}>
      Look back at your thoughts, emotions and small moments along the way.
    </p>

  </div>

)}
          


          {/* EMPTY JOURNAL */}

          {entries.length === 0 ? (

            <div className={styles.emptyJournal}>

              <BookOpen size={35} />

              <h3>
                Your journal is empty
              </h3>

              <p>
                Your daily thoughts and emotions
                will appear here.
              </p>

            </div>

          ) : (


            /* JOURNAL ENTRIES */

            entries.map((entry) => (

              <div
                className={styles.entry}
                key={entry.id}
              >


                {/* =========================
                    ENTRY HEADER
                ========================= */}

                <div className={styles.entryHeader}>


                  {/* DATE AND TIME */}

                  <div className={styles.date}>

                    <span>
                      {entry.date}
                    </span>

                    <span className={styles.dot}>
                      •
                    </span>

                    <span>
                      {entry.time}
                    </span>

                  </div>



                  {/* DELETE BUTTON */}

                  <button
                    className={styles.deleteButton}
                    onClick={() => deleteEntry(entry.id)}
                    title="Delete entry"
                  >

                    <Trash2 size={17} />

                  </button>

                </div>



                {/* =========================
                    ENTRY CONTENT
                ========================= */}

                <div className={styles.entryContent}>


                  {/* MOOD */}

                  <div className={styles.mood}>
                    {entry.mood}
                  </div>


                  {/* USER THOUGHT */}

                  <p>
                    {entry.text}
                  </p>


                </div>


              </div>

            ))

          )}

        </div>



        {/* =========================
            STICKY FOOTER
        ========================= */}

        <div className={styles.stickyFooter}>

          <button
            className={styles.backButton}
            onClick={onClose}
          >

            <ArrowLeft size={17} />

            <span>
              Back to Home
            </span>

          </button>

        </div>


      </div>

    </div>

  );

}


export default ModalJournal;