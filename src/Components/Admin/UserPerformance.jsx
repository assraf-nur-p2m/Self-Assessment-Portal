import React, { useEffect, useState } from "react";

export default function UserPerformance() {
  const [moduleList, setModuleList] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);

  useEffect(() => {
    fetch("http://192.168.1.29:8081/admin/module")
      .then((res) => res.json())
      .then((data) => {
        setModuleList(data);
        if (data.length > 0) {
          setSelectedModule(data[0].id);
        }
      });
  }, []);

  const handleModuleChange = (moduleId) => {
    setSelectedModule(moduleId);
    console.log("Selected Module ID:", moduleId);
  };

  return (
    <div className="p-2 shadow-lg rounded-xl border">
      <h1 className="text-center text-4xl font-semibold mb-0">
        Student Performance
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
              {module.moduleName}
            </option>
          ))}
        </select>
      </div>

      {/* Display selected module */}
      {selectedModule && (
        <div className="mt-4 ms-1">
          <h2 className="text-xl font-semibold">
            Students table of {selectedModule}
          </h2>
          {/* You can display additional module details here */}
        </div>
      )}
    </div>
  );
}
