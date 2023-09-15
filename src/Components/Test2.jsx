import React, { useEffect, useState } from "react";

export default function Test2() {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    // Fetch data from the provided URL
    fetch("https://8d85-118-179-97-19.ngrok-free.app/admin/admin")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.text(); // Assuming the response is text
      })
      .then((data) => {
        // Set the response data in state
        setResponseData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error, possibly show an error message to the user
      });
  }, []);

  return (
    <div>
      <h1>Test2</h1>
      <div>
        {/* Display the response data */}
        <pre>{responseData}</pre>
      </div>
    </div>
  );
}
