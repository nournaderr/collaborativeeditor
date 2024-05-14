import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
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
  const initialContent = params.get("content") || ""; // Get initial content from URL query string
  const [content, setContent] = useState(initialContent);
  // const toolbarOptions = [["bold", "italic"]];
  // const module = {
  //   toolbar: toolbarOptions,
  // };
  const handleChange = (value) => {
    setContent(value);
  };
  const [buffer, setBuffer] = useState(initialContent);
  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new Quill("#editor-container", {
        modules: {
          toolbar: [["bold", "italic"]],
        },
        theme: "snow",
      });
      editorRef.current.on("text-change", handleTextChange);
      editorRef.current.setText("");
      editorRef.current.clipboard.dangerouslyPasteHTML(initialContent);
    }
  }, [initialContent]);
  useEffect(() => {
    console.log("buffernew" + buffer);
    setContent(buffer);
    const plainText = buffer.replace(/<[^>]+>/g, "");
    editorRef.current.setText(plainText);
    editorRef.current.setSelection(plainText.length);
    console.log("plainText=" + plainText);
  }, [buffer]);
  const handleSendMessage = (insertedIndex, insertedChar) => {
    if (stompClientRef.current !== null) {
      stompClientRef.current.send(
        `/app/application/${docID}`,
        {},
        JSON.stringify({ insertedIndex, insertedChar })
      );
    }
  };
  const handleTextChange = (delta, oldDelta, source) => {
    if (source === "user") {
      let insertedIndex = null;
      let insertedChar = null;
      let textSize = null;
      delta.ops.forEach((op) => {
        const selection = editorRef.current.getSelection();
        if (selection) {
          const content = editorRef.current.getText(
            0,
            editorRef.current.getLength()
          );
          textSize = content.length;
        }
        if (op.insert) {
          if (typeof op.insert === "string") {
            if (textSize === 2) {
              insertedIndex = editorRef.current.getSelection().index;
            } else {
              insertedIndex = editorRef.current.getSelection().index - 1;
            }
            insertedChar = op.insert;
          } else if (
            typeof op.insert === "object" &&
            op.insert.hasOwnProperty("image")
          ) {
            insertedChar = "[IMAGE]";
          }
        }
      });
      const plainText = buffer.replace(/<[^>]+>/g, "");
      editorRef.current.setText(plainText);
      editorRef.current.setSelection(plainText.length);
      handleSendMessage(insertedIndex, insertedChar);
    }
  };
  useEffect(() => {
    const socket = new SockJS("https://collabbackend.onrender.com/ws");
    const client = Stomp.over(socket);
    client.conect(
      {},
      () => {
        console.log("Websocket connection established.");
        stompClientRef.current = client;
        if (stompClientRef.current) {
          stompClientRef.current.subscribe(
            `/all/broadcast/${docID}`,
            (message) => {
              const receivedmsg = JSON.parse(message.body);
              console.log(
                receivedmsg.insertedIndex + "," + receivedmsg.insertedChar
              );
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
  });
  return (
    <div className="container">
      <h1>Text Editor</h1>
      <div id="editor-container" />
      {/* <ReactQuill modules={module} value={content} onChange={handleChange} /> */}
    </div>
  );
};

export default TextEditor;
