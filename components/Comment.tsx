import { CommentType } from "../utils/types";

import timeDiff from "../utils/globalFunctions";

interface CommentProps {
  comment: CommentType;
  setReplyToId: (id: number) => void;
}

const Comment = ({ comment, setReplyToId }: CommentProps) => {
  return (
    <div className="w-full p-4 bg-lightforeground dark:bg-darkforeground rounded-lg shadow-md flex flex-col border-1 border-border">
      {comment["replyToContent"] && (
        <h2 className="text-md text-lightaccent dark:text-darkaccent text-ellipsis whitespace-nowrap overflow-hidden block">
          {comment["replyToContent"]}
        </h2>
      )}
      <p className="text-lg">{comment["content"]}</p>
      <div className="flex justify-between text-sm">
        <p>{timeDiff(new Date(Date.parse(comment.createdAt)))}</p>
        <button onClick={() => setReplyToId(comment["id"])}>Reply</button>
      </div>
    </div>
  );
};

export default Comment;
