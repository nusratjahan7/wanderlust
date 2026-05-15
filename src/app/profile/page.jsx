import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { FiMapPin, FiEdit2 } from "react-icons/fi";
import { BsAirplane, BsGlobe, BsCurrencyDollar } from "react-icons/bs";
import { MdOutlineUpcoming } from "react-icons/md";

const Profile = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    const token = await auth.api.getToken({ headers: await headers() });
    const user = session?.user;

    let bookings = [];
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${user?.id}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });
        if (res.ok) {
            bookings = await res.json();
        }
    } catch (err) {
        console.error("Failed to fetch bookings:", err);
    }

    const totalBookings = bookings.length;

    const totalSpent = bookings.reduce((sum, booking) => {
        return sum + Number(booking.price ?? 0);
    }, 0);

    const countriesVisited = new Set(
        bookings.map((b) => b.country).filter(Boolean)
    ).size;

    const upcomingTrips = bookings.filter(
        (b) => new Date(b.formattedDate) > new Date()
    ).length;

    const stats = [
        {
            label: "Total Bookings",
            value: totalBookings.toString(),
            icon: <BsAirplane className="w-5 h-5 text-cyan-500" />,
            bg: "bg-cyan-50",
        },
        {
            label: "Countries Visited",
            value: countriesVisited.toString(),
            icon: <BsGlobe className="w-5 h-5 text-green-500" />,
            bg: "bg-green-50",
        },
        {
            label: "Upcoming Trips",
            value: upcomingTrips.toString(),
            icon: <MdOutlineUpcoming className="w-5 h-5 text-orange-400" />,
            bg: "bg-orange-50",
        },
        {
            label: "Total Spent",
            value: `$${totalSpent.toLocaleString()}`,
            icon: <BsCurrencyDollar className="w-5 h-5 text-pink-400" />,
            bg: "bg-pink-50",
        },
    ];

    return (
        <div className="min-h-screen w-11/12 mx-auto py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 font-serif">My Profile</h1>
                <p className="text-gray-400 mt-1 text-sm">
                    Manage your account settings and travel preferences
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Left — User Card */}
                <div className="w-full md:w-56 border border-gray-200 rounded-2xl p-6 bg-white flex flex-col items-center text-center shrink-0">
                    <div className="relative mb-3">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow">
                            {user?.image ? (
                                <Image
                                    src={user.image}
                                    alt={user?.name}
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-cyan-500 flex items-center justify-center">
                                    <span className="text-white text-2xl font-bold">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}
                        </div>
                        <span className="absolute bottom-0 right-0 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                            <FiEdit2 className="w-3 h-3 text-white" />
                        </span>
                    </div>

                    <h2 className="text-base font-bold text-gray-800">{user?.name}</h2>
                    <p className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                        <FiMapPin className="w-3 h-3" />
                        San Francisco, CA
                    </p>

                    <div className="w-full border-t border-gray-100 my-4" />

                    <div className="w-full flex flex-col gap-2 text-xs">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Member since</span>
                            <span className="font-semibold text-gray-700">
                                {user?.createdAt
                                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                                        month: "short",
                                        year: "numeric",
                                    })
                                    : "—"}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Email</span>
                            <span className="font-semibold text-gray-700 truncate max-w-[100px]" title={user?.email}>
                                {user?.email?.split("@")[0]}
                            </span>
                        </div>
                    </div>

                    <button className="mt-5 w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-medium py-2 rounded-xl transition-colors">
                        <FiEdit2 className="w-4 h-4" />
                        Edit Profile
                    </button>
                </div>

                {/* Right — Stats */}
                <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-800 mb-4">Travel Statistics</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                        {stats.map((stat, i) => (
                            <div
                                key={i}
                                className="border border-gray-200 rounded-2xl p-5 bg-white flex flex-col gap-3"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-400">{stat.label}</span>
                                    <span className={`w-9 h-9 rounded-full flex items-center justify-center ${stat.bg}`}>
                                        {stat.icon}
                                    </span>
                                </div>
                                <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;