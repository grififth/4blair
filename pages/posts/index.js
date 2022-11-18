import { useEffect, useState } from "react";

import NavBar from "../../components/NavBar";
import NewPostModal from "../../components/NewPostModal";
import Post from "../../components/Post";

export default function Posts() {
    const [posts, setPosts] = useState(null);

    const getPosts = async () => {
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
            <div className="w-full p-8 flex">
                <div className="w-1/4 bg-lightforeground dark:bg-darkforeground mr-4 rounded-lg shadow-md">
                    <button className="w-full p-4 bg-lightaccent dark:bg-darkaccent rounded-lg text-white font-bold">
                        New Post
                    </button>
                    <NewPostModal />
                </div>
                <div className="w-3/4 bg-lightforeground dark:bg-darkforeground ml-4 rounded-lg shadow-md p-4 flex flex-col ">
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
