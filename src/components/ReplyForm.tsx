import React, { type FC, useState } from 'react';

type ReplyFormProps  = {
  onSubmit: (replyContent: string) => void;
}

export const ReplyForm: FC<ReplyFormProps> = ({ onSubmit }) => {
  const [replyContent, setReplyContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyContent.trim()) {
      onSubmit(replyContent);
      setReplyContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 mt-2">
      <input
        type="text"
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
        placeholder="Add a reply..."
        className="flex-1 p-2 border rounded-lg"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">Reply</button>
    </form>
  );
};
