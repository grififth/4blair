import { Fragment, useEffect, useRef, useState } from "react";
import NavBar from "../../components/NavBar";
import Comment from "../../components/Comment";

import { CommentType, PostType } from "../../utils/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";

import { MdClose } from "react-icons/md";

import Head from "next/head";

const Post = ({ pid }) => {
  const [replyToId, setReplyToId] = useState<number>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const contentRef = useRef(null);
  const isSubmitting = useRef(false);
  const newCommentRef = useRef(null);

  const { data: post } = useQuery({
    queryKey: ["post", pid],
    queryFn: () =>
      fetch(`/backend/getpost?id=${pid}`).then((res) => res.json()),
    refetchOnWindowFocus: false,
  });

  const {
    data: comments,
    isLoading,
    error,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments", pid],
    queryFn: ({ pageParam = "" }) =>
      fetch(`/backend/getcomments?id=${pid}&cursor=${pageParam}`).then((res) =>
        res.json()
      ),
    getNextPageParam: (lastPage) => lastPage.nextId ?? false,
    refetchOnWindowFocus: false,
  });

  let replyToComment: CommentType = null;

  if (comments) {
    for (let page of comments.pages) {
      for (let comment of page.comments) {
        if (comment.id === replyToId) {
          replyToComment = comment;
          break;
        }
      }
    }
  }

  useEffect(() => {
    const handleKeyPress = async (e: KeyboardEvent) => {
      if (hasNextPage && !isFetchingNextPage && e.key === "w") {
        fetchNextPage();
      }
    };
    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const postComment = async () => {
    if (isSubmitting.current) return;
    isSubmitting.current = true;
    const req = await fetch("/backend/createcomment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: pid,
        content: contentRef.current.value,
        replyToId: replyToId,
      }),
    });

    let status = req.status;

    if (status === 200) {
      setStatusMessage("Comment posted!");
      window.location.reload();
    } else {
      setStatusMessage("There was an error!");
    }

    isSubmitting.current = false;
  };

  if (isError) {
    let errorMessage = "Something went wrong!";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Head>
          <title>Error!</title>
        </Head>
        <h1 className="text-4xl font-bold text-center">
          There was an error! Please let me know.
        </h1>
        <h1 className="text-3xl font-bold text-danger">{errorMessage}</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>Loading...</title>
      </Head>
      {post && (
        <Head>
          <title>{post["title"]}</title>
        </Head>
      )}
      <NavBar />
      {post && (
        <div className="w-full lg:w-2/3 p-2 lg:p-4 flex flex-col items-center gap-4">
          <div className="w-full p-4 bg-foreground rounded-lg shadow-md flex flex-col gap-4 border-1 border-border">
            <h1 className="text-3xl font-bold text-texttitle ">
              {post && post["title"]}
            </h1>
            <p className="text-justify text-lg">{post && post["content"]}</p>
          </div>
          {comments && (
            <div className="w-full flex flex-col items-center gap-2">
              <div
                className="w-full flex flex-col gap-4 p-4 bg-foreground rounded-lg shadow-md border-1 border-border"
                ref={newCommentRef}
              >
                <h1 className="text-xl text-texttitle">New Comment</h1>
                {replyToComment && (
                  <div className="flex w-full text-md text-accent2 items-center justify-between">
                    <h2 className="text-ellipsis whitespace-nowrap overflow-hidden block">
                      {replyToComment["content"]}
                    </h2>
                    <button
                      onClick={() => {
                        setReplyToId(null);
                      }}
                    >
                      {"Don't reply"}
                    </button>
                  </div>
                )}
                <textarea
                  placeholder="Content"
                  className="w-full h-36 p-4 rounded-lg bg-foreground border-1 border-border placeholder-placeholder"
                  ref={contentRef}
                />

                {statusMessage && (
                  <div className="w-full text-md text-accent ">
                    {statusMessage}
                  </div>
                )}
                <button
                  className="w-full p-2 bg-button text-textbutton font-bold rounded-lg shadow-md border-1 border-border"
                  onClick={() => postComment()}
                >
                  Submit
                </button>
              </div>
              {comments.pages.map(
                (page, i): JSX.Element => (
                  <Fragment key={i}>
                    {page.comments &&
                      page.comments.map((comment: CommentType) => (
                        <Comment
                          key={comment.id}
                          comment={comment}
                          setReplyToId={setReplyToId}
                          newCommentRef={newCommentRef}
                        />
                      ))}
                  </Fragment>
                )
              )}
              {!isLoading && !isFetchingNextPage && hasNextPage && (
                <button
                  className="w-1/2 p-4 bg-button text-textbutton font-bold rounded-lg shadow-md flex flex-col border-1 border-border"
                  onClick={() => fetchNextPage()}
                >
                  Load More (W)
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pid } = context.params;
  return {
    props: {
      pid,
    },
  };
};

export default Post;
