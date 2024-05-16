import React, { type FC, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addReply,
  deleteComment,
  updateComment,
} from "../store/comments-slice";
import { v4 as uuidv4 } from "uuid";
import { ReplyForm } from "./ReplyForm";

type CommentProps = {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  replies: CommentProps[];
};

export const Comment: FC<CommentProps> = (props) => {
  const { id, author, content, timestamp, replies } = props;
  const dispatch = useDispatch();
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleDelete = () => {
    dispatch(deleteComment(id));
  };

  const handleUpdate = () => {
    const updatedContent = prompt("Update your comment", content);
    if (updatedContent) {
      dispatch(updateComment({ id, content: updatedContent }));
    }
  };

  const handleReply = (replyContent: string) => {
    dispatch(
      addReply({
        commentId: id,
        reply: {
          author: "Current User",
          content: replyContent,
          timestamp: new Date().toISOString(),
          id: uuidv4(),
          replies: [],
        },
      })
    );
    setShowReplyForm(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-lg font-semibold">{author}</h4>
          <p className="text-gray-600 text-sm">{timestamp}</p>
        </div>
        <div>
          <button onClick={handleUpdate} className="text-blue-500 mr-2">
            Update
          </button>
          <button onClick={handleDelete} className="text-red-500">
            Delete
          </button>
        </div>
      </div>
      <p className="mt-2">{content}</p>
      <button
        onClick={() => setShowReplyForm(!showReplyForm)}
        className="text-blue-500 mt-2"
      >
        Reply
      </button>
      {showReplyForm && <ReplyForm onSubmit={handleReply} />}
      <div className="ml-4 mt-4">
        {replies &&
          replies.map((reply) => <Comment key={reply.id} {...reply} />)}
      </div>
    </div>
  );
};
