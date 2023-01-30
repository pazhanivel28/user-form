import React from "react";
import { useState, useEffect } from "react";
import { quiz } from "./constant";

function MCQpage() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const { questions } = quiz;
  const { question, choices, correctAnswer } = questions[activeQuestion];
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);

    if (answer === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };
  const onClickNext = () => {
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );
    setSelectedAnswerIndex(null);
    if (questions.length - 1 !== activeQuestion) {
      setTime(10);
      setActiveQuestion((prev) => prev + 1);
    } else {
      //   setActiveQuestion(0);
      setShowResult(true);
    }
  };

  const [time, setTime] = useState(10);
  useEffect(() => {
    let timer = setTimeout(() => {
      if (questions.length - 1 === activeQuestion) {
        clearTimeout(timer);
      }
      onClickNext();
    }, 10000);
    return () => {
      clearTimeout(timer);
    };
  }, [activeQuestion]);

  useEffect(() => {
    let timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    if (time === 1) {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [time]);

  return (
    <div>
      {!showResult && (
        <div>
          {/* <div>
              {activeQuestion + 1}/{questions.length + 1}
            </div> */}

          <div>
            {activeQuestion + 1}.{question}
          </div>
          <div>
            {choices.map((answer, index) => {
              return (
                <div key={answer}>
                  <label>
                    <input
                      type="checkbox"
                      checked={index === selectedAnswerIndex}
                      onChange={() => onAnswerSelected(answer, index)}
                    />
                    {answer}
                  </label>
                </div>
              );
            })}
          </div>

          <div>
            <button
              onClick={onClickNext}
              disabled={selectedAnswerIndex === null}
            >
              {activeQuestion !== questions.length - 1 ? "Next" : "Finish"}
            </button>
          </div>
          <h3>Timer: {time}</h3>
        </div>
      )}

      {showResult && (
        <div>
          <h1>Results</h1>
          <div>Score:{result.score}</div>
          <div>Correct Answers:{result.correctAnswers}</div>
          <div>Wrong Answers:{result.wrongAnswers}</div>
        </div>
      )}
    </div>
  );
}

export default MCQpage;
