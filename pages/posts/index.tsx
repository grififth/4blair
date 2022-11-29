import { useState } from "react";

import NavBar from "../../components/NavBar";
import NewPostModal from "../../components/NewPostModal";

import Post from "../../components/Post";

import { FiEdit } from "react-icons/fi";
import { BiRefresh } from "react-icons/bi";

import { PostType } from "../../utils/types";
import { useQuery } from "@tanstack/react-query";

export default function Posts() {
    const [showModal, setShowModal] = useState(false);

    const { isFetching, isLoading, error, data, isError, refetch } = useQuery({
        queryKey: ["posts"],
        refetchOnWindowFocus: false,
        queryFn: () => fetch("/backend/getposts").then((res) => res.json()),
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
            <NavBar />
            {showModal && <NewPostModal setShowModal={setShowModal} />}
            <div className="w-full p-8 flex">
                <div className="w-1/4 flex flex-col gap-4">
                    <div className="bg-lightforeground dark:bg-darkforeground mr-4 rounded-lg shadow-md p-4 flex flex-col gap-4 border-1 border-border">
                        <button
                            className="w-full p-4 bg-lightaccent dark:bg-darkaccent rounded-lg text-white font-bold flex items-center justify-center shadow-md gap-2"
                            onClick={() => setShowModal(true)}
                        >
                            New Post <FiEdit size={30} />
                        </button>
                    </div>
                    {!isFetching && (
                        <div className="bg-lightforeground dark:bg-darkforeground mr-4 rounded-lg shadow-md p-4 flex flex-col gap-4 border-1 border-border">
                            <button
                                className="w-full p-4 bg-lightaccent dark:bg-darkaccent rounded-lg text-white font-bold flex items-center justify-center shadow-md gap-2"
                                onClick={() => refetch()}
                            >
                                Refresh <BiRefresh size={30} />
                            </button>
                        </div>
                    )}
                </div>
                <div className="w-3/4 bg-lightforeground dark:bg-darkforeground ml-4 rounded-lg shadow-md p-4 flex flex-col border-1 border-border">
                    <div className="flex flex-row justify-between items-center p-4 border-2 border-transparent border-b-lightaccent dark:border-b-darkaccent mb-2">
                        <h1 className="text-2xl font-bold text-ellipsis whitespace-nowrap overflow-hidden block">
                            Posts
                        </h1>

                        <div className="w-1/6 h-full grid grid-cols-2 items-center justify-items-center">
                            <p className="col-span-1">Comments</p>
                            <p className="col-span-1 text-sm">Updated</p>
                        </div>
                    </div>
                    {!isLoading ? (
                        data.map((post: PostType) => {
                            return <Post post={post} key={post.id} />;
                        })
                    ) : (
                        <div className="w-full h-full flex justify-center items-center">
                            <div className="animate-spin w-16 h-16 rounded-full bg-gradient-to-tr from-lightaccent to-darkaccent flex items-center justify-center">
                                <div className="w-14 h-14 rounded-full bg-lightforeground dark:bg-darkforeground"></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
