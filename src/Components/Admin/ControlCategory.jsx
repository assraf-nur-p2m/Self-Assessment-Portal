import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function ControlCategory() {
  const [cat, setCat] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCategory, setEditedCategory] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://192.168.1.3:8081/admin/category", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCat(data);
      })
      .catch((error) => {
        console.error("Error fetching category data:", error);
      });
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    const category = e.target.category.value;

    const newCategoryData = {
      category,
    };

    fetch("http://192.168.1.3:8081/admin/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newCategoryData),
    })
      .then((res) => {
        if (res.status === 409) {
          Swal.fire({
            icon: "error",
            title: "Duplicate Category",
            text: "Category already exists.",
          });
        } else if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to add category");
        }
      })
      .then((data) => {
        if (data && data.id) {
          setCat([...cat, data]);
          const sortedCategories = [...cat, data].sort((a, b) => a.id - b.id);
          setCat(sortedCategories);

          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });

          e.target.reset();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDelete = (id) => {
    // Show a double confirmation alert using Swal
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
        fetch(`http://192.168.1.3:8081/admin/category/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            if (res.ok) {
              setCat(cat.filter((category) => category.id !== id));
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Category deleted successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Delete Error",
                text: "Failed to delete category.",
              });
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });
  };

  const handleEdit = (category) => {
    // Toggle the editing state and set the edited category data
    setIsEditing(true);
    setEditedCategory(category);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    // Send a PUT request to update the category data
    fetch(`http://192.168.1.3:8081/admin/category/${editedCategory.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editedCategory),
    })
      .then((res) => {
        if (res.ok) {
          // Update the cat state with the edited category
          setCat((prevCat) =>
            prevCat.map((category) =>
              category.id === editedCategory.id ? editedCategory : category
            )
          );
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Category updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          setIsEditing(false);
        } else {
          Swal.fire({
            icon: "error",
            title: "Edit Error",
            text: "Failed to update category.",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleEditInputChange = (e) => {
    setEditedCategory({
      ...editedCategory,
      category: e.target.value,
    });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditedCategory({});
  };

  const renderEditForm = () => {
    return (
      <form onSubmit={handleSaveEdit}>
        <input
          className="mb-2 input input-bordered"
          type="text"
          name="editedCategory"
          value={editedCategory.category}
          onChange={handleEditInputChange}
        />
        <button className="btn btn-xs btn-online btn-success" type="submit">
          Save
        </button>
        <button className="btn btn-xs btn-error ms-4" onClick={cancelEdit}>
          Cancel
        </button>
      </form>
    );
  };

  return (
    <div>
      <div className="p-2 shadow-lg rounded-xl h-auto">
        <div>
          <form action="" onSubmit={handleAdd}>
            <input
              required
              name="category"
              type="text"
              placeholder="Add new Category"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="submit"
              className="btn btn-outline btn-sm btn-accent ms-5 px-8 text-bold "
              value="Add"
            />
          </form>
        </div>

        <div className="overflow-x-auto mt-5 border-t-2">
          <table className="table table-zebra">
            {/* Table header */}
            <thead>
              <tr>
                <th className="w-[25%]">Serial Number</th>
                <th className="w-[25%]">ID</th>
                <th className="w-[25%]">Category</th>
                <th className="w-[25%] text-center">Action</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {cat.map((category, index) => (
                <tr key={category.id}>
                  <td>{index + 1}</td>
                  <td>{category.id}</td>
                  <td>
                    {isEditing && editedCategory.id === category.id
                      ? renderEditForm()
                      : category.category}
                  </td>
                  <td>
                    {isEditing && editedCategory.id === category.id ? (
                      <></>
                    ) : (
                      <div className="flex justify-between gap-0 px-12">
                        <button
                          onClick={() => handleEdit(category)}
                          className="btn btn-info btn-sm mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="btn btn-error btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    )}
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
