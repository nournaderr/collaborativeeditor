import React, { useState, useEffect, useRef } from "react";
// import ReactQuill from "react-quill";
import Quill from "quill"; // Import Quill library
import "react-quill/dist/quill.snow.css";
import { useLocation } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const TextEditor = () => {
  const [editorHtml, setEditorHtml] = useState("");
  const editorRef = useRef(null);
  const stompClientRef = useRef(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const docID = params.get("docID");
  const initialContent = params.get("content") || ""; // Get initial content from URL query string and defaults to empty string
  const [content, setContent] = useState(initialContent); //represents current content of the editor
  const [buffer, setBuffer] = useState(initialContent); //used for buffering changes before sending them to the server

  var serverArr = [];
  var pendingChanges = [];
  let sessionID = null;
  let flag = false;
  useEffect(() => {
    //initializes the editor when the component mounts or when the initialContent changes
    sessionID = generateSessionID();
    console.log("generated session ID = " + sessionID);
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
  useEffect(() => {
    getContent();
  }, []);
  const getContent = async () => {
    try {
      const response = await fetch(
        `https://collabbackend.onrender.com/content/${docID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to open document");
      }
      console.log(response + "response");
      const responseData = await response.json(); // Parse response JSON
      console.log(responseData);
      setBuffer(responseData);
      console.log("Document opened successfully");
    } catch (error) {
      console.log("error");
      console.error(error);
      return;
    }
  };
  useEffect(() => {
    //triggered when buffer state changes
    console.log("buffernew=" + buffer);
    setContent(buffer);
    const plainText = buffer.replace(/<[^>]+>/g, ""); //converts HTML to plaintext
    editorRef.current.setText(plainText);
    editorRef.current.setSelection(plainText.length); //sets cursor
    console.log("plainText=" + plainText);
  }, [buffer]);
  const handleSendMessage = (
    operation,
    character,
    index,
    endIndex,
    isBold,
    isItalic,
    sessionID
  ) => {
    if (stompClientRef.current !== null && sessionID !== null) {
      stompClientRef.current.send(
        `/app/application/${docID}`,
        {},
        JSON.stringify({
          operation,
          character,
          index,
          endIndex,
          isBold,
          isItalic,
          sessionID,
        })
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
      let bold = false;
      let italic = false;
      let operation;
      let index = insertedIndex - 1;
      let endIndex = insertedIndex - 1;
      let format = {};
      delta.ops.forEach((op) => {
        if (op.insert) {
          operation = 0;
          if (typeof op.insert === "string") {
            insertedChar = op.insert;
          } else if (
            typeof op.insert === "object" &&
            op.insert.hasOwnProperty("image")
          ) {
            insertedChar = "[IMAGE]";
          }
        } else if (op.delete) {
          operation = 1;
          insertedChar = "";
        }
      });
      const selection = editorRef.current.getSelection();
      if (selection) {
        insertedIndex = selection.index;
      }
      const isBoldpressed = delta.ops.some(
        (op) => op.attributes && op.attributes.bold !== undefined
      );
      if (isBoldpressed) {
        operation = 2;
        index = selection.index - 1;
        endIndex = selection.index + selection.length - 1;
      }
      const isItalicpressed = delta.ops.some(
        (op) => op.attributes && op.attributes.italic !== undefined
      );
      if (isItalicpressed) {
        operation = 3;
        index = selection.index - 1;
        endIndex = selection.index + selection.length - 1;
      }
      pendingChanges.push(
        JSON.stringify({
          operation,
          insertedChar,
          index,
          endIndex,
          bold,
          italic,
          sessionID,
        })
      );
      if (operation === 0 || operation === 1) {
        handleSendMessage(
          operation,
          insertedChar,
          insertedIndex - 1,
          insertedIndex - 1,
          bold,
          italic,
          sessionID
        );
        setBuffer(editorRef.current.getText());
      } else if (operation === 2 || operation === 3) {
        handleSendMessage(
          operation,
          insertedChar,
          index,
          endIndex,
          bold,
          italic,
          sessionID
        );
        setBuffer(editorRef.current.getText());
      }
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
                if (receivedmsg === pendingChanges[0]) {
                  pendingChanges.shift();
                  return;
                } else {
                  for (let j = 0; j < pendingChanges.length; j++) {
                    if (
                      receivedmsg.operation == 0 &&
                      pendingChanges[j].operation == 0
                    ) {
                      if (receivedmsg.index <= pendingChanges[j].index) {
                        pendingChanges[j].index = pendingChanges[j].index + 1;
                      } else {
                        receivedmsg.index = receivedmsg.index + 1;
                      }
                    } else if (
                      receivedmsg.operation == 0 &&
                      pendingChanges[j].operation == 1
                    ) {
                      if (receivedmsg.index <= pendingChanges[j].index) {
                        pendingChanges[j].index = pendingChanges[j].index + 1;
                      } else {
                        receivedmsg.index = receivedmsg.index - 1;
                      }
                    } else if (
                      receivedmsg.operation == "del" &&
                      pendingChanges[j].operation == "ins"
                    ) {
                      if (receivedmsg.index <= pendingChanges[j].index) {
                        pendingChanges[j].index = pendingChanges[j].index - 1;
                      } else {
                        receivedmsg.index = receivedmsg.index + 1;
                      }
                    } else if (
                      receivedmsg.operation == "del" &&
                      pendingChanges[j].operation == "del"
                    ) {
                      if (receivedmsg.index <= pendingChanges[j].index) {
                        pendingChanges[j].index = pendingChanges[j].index - 1;
                      } else {
                        receivedmsg.index = receivedmsg.index - 1;
                      }
                    }
                  }
                }
                if (receivedmsg.sessionID !== sessionID) {
                  if (receivedmsg.operation === 0) {
                    insertAtIndex(receivedmsg.index, receivedmsg.character);
                  } else if (receivedmsg.operation === 1) {
                    deleteAtIndex(receivedmsg.index + 1);
                  } else if (receivedmsg.operation === 2) {
                    boldifyAtIndex(receivedmsg.index, receivedmsg.endIndex);
                  } else if (receivedmsg.operation === 3) {
                    italifyAtIndex(receivedmsg.index, receivedmsg.endIndex);
                  }
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
  function deleteAtIndex(index) {
    setBuffer((prevBuffer) => {
      let str = prevBuffer.replace(/<[^>]+>/g, "");
      str = str.slice(0, index) + str.slice(index + 1);
      return str;
    });
    console.log("buffernew2=" + buffer);
  }
  function boldifyAtIndex(index, endIndex) {
    setBuffer((prevBuffer) => {
      let bufferArray = prevBuffer.split(""); // Convert buffer string to array
      // Insert <strong> tag at the start index
      bufferArray.splice(index + 8, 0, "<strong>");
      // Insert </strong> tag at the end index + 1
      bufferArray.splice(endIndex + 9, 0, "</strong>"); // Add 9 to endIndex to account for the length of <strong> tag
      return bufferArray.join(""); // Convert array back to string
    });
    console.log("buffernew2=" + buffer);
    console.log("bold aho");
  }
  function italifyAtIndex(index, endIndex) {
    setBuffer((prevBuffer) => {
      let str = prevBuffer.replace(/<[^>]+>/g, "");
      str =
        str.slice(0, index) +
        "<em>" +
        str.slice(index, endIndex + 1) +
        "</em>" +
        str.slice(endIndex + 1);
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
