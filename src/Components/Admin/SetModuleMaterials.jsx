import React, { useEffect, useState } from "react";

export default function SetModuleMaterials() {
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedButton, setSelectedButton] = useState("");
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.29:8081/admin/category")
      .then((res) => res.json())
      .then((data) => {
        setCategory(data);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory !== "") {
      fetchData(selectedButton);
    }
  }, [selectedCategory]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const fetchData = (buttonType) => {
    const apiUrl = `http://192.168.1.29:8081/${buttonType}/${selectedCategory}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setApiData(data);
        setSelectedButton(buttonType);
      });
  };

  const handleDownload = (downloadURL) => {
    // You can trigger a download for the given URL here
    window.open(downloadURL);
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
                selectedButton === "documents" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => fetchData("documents")}
            >
              Document
            </button>
            <button
              className={`btn btn-info ${
                selectedButton === "video" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => fetchData("video")}
            >
              Video
            </button>
            <button
              className={`btn btn-info ${
                selectedButton === "questions" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => fetchData("questions")}
            >
              Question
            </button>
          </div>
        </div>
        <hr className="mt-2" />
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>File Name</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {apiData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.fileName}</td>
                  <td>{item.category}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => handleDownload(item.downloadURL)}
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
