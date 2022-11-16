import Router from "next/router";

import { useEffect, useState } from "react";

import NavBar from "../../components/NavBar";
import Post from "../../components/Post";

export default function Posts() {
    const [posts, setPosts] = useState(null);

    const getPosts = async () => {
        fetch("/backend/getposts")
            .then((res) => res.json())
            .then((data) => {
                setPosts(data);
            });
    };

    useEffect(() => {
        getPosts();
    }, []);

    console.log(posts);

    return (
        <div className="w-screen h-screen flex flex-col items-center">
            <NavBar />
            <div className="w-full p-8 grid grid-cols-4">
                <div className="col-span-1 bg-lightforeground dark:bg-darkforeground h-full mr-4 rounded-lg shadow-md"></div>
                <div className="col-span-3 bg-lightforeground dark:bg-darkforeground ml-4 rounded-lg shadow-md p-4 flex flex-col gap-4">
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
