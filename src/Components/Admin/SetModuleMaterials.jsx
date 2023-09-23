import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [uploadInProgress, setUploadInProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (category.length > 0) {
      setSelectedCategory(category[0].category);
    }
    setSelectedButton("documents");
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
  }, [selectedCategory, selectedButton]);

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

  const handleButtonChange = (buttonType) => {
    setSelectedButton(buttonType);
    // Reset the upload form when the button changes
    setUploadData({
      fileName: "",
      fileSequence: "",
      file: null,
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
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        setUploadData({
          ...uploadData,
          file: selectedFile,
        });
      }
    } else {
      setUploadData({
        ...uploadData,
        [name]: value,
      });
    }
  };

  const handleUpload = () => {
    if (selectedButton === "documents" || selectedButton === "videos") {
      const apiUrl =
        selectedButton === "documents"
          ? "http://192.168.1.29:8081/documents"
          : "http://192.168.1.29:8081/videos";

      const json = {
        name: uploadData.fileName,
        sequence: uploadData.fileSequence,
        category: selectedCategory,
      };

      setUploadInProgress(true);

      const formData = new FormData();
      formData.append("file", uploadData.file);
      formData.append("json", JSON.stringify(json));

      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setUploadProgress(progress); // Update the progress state
        }
      });

      xhr.open("POST", apiUrl, true);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            document.getElementById("fileInput").value = "";
            document.getElementById("nameInput").value = "";
            document.getElementById("sequenceInput").value = "";

            setUploadData({
              fileName: "",
              fileSequence: "",
              file: null,
            });

            setUploadInProgress(false);

            const data = JSON.parse(xhr.responseText);
            setApiData([...apiData, data]);

            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            console.error("Upload error:", xhr.statusText);

            setUploadInProgress(false);
          }
        }
      };

      xhr.send(formData);
    }
  };

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = apiData.slice(indexOfFirstItem, indexOfLastItem);

  // Create functions to handle page navigation
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(apiData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDelete = (itemId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const apiUrl =
          selectedButton === "documents"
            ? `http://192.168.1.29:8081/documents/${itemId}`
            : `http://192.168.1.29:8081/videos/${itemId}`;

        fetch(apiUrl, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              // Delete was successful
              const updatedItems = apiData.filter((item) => item.id !== itemId);
              setApiData(updatedItems); // Update apiData state

              Swal.fire({
                position: "center",
                icon: "success",
                title: "Item has been deleted",
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              // Handle error here
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed to delete item",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((error) => {
            console.error("Delete error:", error);
          });
      }
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
              className={`btn btn-sm btn-info ${
                selectedButton === "documents" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handleButtonChange("documents")}
            >
              Document
            </button>
            <button
              className={`btn btn-sm btn-info ${
                selectedButton === "videos" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handleButtonChange("videos")}
            >
              Videos
            </button>
            {/* <button
              className={`btn btn-info ${
                selectedButton === "questions" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handleButtonChange("questions")}
              to="/dashboard/set-question"
            >
              Question
            </button> */}
            <Link
              className={`btn btn-sm btn-info ${
                selectedButton === "questions" ? "bg-blue-500 text-white" : ""
              }`}
              to="/dashboard/set-question"
            >
              Question
            </Link>
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
                    id="nameInput"
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
                    id="sequenceInput"
                    type="number"
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
                    id="fileInput"
                    name="file"
                    className="file-input file-input-bordered w-full max-w-xs h-32"
                    onChange={handleFileInputChange}
                  />
                </div>
                {selectedButton === "videos" && uploadInProgress && (
                  <div>
                    <p className="text-xl font-bold text-green-700">
                      Uploading....
                    </p>
                    <progress
                      className="progress progress-info w-56"
                      value={uploadProgress}
                      max="100"
                    ></progress>
                  </div>
                )}
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
                <th className="w-[10%]">Sequence</th>
                <th className="w-[25%]">File Name</th>
                <th className="w-[25%]">Category</th>
                <th className="w-[25%] text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-200">
                  <td>{item.sequence}</td>
                  <td>{item.name}</td>
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
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="pagination flex gap-4 mt-5">
          <button
            className="btn btn-sm btn-info"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: Math.ceil(apiData.length / itemsPerPage) }).map(
            (page, index) => (
              <button
                key={index}
                className={`btn btn-sm btn-info ${
                  currentPage === index + 1 ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
          <button
            className="btn btn-sm btn-info"
            onClick={nextPage}
            disabled={currentPage === Math.ceil(apiData.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
