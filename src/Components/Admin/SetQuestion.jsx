import React from "react";

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

    const setQuestion = {
      level: questionLevel.value,
      ques: question.value,
      correctAnswer: correctAnswer.value,
      options: {
        optionA: optionA.value,
        optionB: optionB.value,
        optionC: optionC.value,
        optionD: optionD.value,
      },
      description: description.value,
    };

    console.log(setQuestion);
  };

  return (
    <div className="p-2 shadow-lg rounded-xl">
      <form action="" onSubmit={handleSubmit}>
        <div className="p-2">
          <div className="flex items-center p-4">
            <div className="mr-12 flex">
              <input
                type="radio"
                id="level1"
                name="questionLevel"
                value="Level 1"
                className="mr-2 radio"
              />
              <label htmlFor="level1" className="label-text text-lg">
                Level 1
              </label>
            </div>
            <div className="mr-12 flex">
              <input
                type="radio"
                id="level2"
                name="questionLevel"
                value="Level 2"
                className="mr-2 radio"
              />
              <label htmlFor="level2" className="label-text text-lg">
                Level 2
              </label>
            </div>
            <div className="flex">
              <input
                type="radio"
                id="level3"
                name="questionLevel"
                value="Level 3"
                className="mr-2 radio"
              />
              <label htmlFor="level3" className="label-text text-lg">
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
                      className="mr-2 radio"
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
                      className="mr-2 radio"
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
                      className="mr-2 radio"
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
                      className="mr-2 radio"
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
                className="btn text-white bg-[#004aad] px-24 shadow-xl"
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
