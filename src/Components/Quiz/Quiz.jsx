import React, { useEffect, useState, useRef } from "react";
import { ImArrowRight, ImArrowLeft } from "react-icons/im";
import { CiSaveUp2 } from "react-icons/ci";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const submitButtonRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const moduleId = queryParams.get("moduleId");

  useEffect(() => {
    fetch(`http://192.168.1.29:8081/api/questions/${moduleId}`)
      .then((res) => res.json())
      .then((data) => setQuizData(data));
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
    if (!quizSubmitted && timeLeft === 0) {
      Swal.fire({
        title: "Time's up!",
        text: "Your time for the quiz has expired.",
        icon: "warning",
        confirmButtonColor: "#004AAD",
        confirmButtonText: "Submit Answers",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          setQuizSubmitted(true);

          const optionsToSend = quizData.map((question, index) => ({
            questionId: question.id,
            selectedOption: selectedOptions[index] || null,
          }));

          fetch("http://192.168.1.29:8081/api/answers", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(optionsToSend),
          })
            .then((res) => {
              console.log("Response status:", res.status);
              return res.json();
            })
            .then((data) => {
              console.log("Response data:", data);
              let timerInterval;
              Swal.fire({
                title: "Calculating Result",
                html: "I will close in <b></b> milliseconds.",
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading();
                  const b = Swal.getHtmlContainer().querySelector("b");
                  const timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft();
                  }, 100);
                  timerInterval &&
                    setTimeout(() => {
                      navigate("/result");
                    }, 2000);
                },
                willClose: () => {
                  clearInterval(timerInterval);
                },
              });
            })
            .catch((error) => {
              console.error("Error submitting data:", error);
            });

          console.log(optionsToSend);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your answer has been Submitted",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
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

  // submit answers function
  const handleSubmit = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to submit your answer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#004AAD",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setQuizSubmitted(true);

        const optionsToSend = quizData.map((question, index) => ({
          questionId: question.id,
          selectedOption: selectedOptions[index] || null,
        }));

        fetch(
          "https://self-assesment-portal-production.up.railway.app/api/answers",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(optionsToSend),
          }
        )
          .then((res) => {
            console.log("Response status:", res.status);
            return res.json();
          })
          .then((data) => {
            console.log("Response data:", data);
            let timerInterval;
            Swal.fire({
              title: "Calculating Result",
              html: "It will close in <b></b> milliseconds.",
              timer: 2000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading();
                const b = Swal.getHtmlContainer().querySelector("b");
                const timerInterval = setInterval(() => {
                  b.textContent = Swal.getTimerLeft();
                }, 100);
                // Navigate to "/result" after the alert closes
                timerInterval &&
                  setTimeout(() => {
                    navigate("/result");
                  }, 2000);
              },
              willClose: () => {
                clearInterval(timerInterval);
              },
            });
          })
          .catch((error) => {
            console.error("Error submitting data:", error);
          });

        console.log(optionsToSend);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // progress bar
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

                  <p className="text-2xl font-bold">
                    {Math.floor(timeLeft / 60)}:
                    {(timeLeft % 60).toString().padStart(2, "0")}
                  </p>

                  <motion.button
                    onClick={isLastQuestion ? handleSubmit : handleNextQuestion}
                    disabled={quizSubmitted && isLastQuestion}
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
};

export default Quiz;
