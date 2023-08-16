import React, { useEffect, useState, useRef } from "react";

export default function Quiz() {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const submitButtonRef = useRef(null);

  useEffect(() => {
    fetch("ques.json")
      .then((res) => res.json())
      .then((data) => {
        setQuizData(data);
      });
  }, []);

  useEffect(() => {
    if (!quizSubmitted && timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, quizSubmitted]);

  useEffect(() => {
    if (!quizSubmitted) {
      const timer = setTimeout(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [timeLeft, quizSubmitted]);

  useEffect(() => {
    if (!quizSubmitted && timeLeft === 0 && submitButtonRef.current) {
      submitButtonRef.current.click();
    }
  }, [timeLeft, quizSubmitted]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [currentQuestionIndex]: option,
    }));
  };

  const handleSubmit = () => {
    setQuizSubmitted(true);

    const optionsToSend = quizData.map((question, index) => ({
      questionId: question.id,
      selectedOption: selectedOptions[index] || null,
    }));

    console.log(optionsToSend);
  };

  const isLastQuestion = currentQuestionIndex === quizData.length - 1;
  const progressPercentage =
    (currentQuestionIndex / (quizData.length - 1)) * 100;

  return (
    <div className="login-page min-h-screen p-4 md:p-16 flex justify-center items-center">
      <div className="p-4 rounded-xl bg-white bg-opacity-40 accent-color shadow-md">
        <div className="login-box md:flex md:justify-center shadow-md md:items-center bg-white rounded-xl p-8 bg-opacity-90 w-full md:w-full">
          <div>
            {quizData.length > 0 && (
              <div>
                <div className="mb-8 h-4 bg-gray-300 rounded-full">
                  <div
                    className="h-full rounded-full bg-[#004AAD]"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>

                <p>{quizData[currentQuestionIndex].context}</p>
                <p>
                  Time Left: {Math.floor(timeLeft / 60)}:
                  {(timeLeft % 60).toString().padStart(2, "0")}
                </p>
                <form>
                  {Object.keys(quizData[currentQuestionIndex]).map((key) => {
                    if (key.match(/^[a-d]$/)) {
                      return (
                        <div key={key}>
                          <input
                            type="radio"
                            name={`question_${currentQuestionIndex}`}
                            value={key}
                            checked={
                              selectedOptions[currentQuestionIndex] === key
                            }
                            onChange={() => handleOptionSelect(key)}
                            disabled={quizSubmitted}
                          />
                          <label>{quizData[currentQuestionIndex][key]}</label>
                        </div>
                      );
                    }
                    return null;
                  })}
                </form>
                <button onClick={handlePreviousQuestion}>Previous</button>
                {isLastQuestion ? (
                  <button
                    ref={submitButtonRef}
                    onClick={handleSubmit}
                    disabled={quizSubmitted}
                  >
                    Submit
                  </button>
                ) : (
                  <button onClick={handleNextQuestion}>Next</button>
                )}
                {submitSuccess && <p>Options submitted successfully!</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
