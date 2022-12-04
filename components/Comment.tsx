import { CommentType } from "../utils/types";

import timeDiff from "../utils/globalFunctions";

interface CommentProps {
  comment: CommentType;
  setReplyToId: (id: number) => void;
  newCommentRef: React.RefObject<HTMLTextAreaElement>;
}

const Comment = ({ comment, setReplyToId, newCommentRef }: CommentProps) => {
  return (
    <div className="w-full p-4 bg-foreground rounded-lg shadow-md flex flex-col border-1 border-border">
      {comment["replyToContent"] && (
        <h2 className="text-md text-accent2 text-ellipsis whitespace-nowrap overflow-hidden block">
          {comment["replyToContent"]}
        </h2>
      )}
      <p className="text-lg">{comment["content"]}</p>
      <div className="flex justify-between text-sm">
        <p>{timeDiff(new Date(Date.parse(comment.createdAt)))}</p>
        <button
          className="text-accent2"
          onClick={() => {
            setReplyToId(comment["id"]);
            newCommentRef.current.scrollIntoView();
          }}
        >
          Reply
        </button>
      </div>
    </div>
  );
};

export default Comment;
