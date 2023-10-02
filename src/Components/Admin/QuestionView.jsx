import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function QuestionView() {
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("1");
  const [questionData, setQuestionData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://192.168.1.13:8081/admin/category", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCategory(data);
        if (data.length > 0) {
          setSelectedCategory(data[0].category);
        }
      });
  }, []);

  useEffect(() => {
    if (selectedCategory && selectedLevel) {
      fetch(
        `http://192.168.1.13:8081/question/${selectedCategory}/${selectedLevel}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

  // Calculate the range of items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = questionData.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages
  const totalPages = Math.ceil(questionData.length / itemsPerPage);

  // Function to handle page changes
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleDelete = (id) => {
    // Show a confirmation dialog using SweetAlert
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
        // User clicked "Yes," make the delete API request
        const url = `http://192.168.1.13:8081/question/${id}`;

        fetch(url, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            if (res.ok) {
              Swal.fire("Deleted!", "Question has been deleted.", "success");

              // Update the questionData state by filtering out the deleted question
              const updatedQuestionData = questionData.filter(
                (question) => question.id !== id
              );
              setQuestionData(updatedQuestionData);
            } else {
              Swal.fire("Error", "Failed to delete the question.", "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting question:", error);
            Swal.fire("Error", "Failed to delete the question.", "error");
          });
      }
    });
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
            {/* Dropdown for selecting category */}
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
        {currentItems.length > 0 ? (
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
                {currentItems.map((item) => (
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
                        {/* <button className="btn btn-sm bg-blue-200">Edit</button> */}
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

        {/* Pagination buttons */}
        <div className="flex justify-center mt-4">
          <button
            className="btn btn-sm bg-blue-200"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`btn btn-sm ${
                i + 1 === currentPage ? "bg-blue-500" : "bg-blue-200"
              } mx-2`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="btn btn-sm bg-blue-200"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
