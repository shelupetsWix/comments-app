import React, { type FC, useState } from "react";
import { useDispatch } from "../store";
import { addComment } from "../store/comments-slice";

export const CommentForm: FC = () => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      dispatch(
        addComment({
          author: "Current User",
          content,
          timestamp: new Date().toISOString(),
          replies: [],
        })
      );
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a comment..."
        className="flex-1 p-2 border rounded-lg"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
        Send
      </button>
    </form>
  );
};
