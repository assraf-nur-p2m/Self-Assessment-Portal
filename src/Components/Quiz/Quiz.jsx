import React, { useEffect, useState, useRef } from "react";
import { ImArrowRight, ImArrowLeft } from "react-icons/im";
import { CiSaveUp2 } from "react-icons/ci";
import { motion } from "framer-motion";

export default function Quiz() {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
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
          <div className="w-full md:w-[650px] lg:w-[850px] xl:w-[1100px] h-[60vh] relative">
            {quizData.length > 0 && (
              <div className="">
                <div className="">
                  <div className="mb-8 h-4 bg-gray-300 rounded-sm">
                    <div
                      className="h-full rounded-sm bg-[#004AAD]"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div key={currentQuestionIndex}>
                  <motion.h1
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-semibold"
                  >
                    {quizData[currentQuestionIndex].context}
                  </motion.h1>
                </div>

                <motion.div
                  className="mt-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {Object.keys(quizData[currentQuestionIndex]).map((key) => {
                      if (key.match(/^[a-d]$/)) {
                        return (
                          <motion.label
                            key={`${key}-${currentQuestionIndex}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 * key }}
                            className={`flex rounded-md py-3 ps-1 text-xl font-semibold space-x-2 cursor-pointer ${
                              selectedOptions[currentQuestionIndex] === key
                                ? "bg-[#004AAD] text-white"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question_${currentQuestionIndex}`}
                              value={key}
                              checked={
                                selectedOptions[currentQuestionIndex] === key
                              }
                              onChange={() => handleOptionSelect(key)}
                              disabled={quizSubmitted}
                              className="hidden"
                            />
                            <span className="w-7 h-7 border border-gray-400 rounded-sm flex items-center justify-center">
                              {key.toUpperCase()}
                            </span>
                            <span>{quizData[currentQuestionIndex][key]}</span>
                          </motion.label>
                        );
                      }
                      return null;
                    })}
                  </form>
                </motion.div>

                <div className="flex justify-between items-center mt-4 absolute bottom-0 w-full">
                  <motion.button
                    onClick={handlePreviousQuestion}
                    className="bg-[#004AAD] flex hover:bg-blue-600 text-xl text-white py-2 px-4 rounded"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ImArrowLeft className="mt-[3.5px] me-3" /> Previous
                  </motion.button>

                  <p className="countdown">
                    Time Left: {Math.floor(timeLeft / 60)}:
                    {(timeLeft % 60).toString().padStart(2, "0")}
                  </p>

                  <motion.button
                    onClick={isLastQuestion ? handleSubmit : handleNextQuestion}
                    disabled={quizSubmitted}
                    className="bg-[#004AAD] flex hover:bg-blue-600 text-white text-xl py-2 px-4 rounded"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isLastQuestion ? (
                      <>
                        Submit{" "}
                        <CiSaveUp2 className="mt-[3.5px] ms-3 text-xl font-bold" />
                      </>
                    ) : (
                      <>
                        Next <ImArrowRight className="mt-[5px] ms-3" />
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
