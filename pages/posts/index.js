// import Router from "next/router";

// import { useEffect } from "react";

// import { useAuth } from "../../utils/AuthContext";

import NavBar from "../../components/NavBar";

export default function Posts() {
    // const { user, signOut } = useAuth();

    // useEffect(() => {
    //     if (!user) {
    //         Router.push("/auth");
    //     }
    // }, [user]);

    return (
        <div>
            <NavBar />
        </div>
    );
}
