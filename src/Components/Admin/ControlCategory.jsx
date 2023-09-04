import React, { useEffect, useState } from "react";
import { json } from "react-router-dom";

export default function ControlCategory() {
  const [cat, setCat] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.29:8081/admin/category")
      .then((res) => res.json())
      .then((data) => {
        setCat(data);
      });
  }, []);

  return (
    <div>
      <div className="p-2 shadow-lg rounded-xl h-auto">
        
      </div>
    </div>
  );
}
