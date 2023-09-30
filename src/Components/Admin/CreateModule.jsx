import React, { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Swal from "sweetalert2";

export default function CreateModule() {
  const [category, setCategory] = useState([]);
  const currentDate = new Date().toISOString().slice(0, 16);
  const [levelWiseQuestion, setLevelWiseQuestion] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch("http://192.168.1.7:8081/admin/category")
      .then((res) => res.json())
      .then((data) => {
        setCategory(data);
      });
  }, []);

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    if (selectedValue) {
      fetch(
        `http://192.168.1.7:8081/dashboard/question/${selectedValue}`
      )
        .then((res) => res.json())
        .then((data) => {
          setLevelWiseQuestion(data);
        });
    } else {
      setLevelWiseQuestion([]);
    }
  };

  const handleCreateModule = (e) => {
    e.preventDefault();
    const {
      moduleName,
      percentOfPass,
      level1Questions,
      level2Questions,
      level3Questions,
      quizCategory,
      notice,
      noticeStartTime,
      noticeEndTime,
      examStartTime,
      examEndTime,
      showNotice,
      visibility,
    } = e.target;

    const quizHours = e.target.quizHours.value;
    const quizMinutes = e.target.quizMinutes.value;
    const quizSeconds = e.target.quizSeconds.value;

    const quizTime =
      parseInt(quizHours, 10) * 3600 +
      parseInt(quizMinutes, 10) * 60 +
      parseInt(quizSeconds, 10);

    const startNoticeDateTime = new Date(noticeStartTime.value);
    const endNoticeDateTime = new Date(noticeEndTime.value);
    const startExamDateTime = new Date(examStartTime.value);
    const endExamDateTime = new Date(examEndTime.value);
    const passPercentage = parseInt(percentOfPass.value, 10);

    if (endNoticeDateTime <= startNoticeDateTime) {
      Swal.fire({
        icon: "error",
        title: "Notice End time must be after Notice Start time",
      });
      return;
    }

    if (endExamDateTime <= startExamDateTime) {
      Swal.fire({
        icon: "error",
        title: "Quiz End time must be after Quiz Start time",
      });
      return;
    }

    if (passPercentage > 100) {
      Swal.fire({
        icon: "error",
        title: "Percentage of Pass in Quiz cannot exceed 100%",
      });
      return;
    }
    if (
      level1Questions.value > levelWiseQuestion.level1Question ||
      level2Questions.value > levelWiseQuestion.level2Question ||
      level3Questions.value > levelWiseQuestion.level3Question
    ) {
      Swal.fire({
        icon: "error",
        title:
          "Number of quiz questions per level cannot exceed available questions",
      });
      return;
    }

    if (
      passPercentage < 0 ||
      level1Questions.value < 0 ||
      level2Questions.value < 0 ||
      level3Questions.value < 0
    ) {
      Swal.fire({
        icon: "error",
        title: "Input values cannot be negative",
      });
      return;
    }

    if (
      !moduleName.value ||
      !percentOfPass.value ||
      !level1Questions.value ||
      !level2Questions.value ||
      !level3Questions.value ||
      !quizCategory.value ||
      !notice.value ||
      !noticeStartTime.value ||
      !noticeEndTime.value ||
      !examStartTime.value ||
      !examEndTime.value ||
      !showNotice.value ||
      !visibility.value ||
      !quizHours ||
      !quizMinutes ||
      !quizSeconds
    ) {
      Swal.fire({
        icon: "error",
        title: "Please fill out all required fields",
      });
      return;
    }

    const addModule = {
      moduleName: moduleName.value,
      percentOfPass: percentOfPass.value,
      level1Questions: level1Questions.value,
      level2Questions: level2Questions.value,
      level3Questions: level3Questions.value,
      quizCategory: quizCategory.value,
      notice: notice.value,
      noticeStartTime: noticeStartTime.value,
      noticeEndTime: noticeEndTime.value,
      examStartTime: examStartTime.value,
      examEndTime: examEndTime.value,
      showNotice: showNotice.value,
      visibility: visibility.value,
      quizTime: quizTime,
    };

    fetch("http://192.168.1.7:8081/admin/module", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addModule),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "New Module Added",
          showConfirmButton: false,
          timer: 1000,
        });
        e.target.reset();
      });
  };

  return (
    <div>
      <div className="p-2 shadow-lg rounded-xl h-auto">
        <form action="" onSubmit={handleCreateModule}>
          <div>
            <div className="form-control p-4">
              <label className="label mb-0">
                <span className="label-text mb-0">
                  Write your Module name....{" "}
                </span>
              </label>
              <input
                name="moduleName"
                type="text"
                placeholder="Module Name.."
                className="input input-bordered w-12/12 mt-0 shadow-md text-lg"
              />
            </div>

            <div className="p-3 flex items-center gap-4">
              <p className="text-xl">Select Category</p>
              <select
                className="form-select border px-12 py-2 text-xl rounded-lg shadow-md"
                name="quizCategory"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Select a category</option>
                {category.map((cat) => (
                  <option key={cat.id} value={cat.category}>
                    {cat.category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="p-4">
                <label className="label mb-0">
                  <span className="label-text mb-0">Write Notice</span>
                </label>

                <textarea
                  className="textarea textarea-bordered w-full h-[10.7rem] shadow-md text-lg"
                  placeholder="Notice"
                  name="notice"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-between text-lg">
              <div className="p-4 flex items-center gap-4">
                <p className="mb-1 font-medium text-gray-700">
                  Notice Start time
                </p>
                <input
                  min={currentDate}
                  name="noticeStartTime"
                  type="datetime-local"
                  className="mb-2 border border-gray-300 p-2 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-300 cursor-pointer"
                />
              </div>
              <div className="p-4 flex items-center gap-4">
                <p className="mb-1 font-medium text-gray-700">
                  Notice End time
                </p>
                <input
                  min={currentDate}
                  name="noticeEndTime"
                  type="datetime-local"
                  className="mb-2 border border-gray-300 p-2 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-300 cursor-pointer"
                />
              </div>
            </div>

            <div>
              <div className="p-4 text-lg">
                <div className="flex items-center gap-4">
                  <label className="font-medium text-gray-700">
                    Notice Visibility
                  </label>
                  <label className="inline-flex items-center border px-2 cursor-pointer py-1 bg-green-300 rounded-lg">
                    <input
                      type="radio"
                      className="radio text-indigo-500"
                      name="showNotice"
                      value="true"
                    />
                    <span className="ml-2">On</span>
                  </label>
                  <label className="inline-flex items-center border px-2 cursor-pointer bg-red-300 py-1 rounded-lg">
                    <input
                      type="radio"
                      className="radio text-indigo-500"
                      name="showNotice"
                      value="false"
                    />
                    <span className="ml-2">Off</span>
                  </label>
                </div>

                <div className="mt-10">
                  <h2 className="text-3xl mb-0">Quiz Setting</h2>
                  <div className="divider mt-0"></div>

                  <div className="flex justify-between text-lg">
                    <div className="flex items-center gap-4">
                      <p className="mb-1 font-medium text-gray-700">
                        Quiz Start time
                      </p>
                      <input
                        min={currentDate}
                        name="examStartTime"
                        type="datetime-local"
                        className="mb-2 border border-gray-300 p-2 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-300 cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="mb-1 font-medium text-gray-700">
                        Quiz End time
                      </p>
                      <input
                        min={currentDate}
                        name="examEndTime"
                        type="datetime-local"
                        className="mb-2 border border-gray-300 p-2 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-300 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <h2 className="text-xl">Question Level from</h2>
                    <hr />

                    <div className="mt-4">
                      <div className="flex gap-5 justify-between">
                        <div className="text-center">
                          <p className="badge badge-primary mb-2 text-white p-3">
                            {levelWiseQuestion.level1Question} available
                          </p>
                          <input
                            name="level1Questions"
                            type="number"
                            placeholder="From level 1"
                            className="input input-bordered w-full max-w-xs text-center"
                          />
                        </div>
                        <div className="text-center">
                          <p className="badge badge-primary mb-2 text-white p-3">
                            {levelWiseQuestion.level2Question} available
                          </p>
                          <input
                            name="level2Questions"
                            type="number"
                            placeholder="From level 2"
                            className="input input-bordered w-full max-w-xs text-center"
                          />
                        </div>
                        <div className="text-center">
                          <p className="badge badge-primary mb-2 text-white p-3">
                            {levelWiseQuestion.level3Question} available
                          </p>
                          <input
                            name="level3Questions"
                            type="number"
                            placeholder="From level 3"
                            className="input input-bordered w-full max-w-xs text-center"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-12">
                      <h2>
                        Percentage of Pass in Quiz{" "}
                        <span>
                          <input
                            name="percentOfPass"
                            type="number"
                            placeholder="%"
                            className="input input-bordered w-full max-w-xs text-center ms-4 me-4"
                          />
                        </span>
                        (not more than 100%)
                      </h2>
                    </div>

                    <div className="mt-5">
                      <h2>Quiz Time:</h2>
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            id="quizHours"
                            name="quizHours"
                            placeholder="Hours"
                            className="input input-bordered w-full max-w-xs text-center"
                          />
                          <label
                            htmlFor="quizHours"
                            className="font-medium text-gray-700"
                          >
                            Hours
                          </label>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <input
                            type="number"
                            id="quizMinutes"
                            name="quizMinutes"
                            placeholder="Minutes"
                            className="input input-bordered w-full max-w-xs text-center"
                          />
                          <label
                            htmlFor="quizMinutes"
                            className="font-medium text-gray-700"
                          >
                            Minutes
                          </label>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <input
                            type="number"
                            id="quizSeconds"
                            name="quizSeconds"
                            placeholder="Seconds"
                            className="input input-bordered w-full max-w-xs text-center"
                          />
                          <label
                            htmlFor="quizSeconds"
                            className="font-medium text-gray-700"
                          >
                            Seconds
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="mt-12">
                      <div className="flex items-center gap-4">
                        <label className="font-medium text-gray-700">
                          Module Visibility
                        </label>
                        <label className="inline-flex items-center border px-2 cursor-pointer py-1 bg-green-300 rounded-lg">
                          <input
                            type="radio"
                            className="radio text-indigo-500"
                            name="visibility"
                            value="true"
                          />
                          <span className="ml-2 flex items-center">
                            Public <FiEye className="ms-4" />{" "}
                          </span>
                        </label>
                        <label className="inline-flex items-center border px-2 cursor-pointer bg-red-300 py-1 rounded-lg">
                          <input
                            type="radio"
                            className="radio text-indigo-500"
                            name="visibility"
                            value="false"
                          />
                          <span className="ml-2 flex items-center">
                            Private <FiEyeOff className="ms-4" />{" "}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8 mb-6">
              <input
                type="submit"
                className="btn btn-primary px-16 mx-auto text-xl text-white"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
