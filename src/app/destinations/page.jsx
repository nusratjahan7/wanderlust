import DestinationCard from "@/Components/Homepage/DestinationCard";


const Destination = async () => {
    const res = await fetch('http://localhost:5000/destination');
    const destinations = await res.json();

    return (
        <div className="w-11/12 mx-auto my-9 space-y-4">
            {/* Header */}
            <div className="space-y-1">
                <h1 className="font-serif text-3xl text-gray-900">Explore All Destinations</h1>
                <p className="text-(--text2)">Find your perfect travel experience from our curated collection</p>
            </div>

            {/* Result count */}
            <p className="text-xs text-gray-500 mb-5">
                Showing {destinations.length} destination{destinations.length !== 1 ? "s" : ""}
            </p>

            <div className="grid grid-cols-3 gap-3">
                {
                    destinations.map(destination =>
                        <DestinationCard key={destination._id} destination={destination} />)
                }
            </div>
        </div>
    );
};

export default Destination;