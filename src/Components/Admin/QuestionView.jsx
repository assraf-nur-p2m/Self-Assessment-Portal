import React, { useEffect, useState } from "react";

export default function QuestionView() {
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // Initialize with an empty string
  const [selectedLevel, setSelectedLevel] = useState("1"); // Initialize with "1" for Level 1
  const [questionData, setQuestionData] = useState([]);

  useEffect(() => {
    // Fetch the list of categories
    fetch("http://192.168.1.29:8081/admin/category")
      .then((res) => res.json())
      .then((data) => {
        setCategory(data);
        if (data.length > 0) {
          setSelectedCategory(data[0].category);
        }
      });
  }, []);

  useEffect(() => {
    // Make an API request to fetch data based on selectedCategory and selectedLevel
    if (selectedCategory && selectedLevel) {
      fetch(
        `http://192.168.1.29:8081/question/${selectedCategory}/${selectedLevel}`
      )
        .then((res) => res.json())
        .then((data) => {
          setQuestionData(data);
        });
    }
  }, [selectedCategory, selectedLevel]);

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div>
      <div className="p-2 shadow-lg rounded-xl h-[96vh]">
        <h2 className="ps-4 text-xl mb-[-10px]">Select Question Level</h2>
        <div className="flex justify-between">
          <div className="flex items-center p-4">
            <div className="mr-12 flex bg-green-300 px-2 py-2 rounded-lg font-semibold shadow-lg">
              <input
                type="radio"
                id="level1"
                name="questionLevel"
                value="1"
                className="mr-2 radio shadow-md"
                onChange={handleLevelChange}
                checked={selectedLevel === "1"} // Check if selectedLevel is "1"
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
                onChange={handleLevelChange}
                checked={selectedLevel === "2"} // Check if selectedLevel is "2"
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
                onChange={handleLevelChange}
                checked={selectedLevel === "3"} // Check if selectedLevel is "3"
              />
              <label
                htmlFor="level3"
                className="label-text text-lg cursor-pointer"
              >
                Level 3
              </label>
            </div>
          </div>
          <div className="p-3 flex items-center gap-4">
            <p className="text-xl">Select Category</p>
            <select
              className="form-select border px-12 py-2 text-xl rounded-lg shadow-md"
              name="category"
              id=""
              onChange={handleCategoryChange}
              value={selectedCategory} // Set the value to selectedCategory
            >
              <option value="">Select a category</option>
              {category?.map((cat, index) => (
                <option key={cat.id} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>
          </div>
        </div>
        {questionData.length > 0 ? (
          <div className="px-4">
            <h2 className="mb-2 text-xl">Question Table</h2>
            <table className="table">
              <thead>
                <tr className="text-lg bg-[#004bad2d] rounded-lg">
                  <th className="font-bold">ID</th>
                  <th className="font-bold">Questions</th>
                  <th className="font-bold text-center">Options</th>
                  <th className="font-bold text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {questionData.map((item) => (
                  <tr
                    key={item.id}
                    className="hover bg-slate-100 border-b border-gray-300 text-lg"
                  >
                    <th>{item.id}</th>
                    <td>{item.context}</td>
                    <td>
                      <div>
                        <p
                          className={
                            item.correctAnswer === "a"
                              ? "correct-answer ps-2 rounded-lg"
                              : "ps-2 bg-[#DCDDDF] py-1 border rounded-lg"
                          }
                        >
                          A. {item.a}
                        </p>
                        <p
                          className={
                            item.correctAnswer === "b"
                              ? "correct-answer ps-2 rounded-lg"
                              : "ps-2 bg-[#DCDDDF] py-1 border rounded-lg"
                          }
                        >
                          B. {item.b}
                        </p>
                        <p
                          className={
                            item.correctAnswer === "c"
                              ? "correct-answer ps-2 rounded-lg"
                              : "ps-2 bg-[#DCDDDF] py-1 border rounded-lg"
                          }
                        >
                          C. {item.c}
                        </p>
                        <p
                          className={
                            item.correctAnswer === "d"
                              ? "correct-answer ps-2 rounded-lg"
                              : "ps-2 bg-[#DCDDDF] py-1 border rounded-lg"
                          }
                        >
                          D. {item.d}
                        </p>
                      </div>
                    </td>
                    <td width="30">
                      <div className="flex gap-5">
                        <button className="btn btn-sm bg-blue-200">Edit</button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="btn btn-sm bg-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-4xl text-center mt-12">No data available</p>
        )}
      </div>
    </div>
  );
}
