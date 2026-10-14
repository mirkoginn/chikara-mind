import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Welcome from "./pages/Welcome.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import Home from "./pages/Home.jsx";
import Meditate from "./pages/Meditate.jsx";
import Breathe from "./pages/Breathe.jsx";

import "./App.css";

function readSavedValue(key, fallback) {
  try {
    const savedValue = localStorage.getItem(key);

    return savedValue !== null
      ? JSON.parse(savedValue)
      : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(() => {
    const savedUser = readSavedValue("user", null);

    const validUser =
      savedUser &&
      typeof savedUser.name === "string" &&
      savedUser.name.trim() &&
      typeof savedUser.path === "string" &&
      savedUser.path.trim();

    return validUser ? savedUser : null;
  });

  // Usata solo quando apri l'app senza una rotta specifica.
  const [initialPage] = useState(() => {
    const savedPage = readSavedValue("page", "welcome");

    if (user) {
      const availablePages = ["home", "meditate", "breathe"];

      return availablePages.includes(savedPage)
        ? savedPage
        : "home";
    }

    return savedPage === "onboarding"
      ? "onboarding"
      : "welcome";
  });

  // Salva il profilo quando cambia.
  useEffect(() => {
    try {
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.warn("Impossibile salvare l'utente:", error);
    }
  }, [user]);

  // Salva la pagina indicata dall'URL.
  useEffect(() => {
    const currentPage = location.pathname.slice(1);

    const availablePages = [
      "welcome",
      "onboarding",
      "home",
      "meditate",
      "breathe",
    ];

    if (!availablePages.includes(currentPage)) return;

    try {
      localStorage.setItem("page", JSON.stringify(currentPage));
    } catch (error) {
      console.warn("Impossibile salvare la pagina:", error);
    }
  }, [location.pathname]);

  const handleStart = () => {
    navigate("/onboarding", { replace: true });
  };

  const handleGoHome = () => {
    navigate("/home");
  };

  const handleGoMeditate = () => {
    navigate("/meditate");
  };

  const handleGoBreathe = () => {
    navigate("/breathe");
  };

  const handleOnboardingComplete = (name, path) => {
    setUser({ name, path });

    // Se hai aperto un link a un esercizio,
    // dopo l'onboarding ti porta lì.
    const requestedPage = location.state?.from;
    const availablePages = ["/home", "/meditate", "/breathe"];

    navigate(
      availablePages.includes(requestedPage)
        ? requestedPage
        : "/home",
      { replace: true }
    );
  };

  const handlePathChange = (newPath) => {
    setUser((previousUser) => ({
      ...previousUser,
      path: newPath,
    }));
  };

  // Evita di aprire le pagine personali senza un profilo.
  function protectPage(component) {
    return user ? (
      component
    ) : (
      <Navigate
        to="/onboarding"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Navigate to={`/${initialPage}`} replace />}
        />

        <Route
          path="/welcome"
          element={
            user ? (
              <Navigate to="/home" replace />
            ) : (
              <Welcome onStart={handleStart} />
            )
          }
        />

        <Route
          path="/onboarding"
          element={
            user ? (
              <Navigate to="/home" replace />
            ) : (
              <Onboarding onComplete={handleOnboardingComplete} />
            )
          }
        />

        <Route
          path="/home"
          element={protectPage(
            <Home
              user={user}
              onPathChange={handlePathChange}
              onGoHome={handleGoHome}
              onGoMeditate={handleGoMeditate}
              onGoBreathe={handleGoBreathe}
            />
          )}
        />

        <Route
          path="/meditate"
          element={protectPage(
            <Meditate
              user={user}
              onPathChange={handlePathChange}
              onGoHome={handleGoHome}
            />
          )}
        />

        <Route
          path="/breathe"
          element={protectPage(
            <Breathe
              path={user?.path}
              onGoHome={handleGoHome}
            />
          )}
        />

        <Route
          path="*"
          element={
            <Navigate
              to={user ? "/home" : "/welcome"}
              replace
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;