import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";

export default function ManageUser() {
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const [editedStatus, setEditedStatus] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://192.168.1.3:8081/admin/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserList(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(userList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userList.slice(indexOfFirstItem, indexOfLastItem);

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

    const maxButtons = 4;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
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

  const handleDelete = (id) => {
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
        const token = localStorage.getItem("token");
        const url = `http://192.168.1.3:8081/admin/user/${id}`;

        fetch(url, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            if (res.ok) {
              Swal.fire("Deleted!", "User has been deleted.", "success");
              const updatedUserList = userList.filter((user) => user.id !== id);
              setUserList(updatedUserList);
            }
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
          });
      }
    });
  };

  const startEditingStatus = (id) => {
    // Start editing status for the user with the given ID
    setEditedStatus((prevEditedStatus) => ({
      ...prevEditedStatus,
      [id]: {
        isEditing: true,
        editedStatus: userList.find((user) => user.id === id).status,
      },
    }));
  };

  const handleEditStatus = (id) => {
    // Save the edited status for the user with the given ID
    const editedUser = {
      ...userList.find((user) => user.id === id),
      status: editedStatus[id].editedStatus,
    };

    const token = localStorage.getItem("token");
    const url = `http://192.168.1.3:8081/admin/user/${id}`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editedUser),
    })
      .then((res) => {
        if (res.ok) {
          Swal.fire("Updated!", "User status has been updated.", "success");
          const updatedUserList = userList.map((user) =>
            user.id === id ? editedUser : user
          );
          setUserList(updatedUserList);
          cancelEditingStatus(id);
        }
      })
      .catch((error) => {
        console.error("Error updating user status:", error);
      });
  };

  const cancelEditingStatus = (id) => {
    // Cancel editing status for the user with the given ID
    setEditedStatus((prevEditedStatus) => ({
      ...prevEditedStatus,
      [id]: {
        isEditing: false,
        editedStatus: prevEditedStatus[id].editedStatus,
      },
    }));
  };

  return (
    <div className="p-2 shadow-lg rounded-xl border">
      <h1 className="text-center text-4xl font-semibold mb-0">Manage User</h1>
      <div className="divider mt-0"></div>
      {loading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-lg bg-[#004bad2d] rounded-lg">
                <th className="font-bold">ID</th>
                <th className="font-bold">Name</th>
                <th className="font-bold">Email</th>
                <th className="font-bold">Status</th>
                <th className="font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((user, index) => (
                <tr
                  key={index}
                  className="hover bg-slate-100 border-b border-gray-300 text-lg"
                >
                  <th>{user.id}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {editedStatus[user.id]?.isEditing ? (
                      <div className="flex items-center">
                        <select
                          value={editedStatus[user.id].editedStatus.toString()}
                          onChange={(e) =>
                            setEditedStatus((prevEditedStatus) => ({
                              ...prevEditedStatus,
                              [user.id]: {
                                ...prevEditedStatus[user.id],
                                editedStatus: e.target.value === "true",
                              },
                            }))
                          }
                        >
                          <option value="true">Active</option>
                          <option value="false">Inactive</option>
                        </select>
                        <button
                          className="btn btn-sm bg-green-200"
                          onClick={() => handleEditStatus(user.id)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-sm bg-red-200"
                          onClick={() => cancelEditingStatus(user.id)}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div>
                        {user.status ? "Active" : "Inactive"}
                        <button
                          className="btn btn-sm bg-blue-200 ml-2"
                          onClick={() => startEditingStatus(user.id)}
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </td>
                  <td width="30">
                    <div className="flex gap-5">
                      <button
                        onClick={() => handleDelete(user.id)}
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
      )}

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
