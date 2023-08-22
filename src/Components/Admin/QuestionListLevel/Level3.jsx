import React, { useEffect, useState } from "react";

export default function Level3() {
  const [question1, setQuestion1] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("http://192.168.1.29:8081/admin/question/3")
      .then((res) => res.json())
      .then((data) => {
        setQuestion1(data);
        console.log(data);
      });
  }, []);

  const totalPages = Math.ceil(question1.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = question1.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleGoButtonClick = () => {
    const inputPage = parseInt(document.getElementById("jumpPageInput").value);
    if (!isNaN(inputPage)) {
      handlePageChange(inputPage);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`btn btn-sm bg-blue-200 mr-2 ${
            i === currentPage ? "bg-blue-500" : ""
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="p-2 shadow-lg rounded-xl border">
      <h1 className="text-center text-4xl font-semibold mb-0">
        Level-3 Question Set
      </h1>
      <div className="divider mt-0"></div>
      <div className="overflow-x-auto">
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
            {currentItems.map((item, index) => (
              <tr
                key={index}
                className="hover bg-slate-100 border-b border-gray-300 text-lg"
              >
                <th>{item.id}</th>
                <td>{item.context}</td>
                <td>
                  <div>
                    <p
                      className={
                        item.answer.correctAnswer === "A"
                          ? "correct-answer ps-2 rounded-lg"
                          : "ps-2 bg-[#DCDDDF] py-1 border rounded-lg"
                      }
                    >
                      A. {item.answer.a}
                    </p>
                    <p
                      className={
                        item.answer.correctAnswer === "B"
                          ? "correct-answer ps-2 rounded-lg"
                          : "ps-2 bg-[#DCDDDF] py-1 border rounded-lg"
                      }
                    >
                      B. {item.answer.b}
                    </p>
                    <p
                      className={
                        item.answer.correctAnswer === "C"
                          ? "correct-answer ps-2 rounded-lg"
                          : "ps-2 bg-[#DCDDDF] py-1 border rounded-lg"
                      }
                    >
                      C. {item.answer.c}
                    </p>
                    <p
                      className={
                        item.answer.correctAnswer === "D"
                          ? "correct-answer ps-2 rounded-lg"
                          : "ps-2 bg-[#DCDDDF] py-1 border rounded-lg"
                      }
                    >
                      D. {item.answer.d}
                    </p>
                  </div>
                </td>
                <td width="30">
                  <div className="flex gap-5">
                    <button className="btn btn-sm bg-blue-200">Edit</button>
                    <button className="btn btn-sm bg-red-200">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-3">
        <div className="flex items-center">
          <button
            className="btn btn-sm bg-blue-200 mr-2"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          {renderPageNumbers()}
          <button
            className="btn btn-sm bg-blue-200"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
        <div className="flex items-center">
          <input
            id="jumpPageInput"
            type="number"
            min={1}
            max={totalPages}
            className="px-2 py-1 border rounded-lg mr-2"
          />
          <button
            className="btn btn-sm bg-blue-200"
            onClick={handleGoButtonClick}
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
}
