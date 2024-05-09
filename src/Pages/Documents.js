import React, { useState, useEffect } from "react";
import axios from "axios";
import DocumentCard from "../Components/DocumentCard";
import "../styles/Documents.css";
import { useLocation } from "react-router-dom";

function Documents() {
  const [selectedOption, setSelectedOption] = useState("myFiles");
  const [files, setFiles] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const username = params.get("username");
  useEffect(() => {
    if (selectedOption === "myFiles") {
      axios
        .post("https://collabbackend.onrender.com/owneddocs")
        .then((response) => {
          setFiles(response.data);
        })
        .catch((error) => {
          console.error("Error fetching my files:", error);
        });
    } else if (selectedOption === "sharedFiles") {
      axios
        .post("https://collabbackend.onrender.com/shareddocs")
        .then((response) => {
          setFiles(response.data);
        })
        .catch((error) => {
          console.error("Error fetching shared files:", error);
        });
    }
  }, [selectedOption]); //usage of useEffect with a dependency on selectedOption

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <div className="Navblock">
        <p className="title">File List</p>
        <select
          value={selectedOption}
          onChange={(e) => handleOptionChange(e.target.value)}
        >
          <option value="myFiles">My Files</option>
          <option value="sharedFiles">Shared Files</option>
        </select>
      </div>
      <div className="document-list">
        <ul>
          {files.map(
            (
              file //iterates over each element in files array
            ) => (
              <DocumentCard
                key={file.id}
                title={file.title}
                fileType={file.fileType}
                date={file.date}
                thumbnail={file.thumbnail}
              />
            )
          )}
        </ul>
      </div>
    </div>
  );
}

export default Documents;
