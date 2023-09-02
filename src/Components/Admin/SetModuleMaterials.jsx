import React, { useEffect, useState } from "react";

export default function SetModuleMaterials() {
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedButton, setSelectedButton] = useState(""); // Track the selected button
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.29:8081/admin/category")
      .then((res) => res.json())
      .then((data) => {
        setCategory(data);
      });
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const fetchData = (buttonType) => {
    // Make an API request based on the selected category and button type
    const apiUrl = `http://192.168.1.29:8081/${buttonType}/${selectedCategory}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setApiData(data);
        setSelectedButton(buttonType); // Update the selected button
      });
  };

  return (
    <div>
      <div className="p-2 shadow-lg rounded-xl h-auto">
        <div className="flex justify-between content-center items-center">
          <div className="p-3 flex items-center gap-4">
            <p className="text-xl">Select Category</p>
            <select
              className="form-select border px-12 py-2 text-xl rounded-lg shadow-md"
              name="quizCategory"
              onChange={handleCategoryChange}
              value={selectedCategory}
            >
              <option value="">Select a category</option>
              {category.map((cat) => (
                <option key={cat.id} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-5 text-lg px-2">
            <button
              className={`btn btn-info ${
                selectedButton === "documents" ? "active" : ""
              }`}
              onClick={() => fetchData("documents")}
            >
              Document
            </button>
            <button
              className={`btn btn-info ${
                selectedButton === "videos" ? "active" : ""
              }`}
              onClick={() => fetchData("video")}
            >
              Video
            </button>
            <button
              className={`btn btn-info ${
                selectedButton === "questions" ? "active" : ""
              }`}
              onClick={() => fetchData("questions")}
            >
              Question
            </button>
          </div>
        </div>
        <hr className="mt-2" />

        {/* Display the fetched data */}
        <div>
          <h2>Fetched Data:</h2>
          <pre>{JSON.stringify(apiData, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
