import Link from 'next/link';
import { FiArrowLeft, FiMapPin, FiClock, FiCheck } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import Image from 'next/image';
import EditModal from '@/Components/EditModal';
import DeleteAlert from '@/Components/DeleteAlert';
import BookingCard from '@/Components/Destinations/BookingCard';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const DestinationDetailsPage = async ({ params }) => {
    const { id } = await params;
    const token = await auth.api.getToken({
        headers: await headers()
    });
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${id}`, {
        headers: {
            authorization: `Bearer ${token?.token}`
        },
        cache: 'no-store'
    }).catch(err => {
        console.error("Fetch error:", err.message, err.cause);
        throw err;
    });
    const destination = await res.json();

    const {
        destinationName,
        country,
        price,
        duration,
        imageUrl,
        departureDate,
        description,
        category,
        rating = 4.5,
        reviews = 234,
    } = destination;

    const highlights = [
        'Luxury beachfront accommodation',
        'Traditional Balinese spa treatment',
        'Sunrise trek to Mount Batur',
        'Visit Uluwatu Temple at sunset',
        'Private beach dinner experience',
    ];

    const image = Array.isArray(imageUrl) ? imageUrl[0] : imageUrl;
    const numericPrice = Number(price);

    const formattedDate = departureDate
        ? new Date(departureDate).toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        })
        : '';

    return (
        <div className="min-h-screen w-11/12 mx-auto">
            {/* Top Navigation */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
                <Link
                    href="/destinations"
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <FiArrowLeft className="w-4 h-4" />
                    Back to Destinations
                </Link>

                <div className="flex items-center gap-2">

                    <EditModal destination={destination} />


                    <DeleteAlert destination={destination} />

                </div>
            </div>

            {/* Hero Image */}
            <div className="w-full h-72 md:h-96 overflow-hidden">
                <Image
                    height={900} width={900}
                    src={image}
                    alt={destinationName}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row  gap-20">
                    {/* Left Column */}
                    <div className="flex-1">
                        {/* Country */}
                        <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                            <FiMapPin className="w-4 h-4" />
                            {country}
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {destinationName}
                        </h1>

                        {/* Rating & Duration */}
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                            <div className="flex items-center gap-1">
                                <FaStar className="w-4 h-4 text-yellow-400" />
                                <span className="font-medium">{rating}</span>
                                <span className="text-gray-400">({reviews} reviews)</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <FiClock className="w-4 h-4" />
                                {duration}
                            </div>
                        </div>

                        {/* Overview */}
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                Overview
                            </h2>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {description}
                            </p>
                        </div>

                        {/* Highlights */}
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 mb-3">
                                Highlights
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {highlights.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-2 text-sm text-gray-600"
                                    >
                                        <FiCheck className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column — Booking Card */}
                    <BookingCard formattedDate={formattedDate} numericPrice={numericPrice} destination={destination} />
                </div>
            </div>
        </div>
    );
};

export default DestinationDetailsPage;