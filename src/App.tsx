import React from "react";
import { CommentForm, CommentList } from "./components";

export const App = () => (
  <div className="max-w-2xl mx-auto p-4">
    <CommentForm />
    <CommentList />
  </div>
);
