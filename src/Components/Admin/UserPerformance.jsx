import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../Authentication/AuthProvider";

export default function UserPerformance() {
  const [moduleList, setModuleList] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [data, setData] = useState([]);
  const user = useContext(AuthContext);

  useEffect(() => {
    fetch("http://192.168.1.2:8081/admin/module")
      .then((res) => res.json())
      .then((data) => {
        setModuleList(data);
        if (data.length > 0) {
          setSelectedModule(data[0].id);
        }
      });
  }, []);

  useEffect(() => {
    if (selectedModule) {
      handleModuleChange(selectedModule);
    }
  }, [selectedModule]);

  const handleModuleChange = (moduleId) => {
    setSelectedModule(moduleId);
    fetch(`http://192.168.1.2:8081/admin/module/userofmodule/${moduleId}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  };

  return (
    <div className="p-2 shadow-lg rounded-xl border">
      <h1 className="text-center text-4xl font-semibold mb-0">
        Student Performance {user && <span>{user.displayName} {user.age}</span>}
      </h1>
      <div className="divider mt-0"></div>

      <div className="mt-4">
        <label htmlFor="moduleDropdown" className="font-semibold ms-1">
          Select Module:
        </label>
        <select
          id="moduleDropdown"
          className="block w-full mt-1 p-3 rounded-lg border"
          onChange={(event) => handleModuleChange(event.target.value)}
          value={selectedModule || ""}
        >
          <option value="">Select a module</option>
          {moduleList.map((module) => (
            <option key={module.id} value={module.id}>
              {module.moduleName} {module.moduleId}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 ms-1">
        <div className="overflow-x-auto border rounded-lg mb-3 shadow-lg">
          <table className="table">
            <thead>
              <tr>
                <th className="w-[25%]">UserID</th>
                <th className="w-[25%]">Name</th>
                <th className="w-[25%]">Email</th>
                <th className="w-[25%] text-center">Quiz Marks</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.marks.map((mark, index) => (
                      <p className="text-center" key={index}>
                        {mark}
                      </p>
                    ))}
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
