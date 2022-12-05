import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import Router from "next/router";

import { MdOutlineFileUpload, MdClose } from "react-icons/md";

const TITLELIMIT = 50;
const CONTENTLIMIT = 500;

export default function NewPostModal({ setShowModal }) {
  const modalRef = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const posting = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(modalRef.current, {
        duration: 0.2,
        y: -300,
        opacity: 0,
      });
    });

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      ctx.revert();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowModal]);

  const newPost = async () => {
    if (posting.current) return;
    if (title.length > TITLELIMIT) {
      alert(`Title must be less than ${TITLELIMIT} characters.`);
      return;
    }

    if (content.length > CONTENTLIMIT) {
      alert(`Content must be less than ${CONTENTLIMIT} characters.`);
      return;
    }

    posting.current = true;

    const req = await fetch("/backend/createpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    let [status, data] = await Promise.all([req.status, req.json()]);

    if (status === 200) {
      Router.push(`/posts/${data.id}`);
    } else {
      alert("An error occurred.");

      posting.current = false;
    }
  };

  return (
    <div className="w-screen h-screen absolute top-0 left-0 bg-opacity-50 bg-black flex items-center justify-center">
      <div
        className="w-3/4 h-3/4 p-4 bg-foreground flex flex-col gap-4 rounded-lg shadow-md border-border border-1"
        ref={modalRef}
      >
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl text-texttitle">New Post</h1>
          <button
            className="p-2 rounded-lg bg-danger text-white"
            onClick={() => setShowModal(false)}
          >
            <MdClose size={20} />
          </button>
        </div>

        <input
          type="text"
          placeholder="Title Here"
          className="w-full p-4 rounded-lg border-1 border-border bg-foreground placeholder-placeholder"
          onChange={(e) => setTitle(e.target.value)}
        />
        <p className="text-sm text-accent ">
          {title.length}/{TITLELIMIT}
        </p>
        <textarea
          placeholder="Content"
          className="w-full h-full p-4 rounded-lg border-1 border-border bg-foreground placeholder-placeholder whitespace-pre-wrap"
          onChange={(e) => setContent(e.target.value)}
        />
        <p className="text-sm text-accent ">
          {content.length}/{CONTENTLIMIT}
        </p>
        <button
          className="w-full p-4 bg-button rounded-lg text-textbutton font-bold flex items-center justify-center shadow-md gap-2"
          onClick={newPost}
        >
          Post
          <MdOutlineFileUpload size={30} />
        </button>
      </div>
    </div>
  );
}
