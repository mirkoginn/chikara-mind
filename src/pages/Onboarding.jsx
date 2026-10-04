import { useState } from "react";
import { questions } from "../data/question";
import styles from "./Onboarding.module.css";

function Onboarding({ onComplete }) {
  // Name state
  const [name, setName] = useState("");
  const [nameCompleted, setNameCompleted] = useState(false);

  // current question index
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Scores p
  const [scores, setScores] = useState({
    body: 0,
    mind: 0,
    soul: 0,
  });

  // Final result
  const [result, setResult] = useState(null);

  const question = questions[currentQuestion];

  const handleAnswer = (path) => {
    const updatedScores = {
      ...scores,
      [path]: scores[path] + 1,
    };

    setScores(updatedScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(updatedScores);
    }
  };

  const calculateResult = (finalScores) => {
    let finalPath;

    if (
      finalScores.body >= finalScores.mind &&
      finalScores.body >= finalScores.soul
    ) {
      finalPath = "body";
    } else if (finalScores.mind >= finalScores.soul) {
      finalPath = "mind";
    } else {
      finalPath = "soul";
    }

    setResult(finalPath);
  };

  // Name input screen
  if (!nameCompleted) {
    return (
      <main className={styles.onboarding}>
        <div className={styles.questionCard}>

          <p className={styles.progress}>
            BEFORE WE BEGIN
          </p>

          <h2 className={styles.question}>
            What should we call you?
          </h2>

          <input
            className={styles.nameInput}
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
          />

          <button
            className={styles.continueButton}
            onClick={() => setNameCompleted(true)}
            disabled={!name.trim()}
          >
            Continue
          </button>

        </div>
      </main>
    );
  }

  // Result screen
  if (result) {
  return (
    <main className={styles.onboarding}>
      <div className={styles.questionCard}>

        <p className={styles.progress}>
          YOUR PATH
        </p>

        <h2 className={styles.question}>
          {name}, your path is {result}
        </h2>

        <p>
          Body: {scores.body} | Mind: {scores.mind} | Soul: {scores.soul}
        </p>

        <button
          className={styles.continueButton}
          onClick={() => onComplete(name, result)}
        >
          Enter Chikara Mind
        </button>

      </div>
    </main>
  );
}

  // QUESTIONS
  return (
    <main className={styles.onboarding}>
      <div className={styles.questionCard}>

        <p className={styles.progress}>
          Question {currentQuestion + 1} of {questions.length}
        </p>

        <h2 className={styles.question}>
          {question.question}
        </h2>

        <div className={styles.answers}>
          {question.answers.map((answer, index) => (
            <button
              key={index}
              className={styles.answer}
              onClick={() => handleAnswer(answer.path)}
            >
              {answer.text}
            </button>
          ))}
        </div>

        <div className={styles.progressBar}>
          <div
            className={styles.progressValue}
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

      </div>
    </main>
  );
}

export default Onboarding;