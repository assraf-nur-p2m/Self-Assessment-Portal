import React, { useEffect, useState } from "react";

export default function QuestionView() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.29:8081/admin/category")
      .then((res) => res.json())
      .then((data) => {
        setCategory(data);
      });
  }, []);
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
          <div className="p-3 flex items-center gap-4">
            <p className="text-xl">Select Category</p>
            <select
              className="form-select border px-12 py-2 text-xl rounded-lg shadow-md"
              name="category"
              id=""
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
      </div>
    </div>
  );
}
