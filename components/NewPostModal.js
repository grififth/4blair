import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function NewPostModal({ setShowModal }) {
    const modalRef = useRef(null);

    useEffect(() => {
        gsap.from(modalRef.current, {
            duration: 0.5,
            y: -300,
            opacity: 0,
        });
    }, []);

    return (
        <div className="w-screen h-screen absolute top-0 left-0 bg-opacity-50 bg-black flex items-center justify-center">
            <div
                className="w-1/2 h-1/2 bg-lightforeground dark:bg-darkforeground"
                ref={modalRef}
            ></div>
        </div>
    );
}
