import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { GrUserAdmin } from "react-icons/gr";

export default function ManageAdmin() {
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [editedNames, setEditedNames] = useState({});
  const [editedEmails, setEditedEmails] = useState({});
  const [editedPermissions, setEditedPermissions] = useState({});
  const [editedStatus, setEditedStatus] = useState({});

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

        const initialEditedPermissions = {};
        filteredUserList.forEach((user) => {
          initialEditedPermissions[user.id] = {
            isEditing: false,
            permissions: { ...user.permission },
          };
        });
        setEditedPermissions(initialEditedPermissions);

        const initialEditedStatus = {};
        filteredUserList.forEach((user) => {
          initialEditedStatus[user.id] = {
            isEditing: false,
            editedStatus: user.status,
          };
        });
        setEditedStatus(initialEditedStatus);
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

  const startEditingPermissions = (id) => {
    setEditedPermissions((prevEditedPermissions) => ({
      ...prevEditedPermissions,
      [id]: {
        ...prevEditedPermissions[id],
        isEditing: true,
      },
    }));
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

  const handleEditPermissions = (id) => {
    const updatedPermissions = editedPermissions[id].permissions;

    // Get the user with the specified ID
    const userToUpdate = userList.find((user) => user.id === id);

    // Create the updated user object with the new permissions
    const updatedUser = {
      ...userToUpdate,
      permission: { ...updatedPermissions },
    };

    // Make a PUT request to update the admin's permissions
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

          Swal.fire(
            "Updated!",
            "Admin permissions have been updated.",
            "success"
          );
          setEditedPermissions((prevEditedPermissions) => ({
            ...prevEditedPermissions,
            [id]: {
              ...prevEditedPermissions[id],
              isEditing: false,
            },
          }));
        } else {
          // Handle error cases here
          Swal.fire("Error!", "Failed to update admin permissions.", "error");
        }
      })
      .catch((error) => {
        console.error("Error updating user permissions:", error);
        Swal.fire("Error!", "Failed to update admin permissions.", "error");
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

  const cancelEditingPermissions = (id) => {
    setEditedPermissions((prevEditedPermissions) => ({
      ...prevEditedPermissions,
      [id]: {
        ...prevEditedPermissions[id],
        isEditing: false,
        permissions: { ...userList.find((user) => user.id === id).permission }, // Reset to the original permissions
      },
    }));
  };

  const renderEditPermissions = (id) => {
    const permissions = editedPermissions[id].permissions;
    const permissionList = [];

    for (const key in permissions) {
      if (permissions.hasOwnProperty(key) && key !== "id") {
        permissionList.push(
          <li key={key}>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={permissions[key]}
                onChange={(e) =>
                  setEditedPermissions((prevEditedPermissions) => ({
                    ...prevEditedPermissions,
                    [id]: {
                      ...prevEditedPermissions[id],
                      permissions: {
                        ...prevEditedPermissions[id].permissions,
                        [key]: e.target.checked,
                      },
                    },
                  }))
                }
                className="checkbox"
              />
              <span className="ml-2">{key}</span>
            </label>
          </li>
        );
      }
    }

    return <ul>{permissionList}</ul>;
  };

  const startEditingStatus = (id) => {
    setEditedStatus((prevEditedStatus) => ({
      ...prevEditedStatus,
      [id]: {
        ...prevEditedStatus[id],
        isEditing: !prevEditedStatus[id].isEditing,
      },
    }));
  };

  const handleEditStatus = (id) => {
    const updatedStatus = !userList.find((user) => user.id === id).status;

    // Get the user with the specified ID
    const userToUpdate = userList.find((user) => user.id === id);

    // Create the updated user object with the new status
    const updatedUser = {
      ...userToUpdate,
      status: updatedStatus,
    };

    // Make a PUT request to update the admin's status
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

          Swal.fire("Updated!", "Admin status has been updated.", "success");
          setEditedStatus((prevEditedStatus) => ({
            ...prevEditedStatus,
            [id]: {
              ...prevEditedStatus[id],
              isEditing: false,
            },
          }));
        } else {
          // Handle error cases here
          console.error("Error:", res.status, res.statusText);
          Swal.fire("Error!", "Failed to update admin status.", "error");
        }
      })
      .catch((error) => {
        console.error("Error updating user status:", error);
        Swal.fire("Error!", "Failed to update admin status.", "error");
      });
  };

  const cancelEditingStatus = (id) => {
    setEditedStatus((prevEditedStatus) => ({
      ...prevEditedStatus,
      [id]: userList.find((user) => user.id === id).status, // Reset to the original status
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

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Admin",
      text: "Are you sure you want to delete this admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Send a DELETE request to the API
        const url = `https://cc87-118-179-97-19.ngrok-free.app/admin/admin/${id}`;

        fetch(url, {
          method: "DELETE",
        })
          .then((res) => {
            if (res.ok) {
              // Remove the deleted admin from the userList
              setUserList((prevUserList) =>
                prevUserList.filter((user) => user.id !== id)
              );

              Swal.fire("Deleted!", "Admin has been deleted.", "success");
            } else {
              // Handle error cases here
              console.error("Error:", res.status, res.statusText);
              Swal.fire("Error!", "Failed to delete admin.", "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting admin:", error);
            Swal.fire("Error!", "Failed to delete admin.", "error");
          });
      }
    });
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

                <td>
                  {editedPermissions[user.id].isEditing ? (
                    <>
                      {renderEditPermissions(user.id)}
                      <button
                        className="btn btn-sm bg-green-200"
                        onClick={() => handleEditPermissions(user.id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-sm bg-red-200"
                        onClick={() => cancelEditingPermissions(user.id)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center">
                      <span className="mr-2">View or Edit Permissions</span>
                      <button
                        className="btn btn-sm bg-blue-200"
                        onClick={() => startEditingPermissions(user.id)}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </td>

                <td>
                  {editedStatus[user.id].isEditing ? (
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
