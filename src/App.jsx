import { useState } from "react";

import Welcome from "./pages/Welcome";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/home";
import Meditate from "./pages/meditate";
import Breathe from "./pages/Breathe.jsx";

import "./App.css";

function App() {
  const [page, setPage] = useState("welcome");
  const [user, setUser] = useState(null);

  const handleStart = () => {
    setPage("onboarding");
  };

  const handleGoHome = () => {
    setPage("home");
  };

  const handleGoMeditate = () => {
    setPage("meditate");
  };

  const handleGoBreathe = () => {
    setPage("breathe");
  };

  const handleOnboardingComplete = (name, path) => {
    setUser({
      name: name,
      path: path,
    });

    setPage("home");
  };

  const handlePathChange = (newPath) => {
    setUser((previousUser) => ({
      ...previousUser,
      path: newPath,
    }));
  };

  return (
    <div className="App">
      {page === "welcome" && (
        <Welcome onStart={handleStart} />
      )}

      {page === "onboarding" && (
        <Onboarding
          onComplete={handleOnboardingComplete}
        />
      )}

      {page === "home" && (
        <Home
          user={user}
          onPathChange={handlePathChange}
          onGoHome={handleGoHome}
          onGoMeditate={handleGoMeditate}
          onGoBreathe={handleGoBreathe}
        />
      )}

      {page === "meditate" && (
        <Meditate
          user={user}
          onPathChange={handlePathChange}
          onGoHome={handleGoHome}
        />
      )}

      {page === "breathe" && (
        <Breathe onGoHome={handleGoHome} />
      )}
    </div>
  );
}

export default App;