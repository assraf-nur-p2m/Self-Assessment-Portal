import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function ModuleRequest() {
  const [moduleRequests, setModuleRequests] = useState([]);

  useEffect(() => {
    fetchModuleRequests();
  }, []);

  const fetchModuleRequests = () => {
    fetch("http://192.168.1.29:8081/admin/pendingModule")
      .then((res) => res.json())
      .then((data) => {
        setModuleRequests(data);
      })
      .catch((error) => {
        console.error("Error fetching module requests:", error);
      });
  };

  const handleApprove = (id) => {
    fetch(`http://192.168.1.29:8081/admin/pendingModule/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          fetchModuleRequests();
          Swal.fire({
            icon: "success",
            title: "Module Approved",
            text: "The module request has been approved successfully.",
          });
        } else {
          console.error("Error approving module");
        }
      })
      .catch((error) => {
        console.error("Error approving module:", error);
      });
  };

  const handleReject = (id) => {
    fetch(`http://192.168.1.29:8081/admin/pendingModule/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          fetchModuleRequests();
          Swal.fire({
            icon: "error",
            title: "Module Rejected",
            text: "The module request has been rejected successfully.",
          });
        } else {
          console.error("Error rejecting module");
        }
      })
      .catch((error) => {
        console.error("Error rejecting module:", error);
      });
  };

  return (
    <div className="p-2 shadow-lg rounded-xl border">
        <h1 className="text-center text-3xl font-bold py-3 ">Module Request Table</h1>
        <hr />
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>Module Name</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {moduleRequests.map((request) => (
              <tr key={request.id}>
                <td className="w-[20%]">{request.id}</td>
                <td className="w-[20%]">{request.userName}</td>
                <td className="w-[20%]">{request.userEmail}</td>
                <td className="w-[20%]">{request.moduleName}</td>
                <td className="flex gap-8 w-[20%]">
                  <button
                    onClick={() => handleApprove(request.id)}
                    className="btn btn-success btn-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="btn btn-error btn-sm"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
