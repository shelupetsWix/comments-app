import React, { type FC } from "react";
import { useSelector } from "react-redux";
import { Comment } from "./Comment";
import { selectComments } from "../store/comments-slice";

export const CommentList: FC = () => {
  const comments = useSelector(selectComments);

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
};
