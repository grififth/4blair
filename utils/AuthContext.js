import { createContext, useEffect, useState, useContext } from "react";

import { supabase } from "./supabaseClient";

// create a context for authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // create state values for user data and loading
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // get session data if there is an active session
        const session = supabase.auth.session();

        setUser(session?.user ?? null);
        setLoading(false);

        // listen for changes to auth
        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // cleanup the useEffect hook
        return () => {
            listener?.unsubscribe();
        };
    }, []);

    // create signUp, signIn, signOut functions
    const value = {
        signUp: async (data) => {
            // const verifyr = await fetch("/api/verifyuser", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(data),
            // });
            const verifyr = await fetch("/backend/verifyuser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            console.log(verifyr);
            if (verifyr.status !== 200) {
                const error = await verifyr.json();
                return { error };
            }
            const { error } = await supabase.auth.signUp({
                email: data.username + "@blairchan.com",
                password: data.password,
            });
            if (error) {
                return { error };
            }
            // await fetch("/api/createuser", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(data),
            // });
            await fetch("/backend/createuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            return { error: null };
        },
        signIn: async (data) => {
            const { error } = await supabase.auth.signIn({
                email: data.username + "@blairchan.com",
                password: data.password,
            });
            console.log(error);
            if (error) {
                return { error };
            }
            return { error: null };
        },
        signOut: async () => await supabase.auth.signOut(),
        user,
    };

    // use a provider to pass down the value
    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

// export the useAuth hook
export const useAuth = () => {
    return useContext(AuthContext);
};
