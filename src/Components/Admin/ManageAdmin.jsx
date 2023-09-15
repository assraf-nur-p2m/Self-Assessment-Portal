import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { GrUserAdmin } from "react-icons/gr";

export default function ManageAdmin() {
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [editedNames, setEditedNames] = useState({});
  const [editedEmails, setEditedEmails] = useState({});

  useEffect(() => {
    fetch("https://cc87-118-179-97-19.ngrok-free.app/admin/admin", {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const filteredUserList = data.filter(
          (user) => user.role !== "superadmin"
        );
        setUserList(filteredUserList);

        // Initialize editedNames with an empty object for each admin
        const initialEditedNames = {};
        filteredUserList.forEach((user) => {
          initialEditedNames[user.id] = {
            isEditing: false,
            editedName: user.name,
          };
        });
        setEditedNames(initialEditedNames);

        const initialEditedEmails = {};
        filteredUserList.forEach((user) => {
          initialEditedEmails[user.id] = {
            isEditing: false,
            editedEmail: user.email,
          };
        });
        setEditedEmails(initialEditedEmails);
      });
  }, []);

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

  const handleGoButtonClick = () => {
    const inputPage = parseInt(document.getElementById("jumpPageInput").value);
    if (!isNaN(inputPage)) {
      handlePageChange(inputPage);
    }
  };

  const totalPages = Math.ceil(userList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userList.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const startEditing = (id) => {
    setEditedNames((prevEditedNames) => ({
      ...prevEditedNames,
      [id]: {
        ...prevEditedNames[id],
        isEditing: true,
      },
    }));
  };

  const handleEditName = (id) => {
    const updatedName = editedNames[id].editedName;

    // Get the user with the specified ID
    const userToUpdate = userList.find((user) => user.id === id);

    // Create the updated user object with the new name
    const updatedUser = {
      ...userToUpdate,
      name: updatedName,
    };

    // Make a PUT request to update the admin's name
    const url = `https://cc87-118-179-97-19.ngrok-free.app/admin/admin/${id}`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser), // Send the updated user object
    })
      .then((res) => {
        if (res.ok) {
          // Update the userList with the updated user data
          setUserList((prevUserList) =>
            prevUserList.map((user) => (user.id === id ? updatedUser : user))
          );

          Swal.fire("Updated!", "Admin name has been updated.", "success");
          setEditedNames((prevEditedNames) => ({
            ...prevEditedNames,
            [id]: {
              ...prevEditedNames[id],
              isEditing: false,
            },
          }));
        } else {
          // Handle error cases here
          Swal.fire("Error!", "Failed to update admin name.", "error");
        }
      })
      .catch((error) => {
        console.error("Error updating user name:", error);
        Swal.fire("Error!", "Failed to update admin name.", "error");
      });
  };

  const startEditingEmail = (id) => {
    setEditedEmails((prevEditedEmails) => ({
      ...prevEditedEmails,
      [id]: {
        ...prevEditedEmails[id],
        isEditing: true,
      },
    }));
  };

  const handleEditEmail = (id) => {
    const updatedEmail = editedEmails[id]?.editedEmail;

    // Get the user with the specified ID
    const userToUpdate = userList.find((user) => user.id === id);

    // Create the updated user object with the new email
    const updatedUser = {
      ...userToUpdate,
      email: updatedEmail,
    };

    // Make a PUT request to update the admin's email
    const url = `https://cc87-118-179-97-19.ngrok-free.app/admin/admin/${id}`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser), // Send the updated user object
    })
      .then((res) => {
        if (res.ok) {
          // Update the userList with the updated user data
          setUserList((prevUserList) =>
            prevUserList.map((user) => (user.id === id ? updatedUser : user))
          );

          Swal.fire("Updated!", "Admin email has been updated.", "success");
          setEditedEmails((prevEditedEmails) => ({
            ...prevEditedEmails,
            [id]: {
              ...prevEditedEmails[id],
              isEditing: false,
            },
          }));
        } else {
          // Handle error cases here
          Swal.fire("Error!", "Failed to update admin email.", "error");
        }
      })
      .catch((error) => {
        console.error("Error updating user email:", error);
        Swal.fire("Error!", "Failed to update admin email.", "error");
      });
  };

  const cancelEditingEmail = (id) => {
    setEditedEmails((prevEditedEmails) => ({
      ...prevEditedEmails,
      [id]: {
        ...prevEditedEmails[id],
        isEditing: false,
        editedEmail: userList.find((user) => user.id === id).email, // Reset to the original email
      },
    }));
  };

  const renderPermissionList = (permission) => {
    const permissionList = [];

    for (const key in permission) {
      if (permission.hasOwnProperty(key) && key !== "id") {
        const label = key.replace(/([A-Z])/g, " $1").trim(); // Convert camelCase to spaced label
        permissionList.push(
          <li key={key}>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={permission[key]}
                className="checkbox"
              />
              <span className="ml-2">{label}</span>
            </label>
          </li>
        );
      }
    }

    return <ul>{permissionList}</ul>;
  };

  const cancelEditing = (id) => {
    setEditedNames((prevEditedNames) => ({
      ...prevEditedNames,
      [id]: {
        ...prevEditedNames[id],
        isEditing: false,
        editedName: userList.find((user) => user.id === id).name, // Reset to the original name
      },
    }));
  };

  return (
    <div className="p-2 shadow-lg rounded-xl border">
      <div className="flex items-center justify-between">
        <h1 className="text-center text-4xl font-semibold mb-0 ps-1">
          Manage Admin
        </h1>
        <Link
          className="bg-success flex items-center justify-between gap-3 text-lg px-3 py-1 rounded-lg font-bold"
          to="/dashboard/add-admin"
        >
          <GrUserAdmin /> Create Admin
        </Link>
      </div>
      <div className="divider mt-0"></div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-lg bg-[#004bad2d] rounded-lg">
              <th className="font-bold">ID</th>
              <th className="font-bold">Name</th>
              <th className="font-bold">Email</th>
              <th className="font-bold">Permission</th>
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
                <td>
                  {editedNames[user.id].isEditing ? (
                    <>
                      <input
                        type="text"
                        value={editedNames[user.id].editedName}
                        onChange={(e) =>
                          setEditedNames((prevEditedNames) => ({
                            ...prevEditedNames,
                            [user.id]: {
                              ...prevEditedNames[user.id],
                              editedName: e.target.value,
                            },
                          }))
                        }
                      />
                      <button
                        className="btn btn-sm bg-green-200"
                        onClick={() => handleEditName(user.id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-sm bg-red-200"
                        onClick={() => cancelEditing(user.id)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center">
                      {user.name}
                      <button
                        className="btn btn-sm bg-blue-200 ml-2"
                        onClick={() => startEditing(user.id)}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </td>
                <td>
                  {editedEmails[user.id]?.isEditing ? (
                    <>
                      <input
                        type="text"
                        value={editedEmails[user.id]?.editedEmail}
                        onChange={(e) =>
                          setEditedEmails((prevEditedEmails) => ({
                            ...prevEditedEmails,
                            [user.id]: {
                              ...prevEditedEmails[user.id],
                              editedEmail: e.target.value,
                            },
                          }))
                        }
                      />
                      <button
                        className="btn btn-sm bg-green-200"
                        onClick={() => handleEditEmail(user.id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-sm bg-red-200"
                        onClick={() => cancelEditingEmail(user.id)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <div>
                      {user.email}
                      <button
                        className="btn btn-sm bg-blue-200 ml-2"
                        onClick={() => startEditingEmail(user.id)}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </td>

                <td>{renderPermissionList(user.permission)}</td>
                <td>{user.status ? "Active" : "Inactive"}</td>
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
