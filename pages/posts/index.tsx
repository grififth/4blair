import { Fragment, useState } from "react";

import NavBar from "../../components/NavBar";
import NewPostModal from "../../components/NewPostModal";

import Post from "../../components/Post";

import { FiEdit } from "react-icons/fi";
import { BiRefresh } from "react-icons/bi";

import { PostType } from "../../utils/types";
import Head from "next/head";

import { GetServerSideProps } from "next";
import { parseReadCookies } from "../../utils/globalFunctions";
import { getCookie } from "cookies-next";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function Posts({ readPosts }) {
  const [showModal, setShowModal] = useState(false);

  /* const { isFetching, isLoading, error, data, isError, refetch } = useQuery({ */
  /*   queryKey: ["posts"], */
  /*   refetchOnWindowFocus: false, */
  /*   queryFn: () => fetch("/backend/getposts").then((res) => res.json()), */
  /* }); */

  const [order, setOrder] = useState("desc");
  const [column, setColumn] = useState("updatedAt");

  const {
    data: posts,
    isLoading,
    error,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["posts", order, column],
    queryFn: ({ pageParam = "" }) =>
      fetch(
        `/backend/getposts?column=${column}&order=${order}&cursor=${pageParam}`
      ).then((res) => res.json()),
    getNextPageParam: (lastPage) => lastPage.nextId ?? false,
    refetchOnWindowFocus: false,
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Error! Please let me know.</h1>
        <h1 className="text-2xl font-bold">
          {error instanceof Error ? error.message : "An error has occurred"}
        </h1>
      </div>
    );
  }

  return (
    <div className="w-screen flex flex-col items-center">
      <Head>
        <title>Posts</title>
      </Head>
      <NavBar />
      {showModal && <NewPostModal setShowModal={setShowModal} />}
      <div className="w-full p-2 lg:p-8 flex flex-col lg:flex-row justify-center gap-2">
        <div className="w-full lg:w-1/4 flex flex-col gap-4 justify-center lg:justify-start">
          <div className="w-full bg-foreground mr-4 rounded-lg shadow-md p-4 flex flex-col gap-4 border-1 border-border">
            <button
              className="w-full p-4 bg-button rounded-lg text-textbutton font-bold flex items-center justify-center shadow-md gap-2"
              onClick={() => setShowModal(true)}
            >
              New Post <FiEdit size={30} />
            </button>
          </div>
          {!isFetching && (
            <div className="w-full bg-foreground mr-4 rounded-lg shadow-md p-4 flex flex-col gap-4 border-1 border-border">
              <button
                className="w-full p-4 bg-button rounded-lg text-textbutton font-bold flex items-center justify-center shadow-md gap-2"
                onClick={() => refetch()}
              >
                Refresh <BiRefresh size={30} />
              </button>
              <div className="w-full flex gap-2">
                <button
                  className={`w-full p-2 rounded-lg text-textbutton font-bold flex items-center justify-center shadow-md gap-2 ${
                    column === "updatedAt"
                      ? "bg-button"
                      : "bg-transparent border-1 border-border"
                  }`}
                  onClick={() => setColumn("updatedAt")}
                >
                  Time
                </button>
                <button
                  className={`w-full p-2 rounded-lg text-textbutton font-bold flex items-center justify-center shadow-md gap-2 ${
                    column === "commentsCount"
                      ? "bg-button"
                      : "bg-transparent border-1 border-border"
                  }`}
                  onClick={() => setColumn("commentsCount")}
                >
                  Comments
                </button>
              </div>
              <div className="w-full flex gap-2">
                <button
                  className={`w-full p-2 rounded-lg text-textbutton font-bold flex items-center justify-center shadow-md gap-2 ${
                    order === "asc"
                      ? "bg-button"
                      : "bg-transparent border-1 border-border"
                  }`}
                  onClick={() => setOrder("asc")}
                >
                  Ascending
                </button>
                <button
                  className={`w-full p-2 rounded-lg text-textbutton font-bold flex items-center justify-center shadow-md gap-2 ${
                    order === "desc"
                      ? "bg-button"
                      : "bg-transparent border-1 border-border"
                  }`}
                  onClick={() => setOrder("desc")}
                >
                  Descending
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="w-full lg:w-3/4 bg-foreground rounded-lg shadow-md gap-4 lg:gap-0 p-2 lg:p-4 lg:ml-4 flex flex-col border-1 border-border">
          <div className="flex flex-row justify-between items-center p-4 border-2 border-transparent border-b-accent mb-2">
            <h1 className="text-2xl font-bold text-ellipsis whitespace-nowrap overflow-hidden block">
              Posts
            </h1>

            <div className="opacity-0 lg:opacity-100 w-1/6 h-full grid grid-cols-2 items-center justify-items-center">
              <p className="col-span-1">Comments</p>
              <p className="col-span-1 text-sm">Updated</p>
            </div>
          </div>
          {!isLoading ? (
            posts.pages.map((page, i) => (
              <Fragment key={i}>
                {page.posts &&
                  page.posts.map((post: PostType) => (
                    <Post
                      post={post}
                      key={post.id}
                      read={post.id in readPosts ? readPosts[post.id] : -1}
                    />
                  ))}
              </Fragment>
            ))
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <div className="animate-spin w-16 h-16 rounded-full bg-gradient-to-tr from-accent to-darkaccent flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-foreground"></div>
              </div>
            </div>
          )}
          {!isFetchingNextPage && hasNextPage && (
            <button
              className="p-4 bg-button rounded-lg text-textbutton font-bold flex items-center justify-center shadow-md gap-2"
              onClick={() => fetchNextPage()}
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const readPosts = getCookie("readPosts", { req, res });
  const parsedReadPost = parseReadCookies(readPosts);
  return {
    props: {
      readPosts: parsedReadPost,
    },
  };
};
