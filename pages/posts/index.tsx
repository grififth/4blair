import { useEffect, useState } from "react";

import NavBar from "../../components/NavBar";
import NewPostModal from "../../components/NewPostModal";
import Post from "../../components/Post";

import { FiEdit } from "react-icons/fi";
import { BiRefresh } from "react-icons/bi";

export default function Posts() {
    const [posts, setPosts] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const getPosts = async () => {
        setPosts(null);
        await fetch("/backend/getposts")
            .then((res) => res.json())
            .then((data) => {
                setPosts(data);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    useEffect(() => {
        getPosts();
    }, []);

    console.table(posts);

    return (
        <div className="w-screen h-screen flex flex-col items-center">
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
                    {posts && (
                        <div className="bg-lightforeground dark:bg-darkforeground mr-4 rounded-lg shadow-md p-4 flex flex-col gap-4 border-1 border-border">
                            <button
                                className="w-full p-4 bg-lightaccent dark:bg-darkaccent rounded-lg text-white font-bold flex items-center justify-center shadow-md gap-2"
                                onClick={() => getPosts()}
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
                    {posts ? (
                        posts.map((post) => {
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
