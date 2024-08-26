"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const Testimonials = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}: {
    items: {
        quote: string;
        name: string;
        title: string;
        href: string,
    }[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);

    useEffect(() => {
        addAnimation();
    }, []);
    const [start, setStart] = useState(false);
    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }
    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "forwards"
                );
            } else {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "reverse"
                );
            }
        }
    };
    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s");
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "40s");
            } else {
                containerRef.current.style.setProperty("--animation-duration", "80s");
            }
        }
    };
    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
                    start && "animate-scroll ",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >
                {items.map((item, idx) => (
                    <li
                        className="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-200 dark:border-slate-800 px-8 py-6 md:w-[450px]"
                        style={{
                            background:
                                "bg-gradient-to-r from-slate-700 to-gray-900",
                        }}
                        key={item.name}
                    >
                        <div
                            aria-hidden="true"
                            className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                        ></div>
                        <div className="relative flex flex-col justify-center space-y-4">
                            <div className="grid gap-4 rounded-lg p-6">
                                <div className="flex items-start gap-4">
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage src={item.href} alt="User" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-muted-foreground dark:text-[#CCFFFF]">
                                            {item.quote}
                                        </p>
                                        <div className="mt-2 font-bold">{item.name}</div>
                                        <div className="text-sm text-muted-foreground dark:text-[#CCFFFF]">{item.title}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};