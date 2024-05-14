import React, { useState, useEffect, useRef } from "react";
// import ReactQuill from "react-quill";
import Quill from "quill"; // Import Quill library
import "react-quill/dist/quill.snow.css";
import { useLocation } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
const TextEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const stompClientRef = useRef(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const docID = params.get("docID");
  const initialContent = params.get("content") || ""; // Get initial content from URL query string and defaults to empty string
  const [content, setContent] = useState(initialContent); //represents current content of the editor
  const [buffer, setBuffer] = useState(initialContent); //used for buffering changes before sending them to the server
  // const [sessionID, setSessionID] = useState(null);
  let sessionID = null;
  useEffect(() => {
    //initializes the editor when the component mounts or when the initialContent changes
    sessionID = generateSessionID();
    console.log("generated session ID = " + sessionID);
    console.log("sessionIDgedeed=" + sessionID);
    if (!editorRef.current) {
      //checks it has not been initialized before
      editorRef.current = new Quill("#editor-container", {
        modules: {
          toolbar: [["bold", "italic"]],
        },
        theme: "snow",
      });
      //setBuffer(initialContent);
      editorRef.current.on("text-change", handleTextChange); //attaching a listener for text changes
      editorRef.current.setText("");
      editorRef.current.clipboard.dangerouslyPasteHTML(initialContent);
    }
  }, [initialContent]);

  // useEffect(() => {
  //   console.log("Session ID:", sessionID); // Log session ID when it changes
  // }, [sessionID]);

  useEffect(() => {
    //triggered when buffer state changes
    console.log("buffernew=" + buffer);
    setContent(buffer);
    const plainText = buffer.replace(/<[^>]+>/g, ""); //converts HTML to plaintext
    editorRef.current.setText(plainText);
    editorRef.current.setSelection(plainText.length); //sets cursor
    console.log("plainText=" + plainText);
  }, [buffer]);
  console.log("sessionzt=" + sessionID);

  const handleSendMessage = (operation, character, index) => {
    if (stompClientRef.current !== null && sessionID !== null) {
      console.log("sessionzeft=" + sessionID);
      stompClientRef.current.send(
        `/app/application/${docID}`,
        {},
        JSON.stringify({ operation, character, index, sessionID })
      );
    }
  };
  const generateSessionID = () => {
    const timestamp = Date.now().toString(36); // Current timestamp in base 36
    const randomString = Math.random().toString(36).substring(2, 8); // Random string in base 36
    return timestamp + randomString; // Combine timestamp and random string
  };
  const handleTextChange = (delta, oldDelta, source) => {
    //called when content changes
    if (source === "user") {
      //checks if the change is by user
      let insertedIndex = null;
      let insertedChar = null;
      let deletedIndex = null;
      let deletedChar = null;
      delta.ops.forEach((op) => {
        if (op.insert) {
          if (typeof op.insert === "string") {
            insertedChar = op.insert;
          } else if (
            typeof op.insert === "object" &&
            op.insert.hasOwnProperty("image")
          ) {
            insertedChar = "[IMAGE]";
          }
        } else if (op.delete) {
          deletedIndex = op.delete;
          deletedChar = oldDelta.ops[0].insert; // Assuming only one character is deleted
        }
      });
      if (deletedIndex !== null && deletedChar !== null) {
        console.log("Deleted character:", deletedChar);
        handleSendMessage(deletedChar, deletedIndex - 1);
      }

      const selection = editorRef.current.getSelection();
      if (selection) {
        insertedIndex = selection.index;
      }
      handleSendMessage(insertedChar, insertedIndex - 1);
    }
  };
  useEffect(() => {
    if (sessionID) {
      const socket = new SockJS("https://collabbackend.onrender.com/ws");
      const client = Stomp.over(socket);
      client.connect(
        {},
        () => {
          console.log("Websocket connection established.");
          stompClientRef.current = client;
          if (stompClientRef.current) {
            stompClientRef.current.subscribe(
              `/all/messages/${docID}`,
              (message) => {
                const receivedmsg = JSON.parse(message.body);
                console.log(receivedmsg.index + "," + receivedmsg.character);
                if (receivedmsg.sessionID !== sessionID) {
                  insertAtIndex(receivedmsg.index, receivedmsg.character);
                }
              }
            );
          }
        },
        (error) => {
          console.error("Websocket connection failed:", error);
        }
      );
      return () => {
        if (stompClientRef.current) {
          stompClientRef.current.disconnect();
        }
      };
    }
  }, []);
  function insertAtIndex(index, character) {
    setBuffer((prevBuffer) => {
      let str = prevBuffer.replace(/<[^>]+>/g, "");
      str = str.slice(0, index) + character + str.slice(index);
      return str;
    });
    console.log("buffernew2=" + buffer);
  }
  return (
    <div className="container">
      <h1>Text Editor</h1>
      <div id="editor-container" />
      {/* <ReactQuill modules={module} value={content} onChange={handleChange} /> */}
    </div>
  );
};

export default TextEditor;
