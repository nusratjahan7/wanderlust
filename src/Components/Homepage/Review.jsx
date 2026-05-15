"use client";
import { useState } from "react";
import Image from "next/image";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const reviews = [
    {
        quote: "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
        name: "Michael Chen",
        location: "Singapore",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        quote: "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
        name: "Sarah Johnson",
        location: "New York, USA",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        quote: "Japan Cherry Blossom Tour Was A Dream Come True. Everything Was Seamlessly Organized And The Local Experiences Were Truly Authentic.",
        name: "Emma Williams",
        location: "London, UK",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
        quote: "The Safari In Kenya Was Life-Changing. Saw The Big Five And The Guides Were Extremely Professional And Passionate About Wildlife.",
        name: "James Okafor",
        location: "Lagos, Nigeria",
        image: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    {
        quote: "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
        name: "Sarah Johnson",
        location: "New York, USA",
        image: "https://randomuser.me/api/portraits/women/48.jpg",
    }
];

const Review = () => {
    const [index, setIndex] = useState(0);

    const prev = () => setIndex((i) => Math.max(i - 1, 0));
    const next = () => setIndex((i) => Math.min(i + 1, reviews.length - 1));

    // mobile: 1 card, desktop: 2 cards
    const visible = [
        reviews[index],
        reviews[index + 1],
    ].filter(Boolean);

    return (
        <section className="py-16 px-6 md:px-16">
            {/* Header */}
            <div className="flex items-start justify-between mb-10">
                <div>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
                        What Travelers Say
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Real experiences from our happy travelers
                    </p>
                </div>
                <div className="flex gap-2 mt-1">
                    <button
                        onClick={prev}
                        disabled={index === 0}
                        className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:border-cyan-500 hover:text-cyan-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <FiArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={next}
                        disabled={index >= reviews.length - 1}
                        className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:border-cyan-500 hover:text-cyan-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <FiArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Review Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="flex gap-5 border border-gray-200 rounded-2xl p-6 bg-white">
                    <div className="flex-1 flex flex-col justify-between">
                        <p className="text-gray-700 text-sm leading-relaxed mb-6">
                            "{reviews[index].quote}"
                        </p>
                        <div>
                            <p className="text-cyan-500 text-sm font-medium">— {reviews[index].name}</p>
                            <p className="text-gray-400 text-xs mt-0.5">{reviews[index].location}</p>
                        </div>
                    </div>
                    <div className="shrink-0 w-28 h-36 rounded-xl overflow-hidden">
                        <Image src={reviews[index].image} alt={reviews[index].name} width={112} height={144} className="w-full h-full object-cover" />
                    </div>
                </div>


                {reviews[index + 1] && (
                    <div className="hidden md:flex gap-5 border border-gray-200 rounded-2xl p-6 bg-white">
                        <div className="flex-1 flex flex-col justify-between">
                            <p className="text-gray-700 text-sm leading-relaxed mb-6">
                                "{reviews[index + 1].quote}"
                            </p>
                            <div>
                                <p className="text-cyan-500 text-sm font-medium">— {reviews[index + 1].name}</p>
                                <p className="text-gray-400 text-xs mt-0.5">{reviews[index + 1].location}</p>
                            </div>
                        </div>
                        <div className="shrink-0 w-28 h-36 rounded-xl overflow-hidden">
                            <Image src={reviews[index + 1].image} alt={reviews[index + 1].name} width={112} height={144} className="w-full h-full object-cover" />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Review;