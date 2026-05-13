'use client'
import { authClient } from '@/lib/auth-client';
import { useEffect, useState } from 'react';
import { FiArrowRight, FiCalendar, FiCheck } from 'react-icons/fi';
import { toast } from 'sonner';

const BookingCard = ({ formattedDate, numericPrice, destination }) => {
    const { _id, destinationName, price, imageUrl, country } = destination;
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [booked, setBooked] = useState(false);

    useEffect(() => {
        if (!user?.id) return;

        fetch(`http://localhost:5000/booking/${user.id}`)
            .then(res => res.json())
            .then(data => {
                const alreadyBooked = data.some(b => b.destinationId === _id);
                if (alreadyBooked) setBooked(true);
            })
    }, [user?.id, _id]);

    const handleBooking = async () => {
        const bookingData = {
            userId: user?.id,
            userImage: user?.image,
            userName: user?.name,
            userEmail: user?.email,
            destinationId: _id,
            destinationName,
            price,
            imageUrl,
            formattedDate,
            country
        }
        const res = await fetch('http://localhost:5000/booking', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        })
        const data = await res.json();

        if (data.insertedId) {
            setBooked(true);
            toast.success('Booked Successfully');
        }

    }


    return (
        <div className="w-full md:w-72 shrink-0">
            <div className="border border-gray-200 rounded-xl p-5 shadow-sm sticky top-6">
                <p className="text-xs text-gray-500 mb-1">Starting from</p>
                <p className="text-3xl font-bold text-gray-900">
                    ${numericPrice.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mb-5">per person</p>

                {/* Departure Date */}
                <div className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 mb-4 flex items-center gap-2">
                    <FiCalendar className="w-4 h-4 text-gray-400" />
                    {formattedDate}
                </div>

                {/* Book Now Button */}
                <button
                    onClick={handleBooking}
                    disabled={booked}
                    className={`w-full transition-colors text-white text-sm font-medium py-2.5 rounded-lg flex items-center justify-center gap-2
                        ${booked
                            ? "bg-gray-400! cursor-not-allowed"
                            : "bg-cyan-500 hover:bg-cyan-600 cursor-pointer"
                        }`}
                >
                    {booked ? "Booked" : "Book Now"}
                    {!booked && <FiArrowRight className="w-4 h-4" />}
                </button>

                {/* Trust Badges */}
                <div className="mt-4 space-y-2">
                    {[
                        'Free cancellation up to 7 days',
                        'Travel insurance included',
                        '24/7 customer support',
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-2 text-xs text-gray-600"
                        >
                            <FiCheck className="w-4 h-4 text-green-500 shrink-0" />
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookingCard;