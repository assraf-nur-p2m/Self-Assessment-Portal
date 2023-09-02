import React, { useEffect, useState } from "react";

export default function SetModuleMaterials() {
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.29:8081/admin/category")
      .then((res) => res.json())
      .then((data) => {
        setCategory(data);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory && selectedOption) {
      fetch(`http://192.168.1.29:8081/${selectedOption}/${selectedCategory}`)
        .then((res) => res.json())
        .then((data) => {
          setDocuments(data);
        });
    } else {
      setDocuments([]);
    }
  }, [selectedCategory, selectedOption]);

  const handleCategoryChange = (event) => {
    const selectedCat = event.target.value;
    setSelectedCategory(selectedCat);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <div className="p-2 shadow-lg rounded-xl h-auto">
        <div className="flex justify-between items-center content-center">
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
          <div className="flex gap-4">
            <button
              className={`btn text-lg ${
                selectedOption === "documents"
                  ? "btn-primary text-white"
                  : "btn-info"
              }`}
              onClick={() => handleOptionClick("documents")}
            >
              Doc
            </button>
            <button
              className={`btn text-lg ${
                selectedOption === "Video"
                  ? "btn-primary text-white"
                  : "btn-info"
              }`}
              onClick={() => handleOptionClick("Video")}
            >
              Video
            </button>
            <button
              className={`btn text-lg ${
                selectedOption === "Question"
                  ? "btn-primary text-white"
                  : "btn-info"
              }`}
              onClick={() => handleOptionClick("Question")}
            >
              Question
            </button>
          </div>
        </div>
        <hr className="mt-1" />
        <div className="mt-4">
          <p className="text-xl">File Names:</p>
          <ul>
            {documents.map((doc) => (
              <li key={doc.id}>{doc.fileName}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
