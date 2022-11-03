import Router from "next/router";

import { useAuth } from "../utils/AuthContext.js";
import { useState } from "react";

export default function Auth() {
    const { signUp } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [stage, setStage] = useState(0);

    const registerUser = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        setError("Registering...");
        console.log(e.target);
        const { error } = await signUp({
            studentid: e.target.studentid.value,
            sidpassword: e.target.sidpassword.value,
            username: e.target.username.value,
            password: e.target.password.value,
        });
        setLoading(false);
        if (error) {
            setError(error.message);
        } else {
            Router.push("/");
        }
    };

    const stageAnswers = ["yes"];

    const renderStage = () => {
        switch (stage) {
            case 0:
                return (
                    <div className="auth-content-0">
                        <h2>PLEASE MAKE SURE YOU ACTUALLY READ THIS.</h2>
                        <p>
                            {`As a quick introduction: Hi I\'m Stephen from Class of 2025. \n
                            What you\'re looking at right now is just a quick overview of the rules
                            and information about the site. \n
                            Please actually read this before I get in trouble because you didn\'t.
                            \n
                            In fact, each slide will require an input to continue just to verify
                            you\'re actually paying attention. \n
                            Input "yes" into the box to continue. \n`}
                        </p>
                        <h2>
                            {`IMPORTANT: Blairchan is not affiliated with Montgomery Blair High School
                            in any way.`}
                        </h2>
                    </div>
                );
            case 1:
                return (
                    <div className="auth-content-1">
                        <form onSubmit={(e) => registerUser(e)}>
                            <input type="text" name="studentid" placeholder="Student ID" />
                            <input
                                type="password"
                                name="sidpassword"
                                placeholder="Student ID Password"
                            />
                            <input type="text" name="username" placeholder="Username" />
                            <input type="password" name="password" placeholder="Password" />
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                );
            default:
                return <div>Something went wrong.</div>;
        }
    };

    const renderStageInput = () => {
        const authInput = document.getElementById("auth-continue-answer");
        if (authInput) {
            if (authInput.value == stageAnswers[stage]) {
                setError("");
                setStage(stage + 1);
            } else {
                setError("Read.");
            }
        } else {
            setError("Something went wrong.");
        }
    };

    return (
        <div className="auth">
            <div className="auth-card">
                <div className="auth-title">
                    <h1>Authentication</h1>
                </div>
                <div className="auth-content">{renderStage()}</div>
                <div className="auth-continue">
                    <h1 className="auth-continue-error">{error}</h1>
                    <input
                        type="text"
                        placeholder="answer"
                        className="auth-continue-answer"
                        id="auth-continue-answer"
                    />
                    <div className="auth-continue-button">
                        <button className="button-29" onClick={() => renderStageInput()}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
