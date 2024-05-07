import React, { useState, useEffect } from "react";
import axios from "axios";

function FileList() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Fetch recent files data when component mounts
    axios
      .get("/api/recent-files")
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recent files:", error);
      });
  }, []);

  return (
    <div>
      <h2>File List</h2>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            {file.name}
            {/* Add more file details and actions */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileList;
