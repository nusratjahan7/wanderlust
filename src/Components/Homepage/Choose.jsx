
import { FiShield, FiMap, FiHeadphones } from 'react-icons/fi';

const features = [
    {
        icon: <FiShield className="w-8 h-8 text-cyan-500" />,
        title: "Safe & Secure",
        description: "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
    },
    {
        icon: <FiMap className="w-8 h-8 text-cyan-500" />,
        title: "Expert Guides",
        description: "Local experts who bring destinations to life with authentic cultural insights.",
    },
    {
        icon: <FiHeadphones className="w-8 h-8 text-cyan-500" />,
        title: "24/7 Support",
        description: "Round-the-clock customer service to assist you wherever your journey takes you.",
    },
];

const Choose = () => {
    return (
        <section className="py-16 px-6 md:px-16 bg-[#EAF6F6]">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-3">
                    Why Choose Wanderlust
                </h2>
                <p className="text-gray-400 text-sm">
                    Your trusted partner for exceptional travel experiences
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl p-8 flex flex-col gap-4"
                    >
                        <div>{feature.icon}</div>
                        <h3 className="text-base font-semibold text-gray-800">
                            {feature.title}
                        </h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Choose;