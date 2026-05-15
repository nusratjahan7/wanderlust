"use client";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useState } from "react";

const FeaturedCarouselNav = ({ total }) => {

    const scroll = (dir) => {
        const carousel = document.getElementById("featured-carousel");
        const cardWidth = 300; // w-72 = 288px + gap
        carousel.scrollBy({ left: dir * cardWidth, behavior: "smooth" });

    };

    return (
        <div className="flex items-center justify-between mt-5">
            <span className="text-sm text-gray-400 font-medium">
            </span>
            <div className="flex gap-2">
                <button
                    onClick={() => scroll(-1)}
                    className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:border-cyan-500 hover:text-cyan-500 transition-colors"
                >
                    <FiArrowLeft className="w-4 h-4" />
                </button>
                <button
                    onClick={() => scroll(1)}
                    className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:border-cyan-500 hover:text-cyan-500 transition-colors"
                >
                    <FiArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default FeaturedCarouselNav;