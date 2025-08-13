"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function CityBackground() {
    const container = useRef<HTMLDivElement | null>(null);

    useGSAP(
        () => {
        // Animate the front city image
        gsap.to(".city-front", {
            y: -100, // Moves up more
            scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5, // Smoother scrubbing
            },
        });

        // Animate the back city image
        gsap.to(".city-back", {
            y: -50, // Moves up less to create depth
            scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
            },
        });
        },
        { scope: container }
    );

    return (
        <div ref={container} className="relative w-full h-[100vh] overflow-hidden">
        {/* Back city */}
        <Image
            src="/images/city-back.png"
            alt="City Back"
            fill
            className="city-back object-cover"
            priority
        />

        {/* Front city */}
        <Image
            src="/images/city-front.png"
            alt="City Front"
            fill
            className="city-front object-cover"
            priority
        />
        </div>
    );
    }
