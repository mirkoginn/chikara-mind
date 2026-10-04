import { useState } from "react";

import {
  House,
  Leaf,
  BookOpen,
  ChartNoAxesColumnIncreasing,
  Settings,
  Brain,
  Heart,
  Activity
} from "lucide-react";

import styles from "./navbar.module.css";
import ModalJournal from "./modalJournal.jsx";


function Navbar({ name, path, onPathChange, onGoHome }) {

  const [openMenu, setOpenMenu] = useState(null);
  const [journalOpen, setJournalOpen] = useState(false);


  // Open or close a navbar menu
  function toggleMenu(menu) {
    setOpenMenu(openMenu === menu ? null : menu);
  }


  return (
    <>

      {/* =========================
          NAVBAR
      ========================= */}

      <nav className={styles.navbar}>


        {/* =========================
            BRAND
        ========================= */}

        <div className={styles.brand}>

          <img
           src={`${import.meta.env.BASE_URL}img/logo.png`}
            alt="Chikara Mind"
            className={styles.logo}
          />

        </div>


        {/* =========================
            NAVIGATION
        ========================= */}

        <div className={styles.links}>


          {/* =========================
              HOME
          ========================= */}

          <button
            className={styles.navLink}
            onClick={onGoHome}
          >

            <House size={20} />

            <span>Home</span>

          </button>


          {/* =========================
              PATHS
          ========================= */}

          <div className={styles.menuWrapper}>

            <button
              className={styles.navLink}
              onClick={() => toggleMenu("paths")}
            >

              <Leaf size={20} />

              <span>Paths</span>

            </button>


            {openMenu === "paths" && (

              <div className={styles.pathsMenu}>

                <p className={styles.menuTitle}>
                  CHOOSE YOUR PATH
                </p>


                <div className={styles.pathsContainer}>


                  {/* BODY */}

                  <button
                    className={styles.pathItem}
                    onClick={() => onPathChange("body")}
                  >

                    <div className={styles.pathIcon}>
                      <Activity size={22} />
                    </div>

                    <span>Body</span>

                  </button>


                  {/* MIND */}

                  <button
                    className={styles.pathItem}
                    onClick={() => onPathChange("mind")}
                  >

                    <div className={styles.pathIcon}>
                      <Brain size={22} />
                    </div>

                    <span>Mind</span>

                  </button>


                  {/* SOUL */}

                  <button
                    className={styles.pathItem}
                    onClick={() => onPathChange("soul")}
                  >

                    <div className={styles.pathIcon}>
                      <Heart size={22} />
                    </div>

                    <span>Soul</span>

                  </button>

                </div>


                {/* CURRENT PATH */}

                {path && (

                  <p className={styles.currentPath}>

                    Your path: <strong>{path}</strong>

                  </p>

                )}

              </div>

            )}

          </div>


          {/* =========================
              JOURNAL
          ========================= */}

          <button
            className={styles.navLink}
            onClick={() => setJournalOpen(true)}
          >

            <BookOpen size={20} />

            <span>Diary</span>

          </button>


          {/* =========================
              STATISTICS
          ========================= */}

          <div className={styles.menuWrapper}>

            <button
              className={styles.navLink}
              onClick={() => toggleMenu("statistics")}
            >

              <ChartNoAxesColumnIncreasing size={20} />

              <span>Statistics</span>

            </button>


            {openMenu === "statistics" && (

              <div className={styles.statisticsMenu}>

                <p className={styles.menuTitle}>
                  THIS WEEK
                </p>


                <div className={styles.statItem}>

                  <span>Meditation</span>

                  <strong>4</strong>

                </div>


                <div className={styles.statItem}>

                  <span>Breathing</span>

                  <strong>3</strong>

                </div>


                <div className={styles.statItem}>

                  <span>Minutes</span>

                  <strong>47</strong>

                </div>


                <div className={styles.streak}>
                  🔥 3 day streak
                </div>

              </div>

            )}

          </div>


          {/* =========================
              SETTINGS
          ========================= */}

          <div className={styles.menuWrapper}>

            <button
              className={styles.navLink}
              onClick={() => toggleMenu("settings")}
            >

              <Settings size={20} />

              <span>Settings</span>

            </button>


            {openMenu === "settings" && (

              <div className={styles.settingsMenu}>


                {/* LANGUAGE */}

                <div className={styles.settingItem}>

                  <span>Language</span>

                  <select defaultValue="English">

                    <option>English</option>

                    <option>Italian</option>

                  </select>

                </div>


                {/* SOUND */}

                <div className={styles.settingItem}>

                  <span>Sound</span>

                  <span className={styles.comingSoon}>
                    Coming soon
                  </span>

                </div>


                {/* THEME */}

                <div className={styles.settingItem}>

                  <span>Theme</span>

                  <span className={styles.comingSoon}>
                    Coming soon
                  </span>

                </div>

              </div>

            )}

          </div>

        </div>


        {/* =========================
            USER
        ========================= */}

        <div className={styles.user}>

          <span>{name}</span>

        </div>


      </nav>


      {/* =========================
          JOURNAL MODAL
      ========================= */}

      {journalOpen && (

        <ModalJournal
          onClose={() => setJournalOpen(false)}
        />

      )}

    </>
  );
}


export default Navbar;