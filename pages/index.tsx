//Home page

import gsap from "gsap";

import Link from "next/link";

import Head from "next/head";

import ThemeSwitch from "../components/ThemeSwitch";
import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "../utils/globalFunctions";

export default function Home() {
  const h1Ref = useRef(null);
  const pRef = useRef(null);
  const buttonRef = useRef(null);
  const lineRef = useRef(null);
  const themeSwitchRef = useRef(null);
  const timeline = useRef(null);
  const pageRef = useRef(null);

  useIsomorphicLayoutEffect(() => {
    pageRef.current.style.opacity = 1;

    const ctx = gsap.context(() => {
      timeline.current = gsap
        .timeline()
        .from(
          lineRef.current,
          { scaleX: 0, duration: 1, ease: "power4.out" },
          0.5
        )
        .from(
          h1Ref.current,
          {
            duration: 1,
            opacity: 0,
            y: 20,
            ease: "power4.out",
          },
          ">-0.6"
        )
        .from(
          pRef.current,
          {
            duration: 1,
            opacity: 0,
            y: -20,
            ease: "power4.out",
          },
          "<0.2"
        )
        .from(
          buttonRef.current,
          {
            duration: 1,
            opacity: 0,
            y: 20,
            ease: "power4.out",
          },
          "<0.2"
        )
        .from(
          themeSwitchRef.current,
          {
            duration: 1,
            opacity: 0,
            y: 20,
            ease: "power4.out",
          },
          "<0.2"
        );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      className="w-screen h-screen flex flex-col justify-center items-center opacity-0"
      ref={pageRef}
    >
      <Head>
        <title>OnlyBlair</title>
      </Head>
      <div className="absolute top-2 right-2" ref={themeSwitchRef}>
        <ThemeSwitch />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-9xl text-text font-bold text-center" ref={h1Ref}>
          OnlyBlair
        </h1>
        <div
          className="w-[120%] h-2 bg-accent rounded-full"
          ref={lineRef}
        ></div>
        <p className="text-center text-text text-2xl mt-4" ref={pRef}>
          Private, Secure, Completely Anonymous Social Platform
        </p>
      </div>
      <Link href="/auth">
        <a
          className="bg-button text-textbutton rounded-md mt-10 shadow-shadow shadow-md border-none px-8 py-2 text-lg hover:cursor-pointer"
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
          ref={buttonRef}
        >
          Get Started
        </a>
      </Link>
    </div>
  );
}
