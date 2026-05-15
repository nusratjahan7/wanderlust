import BookingCancel from "@/Components/BookingCancel";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { FiCalendar, FiHash, FiEye, FiMapPin } from "react-icons/fi";

const MyBookings = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user;

    const res = await fetch(`http://localhost:5000/booking/${user.id}`)
    const bookings = await res.json();


    return (
        <div className="min-h-screen w-11/12 mx-auto py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 font-serif">My Bookings</h1>
                <p className="text-(--text2) mt-1">Manage and view your upcoming travel plans</p>
            </div>
            {bookings.length === 0 ? (
                <div className="min-h-[380px] flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center mb-6">
                        <FiMapPin className="w-10 h-10 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 font-serif mb-2">No bookings yet</h2>
                    <p className="text-gray-500 max-w-sm mb-6 leading-relaxed">
                        You haven't booked any trips yet. Explore destinations and plan your next adventure!
                    </p>
                    <Link href="/destinations">
                        <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-medium transition-colors">
                            <FiEye className="w-4 h-4" />
                            Explore Destinations
                        </button>
                    </Link>
                </div>
            ) : (<div className="flex flex-col gap-4">
                {bookings.map(booking => (
                    <div
                        key={booking._id}
                        className="flex flex-col md:flex-row items-center gap-5 p-4 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        {/* Image */}
                        <Image
                            src={booking.imageUrl}
                            alt={booking.destinationName}
                            height={600} width={600}
                            className="sm:w-70 h-50 object-cover rounded-xl shrink-0"
                        />

                        {/* Info */}
                        <div className="flex-1">
                            {/* Status badge */}
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-full mb-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                                Confirmed
                            </span>

                            <h2 className="text-xl font-bold text-gray-800 truncate">
                                {booking.destinationName}
                            </h2>

                            <div className="flex flex-col gap-1 mt-2">
                                <p className="flex items-center gap-2 text-sm text-gray-500">
                                    <FiCalendar className="w-4 h-4" />
                                    Departure: {booking.formattedDate}
                                </p>
                                <p className="flex items-center gap-2 text-sm text-gray-500">
                                    <FiHash className="w-4 h-4" />
                                    Booking ID: {booking._id.slice(0, 8)}
                                </p>
                                <p className="flex items-center gap-2 text-sm text-gray-500">
                                    <FiMapPin className="w-4 h-4" />
                                    {booking.country}
                                </p>
                            </div>

                            <p className="text-cyan-500 font-bold text-lg mt-2">
                                ${booking.price}
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex md:flex-col gap-2 shrink-0">
                            <BookingCancel bookingId={booking._id} destinationName={booking.destinationName} />
                            <Link href={`/destinations/${booking.destinationId}`}>
                                <button className="flex items-center gap-2 px-6 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-medium transition-colors">
                                    <FiEye className="w-4 h-4" />
                                    View
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            )}
        </div>
    );
};

export default MyBookings;