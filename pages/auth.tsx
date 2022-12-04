import { useLayoutEffect, useRef, useState } from "react";

import gsap from "gsap";

import Head from "next/head";

import ThemeSwitch from "../components/ThemeSwitch";
import Router from "next/router";

const STEPS = 4;

export default function Auth() {
  const [step, setStep] = useState(0);
  const [prevStep, setPrevStep] = useState(0);

  const barRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        barRef.current,
        {
          width: `${prevStep * (100 / STEPS)}%`,
          duration: 0.5,
        },
        {
          width: `${step * (100 / STEPS)}%`,
          duration: 0.5,
          ease: "power4.out",
        }
      );
    });
    return () => ctx.revert();
  }, [step, prevStep]);

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="flex flex-col items-start justify-start w-full h-full gap-2 lg:gap-4">
            <h1 className="text-xl sm:text-3xl lg:text-5xl text-texttitle font-bold">
              What is OnlyBlair?
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl">
              OnlyBlair is a completely anonymous private social platform.{" "}
              <br /> <br /> Since this is the beta test, there is no need to
              login. <br /> <br />
              The platform is similar to Twitter/Reddit except with complete
              anonymity.
            </p>
            <p className="text-sm sm:text-lg lg:text-xl text-danger">
              OnlyBlair is NOT affiliated with Montgomery Blair High School in
              any way. Content on this platform is not verified and does not
              reflect the views of said school.
            </p>
            <p className="text-sm sm:text-lg lg:text-xl text-accent">
              Note: You can change the theme at any time by clicking the
              lightbulb in the top right!
            </p>
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col items-start justify-start w-full h-full">
            <h1 className="text-xl sm:text-3xl lg:text-5xl text-texttitle font-bold">
              Rules
            </h1>
            <div className="text-sm sm:text-lg lg:text-xl list-disc flex flex-col gap-4 mt-4">
              <li>No slurs</li>
              <li>No NSFW content</li>
              <li>No spam</li>
              <li>No images of other people without their consent</li>
              <li>No test answers</li>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-start justify-start w-full h-full">
            <h1 className="text-xl sm:text-3xl lg:text-5xl text-texttitle font-bold">
              How do I use OnlyBlair?
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl mt-8">
              OnlyBlair is very simple to use. <br /> <br /> You can make posts
              or reply to them. <br /> <br /> You can also like/dislike posts
              and replies with heavily disliked posts being hidden.
            </p>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-start justify-start w-full h-full">
            <h1 className="text-xl sm:text-3xl lg:text-5xl text-texttitle font-bold">
              Contact and Credits
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl mt-8">
              Nothing for now
            </p>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col items-start justify-start w-full h-full">
            <h1 className="text-xl sm:text-3xl lg:text-5xl text-texttitle font-bold">
              Thank you for using OnlyBlair!
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl mt-8">
              I hope you enjoy your time on OnlyBlair!
            </p>
          </div>
        );
      default:
        return <h1>There was an error!</h1>;
    }
  };

  const canContinue = () => {
    switch (step) {
      default:
        return true;
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center p-10 bg-background">
      <Head>
        <title>OnlyBlair</title>
      </Head>
      <div className="absolute top-2 right-2">
        <ThemeSwitch />
      </div>
      <div className="w-full h-full bg-foreground rounded-lg flex flex-col items-center justify-between border-border border-1">
        <div className="w-full h-8 rounded-t-lg border-transparent border-b-border border-1">
          <div className="h-full w-0 bg-accent rounded-t-lg" ref={barRef}></div>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center p-8">
          {renderStep()}
        </div>
        <div className="w-full p-4 flex justify-between items-center">
          <button
            onClick={() => {
              if (step > 0) {
                setPrevStep(step);
                setStep(step - 1);
              }
            }}
            onMouseEnter={(e) => {
              gsap.to(e.target, {
                scale: 1.2,
                duration: 0.2,
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.target, {
                scale: 1,
                duration: 0.2,
              });
            }}
            className="bg-button text-textbutton rounded-md mt-10 shadow-md shadow-shadow border-none px-8 py-2 text-lg hover:cursor-pointer"
          >
            Back
          </button>
          <div></div>
          <button
            onClick={() => {
              if (canContinue() && step < STEPS) {
                setPrevStep(step);
                setStep(step + 1);
              }
              if (step === STEPS) {
                Router.push("/posts");
              }
            }}
            onMouseEnter={(e) => {
              gsap.to(e.target, {
                scale: 1.2,
                duration: 0.2,
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.target, {
                scale: 1,
                duration: 0.2,
              });
            }}
            className="bg-button text-textbutton rounded-md mt-10 shadow-md shadow-shadow border-none px-8 py-2 text-lg hover:cursor-pointer"
          >
            {step === STEPS ? "Continue" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
