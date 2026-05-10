import React from "react";
import Image from "next/image";
import Link from "next/link";

// ── icons (inline SVG to avoid extra deps) ──────────────────────────────────
const StarIcon = () => (
  <svg className="w-3 h-3 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.95 2.878c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const ChevronIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const DestinationCard = ({ destination }) => {
  const {
    _id,
    destinationName,
    country,
    category,
    price,
    duration,
    imageUrl,
    rating = 4.5,
  } = destination;


  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 group">

      {/* Image */}
      <div className="relative w-full h-44 overflow-hidden bg-gray-100">
        {imageUrl ? (
          <Image
            height={600} width={600}
            src={imageUrl}
            alt={destinationName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-xs">
            No Image
          </div>
        )}
        {/* Rating badge */}
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2 py-0.5 rounded flex items-center gap-1">
          {rating} <StarIcon />
        </div>
      </div>

      {/* Body */}
      <div className="p-3">
        {/* Country */}
        <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
          <LocationIcon />
          <span>{country}</span>
        </div>

        {/* Name + Price */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-sm font-semibold text-gray-900 leading-tight">
            {destinationName}
          </h3>
          <div className="text-right flex-shrink-0">
            <span className="text-sm font-bold text-gray-900">${price}</span>
            <span className="text-[10px] text-gray-400">/Person</span>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
          <CalendarIcon />
          <span>{duration}</span>
        </div>

        {/* Book Now */}
        <Link
          href={`/destinations/${_id}`}
          className="flex items-center gap-1 text-xs font-semibold text-cyan-500 hover:text-cyan-600 transition-colors"
        >
          BOOK NOW <ArrowIcon />
        </Link>
      </div>
    </div>
  );
};

export default DestinationCard;