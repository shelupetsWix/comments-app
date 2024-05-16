import React from "react";
import "./App.css";
import { CommentForm, CommentList } from "./components";

function App() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <CommentForm />
      <CommentList />
    </div>
  );
}

export default App;
