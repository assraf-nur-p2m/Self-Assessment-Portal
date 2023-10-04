import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Authentication/AuthProvider";

export default function ReviewQuiz() {
  const [reviewData, setReviewData] = useState([]);
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user) {
      fetch(`http://192.168.1.3:8081/api/examscriptreview/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setReviewData(data);
        });
    }
  }, [user, token]);

  return (
    <div className="login-page min-h-screen p-4 md:p-16 flex justify-center items-center">
      <div className="p-4 rounded-xl bg-white bg-opacity-40 accent-color shadow-md">
        <div className="login-box shadow-md bg-white rounded-xl p-8 bg-opacity-90 w-full md:w-full">
          <p className="font-bold text-3xl ms-1">
            Marks: {reviewData && reviewData.marks}%
          </p>

          {reviewData &&
            reviewData.answerReviews &&
            reviewData.answerReviews.map((review, index) => (
              <div
                key={index}
                className="border p-3 rounded-xl flex flex-col mt-5 shadow-lg"
              >
                <p className="text-xl font-bold">{review.context}</p>

                <div className="mt-5 gap-3 flex flex-col">
                  <p
                    className={`border p-2 rounded-lg font-bold ${
                      review.userGivenOption === "a"
                        ? review.userGivenOption === review.correctAnswer
                          ? "bg-green-400"
                          : "bg-red-300"
                        : ""
                    }`}
                  >
                    A. {review.a}
                  </p>
                  <p
                    className={`border p-2 rounded-lg font-bold ${
                      review.userGivenOption === "b"
                        ? review.userGivenOption === review.correctAnswer
                          ? "bg-green-400"
                          : "bg-red-300"
                        : ""
                    }`}
                  >
                    B. {review.b}
                  </p>
                  <p
                    className={`border p-2 rounded-lg font-bold ${
                      review.userGivenOption === "c"
                        ? review.userGivenOption === review.correctAnswer
                          ? "bg-green-400"
                          : "bg-red-300"
                        : ""
                    }`}
                  >
                    C. {review.c}
                  </p>
                  <p
                    className={`border p-2 rounded-lg font-bold ${
                      review.userGivenOption === "d"
                        ? review.userGivenOption === review.correctAnswer
                          ? "bg-green-400"
                          : "bg-red-300"
                        : ""
                    }`}
                  >
                    D. {review.d}
                  </p>
                </div>
                <div className="my-2">
                  <p>
                    Correct Answer:{" "}
                    <span className="uppercase text-xl font-bold">
                      {review.correctAnswer}
                    </span>
                  </p>
                </div>
                {review.description && (
                  <div className="my-2">
                    <strong>Description:</strong> {review.description}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
