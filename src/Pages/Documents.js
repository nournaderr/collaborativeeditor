import React, { useState, useEffect } from "react";
import axios from "axios";
import DocumentCard from "../Components/DocumentCard";
import "../styles/Documents.css";
import { useLocation } from "react-router-dom";
//add document - username and doc name in post requests
function Documents() {
  const [selectedOption, setSelectedOption] = useState("myFiles");
  const [files, setFiles] = useState([]);
  const [editfiles, seteditFiles] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const username = params.get("username");
  useEffect(() => {
    if (selectedOption === "myFiles" && username) {
      axios
        .get(`https://collabbackend.onrender.com/owneddocs/${username}`)
        .then((response) => {
          setFiles(response.data);
        })
        .catch((error) => {
          console.error("Error fetching my files:", error);
        });
    } else if (selectedOption === "sharedFiles" && username) {
      axios
        .get(`https://collabbackend.onrender.com/viewdocs/${username}`)
        .then((response) => {
          setFiles(response.data);
        })
        .catch((error) => {
          console.error("Error fetching shared files:", error);
        });
      axios
        .get(`https://collabbackend.onrender.com/editdocs/${username}`)
        .then((response) => {
          seteditFiles(response.data);
        })
        .catch((error) => {
          console.error("Error fetching additional files:", error);
        });
    }
  }, [selectedOption, username]); //usage of useEffect with a dependency on selectedOption

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
        <p>{username}'s Documents</p>
        <ul>
          {files.map(
            (
              file //iterates over each element in files array
            ) => (
              <DocumentCard
                docID={file.docID}
                docName={file.docName}
                authorName={file.authorName}
              />
            )
          )}
        </ul>
        {editfiles.length > 0 && ( // Check if there are files to be edited
          <ul>
            {editfiles.map((file) => (
              <DocumentCard
                docID={file.docID}
                docName={file.docName}
                authorName={file.authorName}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Documents;
