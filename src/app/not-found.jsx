import Link from 'next/link';


const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">

            {/* bg decorative circles */}
            <div className="absolute w-96 h-96 rounded-full -top-20 -right-24 opacity-[0.07]" style={{ background: "#1aa0c8" }} />
            <div className="absolute w-64 h-64 rounded-full -bottom-16 -left-16 opacity-[0.07]" style={{ background: "#1aa0c8" }} />

            {/* ghost 404 */}
            <span className="absolute text-[140px] font-extrabold tracking-tighter select-none pointer-events-none opacity-[0.08]" style={{ color: "#1aa0c8" }}>
                404
            </span>

            {/* icon */}
            <div className="w-18 h-18 rounded-full border-2 flex items-center justify-center mb-6 z-10" style={{ borderColor: "#1aa0c8" }}>
                <svg className="w-7 h-7" style={{ color: "#1aa0c8" }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4m6 14h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4m-6 0h6M9 4v16m6-16v16" />
                </svg>
            </div>

            <h1 className="text-3xl font-bold mb-2 z-10">Page not found</h1>
            <p className="text-sm text-center max-w-xs mb-8 z-10 leading-relaxed" style={{ color: "#6C696D" }}>
                The page you're looking for doesn't exist or has been moved to another location.
            </p>

            <div className="flex items-center justify-between gap-3 z-10">
                <Link href="/" className="px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-all hover:-translate-y-px" style={{ background: "#1aa0c8" }}>
                    ← Go home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;