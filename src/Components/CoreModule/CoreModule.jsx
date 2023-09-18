import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CoreModule() {
  const { moduleId } = useParams();
  const [moduleInfo, setModuleInfo] = useState({});

  useEffect(() => {
    fetch(`http://192.168.1.29:8081/admin/module/info/${moduleId}`)
      .then((res) => res.json())
      .then((data) => {
        setModuleInfo(data);
      });
  }, [moduleId]);

  return (
    <div className="login-page p-6">
      <div className="bg-white p-5 rounded-lg">
        <h1 className="text-4xl font-bold">{moduleInfo.moduleName}</h1>

        <div className="flex justify-center gap-12">
          <div>media player</div>
          <div>media list</div>
        </div>
      </div>
    </div>
  );
}
