import Router from "next/router";

import timeDiff from "../utils/globalFunctions";

export default function Post({ post }) {
  return (
    <div
      className="flex flex-row justify-between items-center hover:border-lightaccent dark:hover:border-darkaccent rounded-lg p-4 border-2 border-transparent"
      onClick={() => {
        Router.push(`/posts/${post.id}`);
      }}
    >
      <h1 className="w-5/6 text-2xl font-bold text-ellipsis whitespace-nowrap overflow-hidden block">
        {post.title}
      </h1>
      <div className="w-1/6 h-full grid grid-cols-2 items-center justify-items-center">
        <p className="col-span-1">{post.commentsCount}</p>
        <p className="col-span-1 text-sm">
          {timeDiff(new Date(Date.parse(post.updatedAt)))}
        </p>
      </div>
    </div>
  );
}
