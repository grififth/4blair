import Router from "next/router";

import { useAuth } from "../utils/AuthContext.js";
import { useState } from "react";

import StudentVue from "studentvue";

const RenderText = (text) => {
    return text.split("\n").map((str, i) => <p key={i}>{str}</p>);
};

export default function Auth() {
    const { signUp } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [stage, setStage] = useState(0);
    const [credentials, setCredentials] = useState({
        studentid: "",
        sidpassword: "",
    });
    const [authenticated, setAuthenticated] = useState(false);

    const verifyUser = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        setError("Verifying...");
        const studentid = e.target.studentid.value;
        const sidpassword = e.target.sidpassword.value;
        let message = "";
        try {
            const client = await StudentVue.login("https://md-mcps-psv.edupoint.com", {
                username: studentid,
                password: sidpassword,
            });
            const attendance = await client.attendance();
            if (attendance["schoolName"] !== "Montgomery Blair High") {
                message = "You aren't elligible";
            } else {
                message = "Success";
            }
        } catch (e) {
            message = "StudentVue Verification Error";
        }
        if (message === "Success") {
            setAuthenticated(true);
            setCredentials({
                studentid: studentid,
                sidpassword: sidpassword,
            });
        }
        setError(message);
        setLoading(false);
    };

    const registerUser = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        setError("Registering...");
        const { studentid, sidpassword } = credentials;
        const { error } = await signUp({
            studentid: studentid,
            sidpassword: sidpassword,
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

    const stageAnswers = ["yes", "accept"];

    const renderStage = () => {
        switch (stage) {
            case 0:
                return (
                    <div className="auth-content-0">
                        <h2>PLEASE MAKE SURE YOU ACTUALLY READ THIS.</h2>
                        {RenderText(`As a quick introduction: Hi I\'m Stephen from Class of 2025. \n
                            What you\'re looking at right now is just a quick overview of the rules
                            and information about the site. \n
                            Please actually read this before I get in trouble because you didn\'t.
                            \n
                            In fact, each slide will require an input to continue just to verify
                            you\'re actually paying attention. \n
                            Input "yes" into the box to continue. \n`)}
                        <h2>
                            {`IMPORTANT: 4Blair is not affiliated with Montgomery Blair High School
                            in any way.`}
                        </h2>
                    </div>
                );
            case 1:
                return (
                    <div className="auth-content-1">
                        <h2>What is 4Blair?</h2>
                        {RenderText(`4Blair is an anonymous private forum. \n
                            The next page will authenticate you and make sure you're eligable to use this site. \n
                            You will be prompted to enter your StudentVue login information. \n
                            This information will be used a single time to verify your school. \n 
                            Any posts you make are unable to be traced back to you UNLESS you post something bad enough to warrant legal or administrative action. \n
                            TLDR: It's competely anonymous unless you post something REALLY REALLY bad.
                            Input "accept" to accept these conditions and continue.`)}
                    </div>
                );
            case 2:
                return (
                    <div className="auth-content-2">
                        <form onSubmit={(e) => verifyUser(e)}>
                            <input type="text" name="studentid" placeholder="Student ID" />
                            <input
                                type="password"
                                name="sidpassword"
                                placeholder="StudentVue Password"
                            />
                            <input type="submit" value="Verify" />
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
                    {stage !== 2 && (
                        <input
                            type="text"
                            placeholder="answer"
                            className="auth-continue-answer"
                            id="auth-continue-answer"
                        />
                    )}
                    <div className="auth-continue-button">
                        {(stage !== 2 || authenticated) && (
                            <button className="button-29" onClick={() => renderStageInput()}>
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
