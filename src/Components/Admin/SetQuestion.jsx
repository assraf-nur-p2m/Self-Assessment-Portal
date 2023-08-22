import React from "react";
import Swal from "sweetalert2";

export default function SetQuestion() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      questionLevel,
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      description,
      correctAnswer,
    } = e.target;

    if (
      !questionLevel.value ||
      !question.value ||
      !correctAnswer.value ||
      (!optionA.value && !optionB.value && !optionC.value && !optionD.value)
    ) {
      Swal.fire({
        icon: "error",
        title: "Please fill out all required fields",
      });
      return;
    }

    const setQuestion = {
      level: questionLevel.value,
      context: question.value,
      answer: {
        description: description.value,
        correctAnswer: correctAnswer.value,
        a: optionA.value || null,
        b: optionB.value || null,
        c: optionC.value || null,
        d: optionD.value || null,
      },
    };

    fetch("http://192.168.1.29:8081/admin/question", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(setQuestion),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Question Submitted",
          showConfirmButton: false,
          timer: 1000,
        });
        e.target.reset();
      });

    console.log(setQuestion);
  };

  return (
    <div className="p-2 shadow-lg rounded-xl h-[96vh]">
      <form action="" onSubmit={handleSubmit}>
        <div className="p-2">
          <h2 className="ps-4 text-xl mb-[-10px]">Select Question Level</h2>
          <div className="flex items-center p-4">
            <div className="mr-12 flex bg-green-300 px-2 py-2 rounded-lg font-semibold shadow-lg">
              <input
                type="radio"
                id="level1"
                name="questionLevel"
                value="1"
                className="mr-2 radio shadow-md"
              />
              <label
                htmlFor="level1"
                className="label-text text-lg cursor-pointer"
              >
                Level 1
              </label>
            </div>
            <div className="mr-12 flex bg-yellow-300 px-2 py-2 rounded-lg font-semibold shadow-lg">
              <input
                type="radio"
                id="level2"
                name="questionLevel"
                value="2"
                className="mr-2 radio  shadow-md"
              />
              <label
                htmlFor="level2"
                className="label-text text-lg cursor-pointer"
              >
                Level 2
              </label>
            </div>
            <div className="flex bg-red-400 px-2 py-2 rounded-lg font-semibold shadow-lg">
              <input
                type="radio"
                id="level3"
                name="questionLevel"
                value="3"
                className="mr-2 radio  shadow-md"
              />
              <label
                htmlFor="level3"
                className="label-text text-lg cursor-pointer"
              >
                Level 3
              </label>
            </div>
          </div>

          <div className="form-control p-4">
            <label className="label mb-0">
              <span className="label-text mb-0">Write your Question here </span>
            </label>
            <input
              name="question"
              type="text"
              placeholder="Question....."
              className="input input-bordered w-12/12 mt-0 shadow-md text-lg"
            />
          </div>

          <div className="">
            <div className="grid grid-cols-2">
              <div className="p-4">
                <label className="label mb-0">
                  <span className="label-text mb-0">
                    Options for the Question
                  </span>
                </label>
                <div className="grid grid-cols-1 gap-5">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="optionARadio"
                      name="correctAnswer"
                      value="A"
                      className="mr-2 radio shadow-md"
                    />
                    <input
                      name="optionA"
                      type="text"
                      placeholder="Option A"
                      className="input input-bordered w-full mt-0 shadow-md text-lg"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="optionARadio"
                      name="correctAnswer"
                      value="B"
                      className="mr-2 radio shadow-md"
                    />
                    <input
                      name="optionB"
                      type="text"
                      placeholder="Option B"
                      className="input input-bordered w-full mt-0 shadow-md text-lg"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="optionARadio"
                      name="correctAnswer"
                      value="C"
                      className="mr-2 radio shadow-md"
                    />
                    <input
                      name="optionC"
                      type="text"
                      placeholder="Option C"
                      className="input input-bordered w-full mt-0 shadow-md text-lg"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="optionARadio"
                      name="correctAnswer"
                      value="D"
                      className="mr-2 radio shadow-md"
                    />
                    <input
                      name="optionD"
                      type="text"
                      placeholder="Option D"
                      className="input input-bordered w-full mt-0 shadow-md text-lg"
                    />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <label className="label mb-0">
                  <span className="label-text mb-0">Description of answer</span>
                </label>

                <textarea
                  className="textarea textarea-bordered w-full h-[15.7rem] shadow-md text-lg"
                  placeholder="Description"
                  name="description"
                ></textarea>
              </div>
            </div>
            <div className="w-full text-center mt-12">
              <input
                className="btn text-white bg-[#004aad] px-24 shadow-xl hover:bg-green-500"
                value="Add Question"
                type="submit"
              />
            </div>  
          </div>
        </div>
      </form>
    </div>
  );
}
