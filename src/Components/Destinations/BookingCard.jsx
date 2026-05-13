
import { FiArrowRight, FiCalendar, FiCheck } from 'react-icons/fi';

const BookingCard = ({ formattedDate, numericPrice, destination }) => {
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
                <button className="w-full bg-cyan-500 hover:bg-cyan-600 transition-colors text-white text-sm font-medium py-2.5 rounded-lg flex items-center justify-center gap-2">
                    Book Now
                    <FiArrowRight className="w-4 h-4" />
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