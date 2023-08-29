import React, { useEffect, useState } from "react";

export default function CreateModule() {
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
        <div>
          <div className="form-control p-4">
            <label className="label mb-0">
              <span className="label-text mb-0">
                Write your Module name....{" "}
              </span>
            </label>
            <input
              name="question"
              type="text"
              placeholder="Module Name.."
              className="input input-bordered w-12/12 mt-0 shadow-md text-lg"
            />
          </div>

          <div>
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

          <div>
            <div className="p-4">
              <label className="label mb-0">
                <span className="label-text mb-0">Write Notice</span>
              </label>

              <textarea
                className="textarea textarea-bordered w-full h-[10.7rem] shadow-md text-lg"
                placeholder="Notice"
                name="description"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-between text-lg">
            <div className="p-4 flex items-center gap-4">
              <p className="mb-1 font-medium text-gray-700">
                Notice Start time
              </p>
              <input
                type="date"
                className="mb-2 border border-gray-300 p-2 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-300"
              />
              <input
                type="time"
                className="border mb-2 border-gray-300 p-2 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-300"
              />
            </div>
            <div className="p-4 flex items-center gap-4">
              <p className="mb-1 font-medium text-gray-700">Notice End time</p>
              <input
                type="date"
                className="mb-2 border border-gray-300 p-2 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-300"
              />
              <input
                type="time"
                className="border mb-2 border-gray-300 p-2 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-300"
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
                    name="visibility"
                    value="on"z
                  />
                  <span className="ml-2">On</span>
                </label>
                <label className="inline-flex items-center border px-2 cursor-pointer bg-red-300 py-1 rounded-lg">
                  <input
                    type="radio"
                    className="radio text-indigo-500"
                    name="visibility"
                    value="off"
                  />
                  <span className="ml-2">Off</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
