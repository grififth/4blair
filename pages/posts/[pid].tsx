import { Fragment } from "react";
import NavBar from "../../components/NavBar";

import { CommentType, PostType } from "../../utils/types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const Post = ({ pid }) => {
    const { data: post } = useQuery({
        queryKey: ["post", pid],
        queryFn: () => fetch(`/backend/getpost?id=${pid}`).then((res) => res.json()),
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
        queryKey: ["comments"],
        queryFn: ({ pageParam = "" }) =>
            fetch(`/backend/getcomments?id=${pid}&cursor=${pageParam}`).then((res) => res.json()),
        getNextPageParam: (lastPage) => lastPage.nextId ?? false,
        refetchOnWindowFocus: false,
    });

    console.log(comments);

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-3xl font-bold">Error</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center">
            <NavBar />
            {post && comments && (
                <div className="w-full p-4 flex flex-col items-center gap-4">
                    <div className="w-full p-4 bg-lightforeground dark:bg-darkforeground rounded-lg shadow-md flex flex-col gap-4 border-1 border-border">
                        <h1 className="text-2xl font-bold text-lightaccent dark:text-darkaccent">
                            {post && post["title"]}
                        </h1>
                        <p className="text-justify">{post && post["content"]}</p>
                    </div>
                    <div className="w-full p-4 bg-lightforeground dark:bg-darkforeground rounded-lg shadow-md flex flex-col gap-4 border-1 border-border">
                        <h1 className="text-2xl font-bold">Comments</h1>
                        {comments.pages.map((page, i) => (
                            <Fragment key={i}>
                                {page.comments &&
                                    page.comments.map((comment: CommentType) => (
                                        <div
                                            className="w-full p-4 m-4 bg-lightforeground dark:bg-darkforeground rounded-lg shadow-md flex flex-col gap-4 border-1 border-border"
                                            key={comment["id"]}
                                        >
                                            <h1 className="text-2xl font-bold">
                                                {comment["content"]}
                                            </h1>
                                        </div>
                                    ))}
                            </Fragment>
                        ))}
                        {!isLoading && !isFetchingNextPage && hasNextPage && (
                            <button
                                className="w-full p-4 bg-lightaccent dark:bg-darkaccent rounded-lg shadow-md flex flex-col gap-4 border-1 border-border"
                                onClick={() => fetchNextPage()}
                            >
                                Load More
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export function getServerSideProps(context) {
    const { pid } = context.params;
    return {
        props: {
            pid,
        },
    };
}

export default Post;
