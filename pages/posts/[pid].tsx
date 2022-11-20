import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";

import Router from "next/router";

const Post = () => {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);

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
    };

    useEffect(() => {
        getPost();
    }, []);

    return (
        <div>
            <NavBar />
        </div>
    );
};

export default Post;
