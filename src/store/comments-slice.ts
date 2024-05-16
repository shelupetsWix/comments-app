import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { RootState } from ".";

type Comment = {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  replies: Comment[];
};

const initialState: Comment[] = [];

const findCommentAndParent = (
  comments: Comment[],
  id: string
): { comment?: Comment; parent?: Comment } | undefined => {
  for (const comment of comments) {
    if (comment.id === id) {
      return { comment };
    }
    for (const reply of comment.replies) {
      if (reply.id === id) {
        return { comment: reply, parent: comment };
      }
      const found = findCommentAndParent(reply.replies, id);
      if (found) {
        return { ...found, parent: reply };
      }
    }
  }
  return undefined;
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Omit<Comment, "id">>) => {
      const newComment = { id: uuidv4(), ...action.payload };
      state.push(newComment);
    },
    deleteComment: (state, action: PayloadAction<string>) => {
      const { parent } = findCommentAndParent(state, action.payload) || {};
      if (parent) {
        parent.replies = parent.replies.filter(
          (reply) => reply.id !== action.payload
        );
      } else {
        return state.filter((comment) => comment.id !== action.payload);
      }
    },
    updateComment: (
      state,
      action: PayloadAction<{ id: string; content: string }>
    ) => {
      const { id, content } = action.payload;
      const { comment } = findCommentAndParent(state, id) || {};
      if (comment) {
        comment.content = content;
      }
    },
    addReply: (
      state,
      action: PayloadAction<{ commentId: string; reply: Comment }>
    ) => {
      const { commentId, reply } = action.payload;
      const { comment } = findCommentAndParent(state, commentId) || {};
      if (comment) {
        comment.replies.push(reply);
      }
    },
  },
});

export const selectComments = (state: RootState) => state.comments;

export const { addComment, deleteComment, updateComment, addReply } =
  commentsSlice.actions;

export default commentsSlice.reducer;
