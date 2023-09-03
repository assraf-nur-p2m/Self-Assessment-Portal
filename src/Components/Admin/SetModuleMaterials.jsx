import React, { useEffect, useState } from "react";

export default function SetModuleMaterials() {
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedButton, setSelectedButton] = useState("");
  const [apiData, setApiData] = useState([]);
  const [uploadData, setUploadData] = useState({
    fileName: "",
    fileSequence: "",
    file: null,
  });

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
    // Reset the upload form when the category changes
    setUploadData({
      fileName: "",
      fileSequence: "",
      file: null,
    });
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

  const handleFileInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "file") {
      setUploadData({
        ...uploadData,
        [name]: event.target.files[0],
      });
    } else {
      setUploadData({
        ...uploadData,
        [name]: value,
      });
    }
  };

  const handleUpload = () => {
    // Implement the upload logic here and update the state/apiData
    // You can use the FormData API to send the file and other data to your server.
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
              onClick={() => setSelectedButton("documents")}
            >
              Document
            </button>
            <button
              className={`btn btn-info ${
                selectedButton === "video" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setSelectedButton("video")}
            >
              Video
            </button>
            <button
              className={`btn btn-info ${
                selectedButton === "questions" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setSelectedButton("questions")}
            >
              Question
            </button>
          </div>
        </div>
        <hr className="mt-2" />

        {/* Upload Section */}
        {selectedButton && (
          <div className="p-2">
            <h2 className="text-lg font-semibold">
              Upload New {selectedButton}
            </h2>
            <div className="flex justify-between">
              <div className="w-full">
                <div className="mb-3">
                  <label className="block text-lg">File Name</label>
                  <input
                    type="text"
                    name="fileName"
                    className="input input-bordered w-full max-w-xs"
                    value={uploadData.fileName}
                    onChange={handleFileInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-lg">File Sequence</label>
                  <input
                    type="text"
                    name="fileSequence"
                    className="input input-bordered w-full max-w-xs"
                    value={uploadData.fileSequence}
                    onChange={handleFileInputChange}
                  />
                </div>

                <button
                  className="btn btn-success"
                  onClick={handleUpload}
                  disabled={
                    !uploadData.fileName ||
                    !uploadData.fileSequence ||
                    !uploadData.file
                  }
                >
                  Upload
                </button>
              </div>
              <div className="w-full">
                <div className="mb-3">
                  <label className="block text-lg">
                    Upload {selectedButton}
                  </label>
                  <input
                    type="file"
                    name="file"
                    className="file-input file-input-bordered w-full max-w-xs h-32"
                    onChange={handleFileInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="divider"></div>

        {/* Display the fetched data */}
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="w-[10%]">ID</th>
                <th className="w-[25%]">File Name</th>
                <th className="w-[25%]">Category</th>
                <th className="w-[25%] text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apiData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-200">
                  <td>{item.id}</td>
                  <td>{item.fileName}</td>
                  <td>{item.category}</td>
                  <td className="flex justify-between">
                    <button
                      className="btn btn-success mr-2"
                      onClick={() => handleDownload(item.downloadURL)}
                    >
                      Download
                    </button>
                    <button
                      className="btn btn-error"
                      // onClick={() => handleDelete(item.id)}
                    >
                      Delete
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
