import Router from "next/router";

import { useEffect } from "react";

import { useAuth } from "../../utils/AuthContext";

export default function Posts() {
    const { user, signOut } = useAuth();

    useEffect(() => {
        if (!user) {
            Router.push("/auth");
        }
    }, [user]);

    return (
        <div>
            <h1>Posts</h1>
            <button onClick={signOut}>Sign Out</button>
        </div>
    );
}
