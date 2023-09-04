import React, { useEffect, useState } from "react";
import { FaPlus } from 'react-icons/fa';

export default function ControlCategory() {
  const [cat, setCat] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.29:8081/admin/category")
      .then((res) => res.json())
      .then((data) => {
        setCat(data);
      });
  }, []);

  const handleDelete = (id) => {
    // Implement your delete logic here using the category ID
    console.log(`Delete category with ID ${id}`);
  };

  const handleEdit = (id) => {
    // Implement your edit logic here using the category ID
    console.log(`Edit category with ID ${id}`);
  };

  return (
    <div>
      <div className="p-2 shadow-lg rounded-xl h-auto">
        <div>
          <form action="">
            <input
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
                  <td>{category.category}</td>
                  <td className="flex justify-between gap-0 px-12">
                    <button
                      onClick={() => handleEdit(category.id)}
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
