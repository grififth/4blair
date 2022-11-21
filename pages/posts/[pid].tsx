import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";

import Router from "next/router";

import { CommentType, PostType } from "../../utils/types";

const Post = () => {
    const [post, setPost] = useState<PostType | null>(null);
    const [comments, setComments] = useState<CommentType[] | null>(null);

    const getPost = async () => {
        const { pid } = Router.query;
        const postRes = await fetch(`/backend/getpost?id=${pid}`);
        const postStatus = postRes.status;

        if (postStatus !== 200) {
            alert("Post not found!");
            Router.push("/posts");
        }

        const postData = await postRes.json();

        setPost(postData["post"]);
        setComments(postData["comments"]);
        console.log(postData);
    };

    useEffect(() => {
        getPost();
    }, []);

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
                        {comments.map((comment) => (
                            <div
                                className="w-full p-4 m-4 bg-lightforeground dark:bg-darkforeground rounded-lg shadow-md flex flex-col gap-4 border-1 border-border"
                                key={comment["id"]}
                            >
                                <h1 className="text-2xl font-bold">{comment["content"]}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Post;
