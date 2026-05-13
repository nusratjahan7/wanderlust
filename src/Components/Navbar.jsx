"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";


const navLinks = [
  { label: "Home", path: "/" },
  { label: "Destinations", path: "/destinations" },
  { label: "My Bookings", path: "/my-bookings" },
  { label: "Admin", path: "/admin" },
  { label: "Add Destination", path: "/add-destinations" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* ── Left: Nav Links (desktop) ── */}
        <ul className="hidden lg:flex items-center gap-1 list-none m-0 p-0">
          {navLinks.map(({ label, path }) => {
            const isActive = pathname === path;
            return (
              <li key={path}>
                <Link
                  href={path}
                  className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors duration-150 whitespace-nowrap
                    ${isActive
                      ? "text-[#1aa0c8] underline underline-offset-4"
                      : "text-gray-700 hover:bg-blue-50 hover:text-[#1aa0c8]"
                    }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── Center: Brand ── */}
        <Link
          href="/"
          className="text-2xl font-bold text-[#1aa0c8] tracking-tight shrink-0 font-serif"
        >
          Wanderlust
        </Link>

        {/* ── Right: Auth Links (desktop) ── */}
        {isPending ? (
          <span className="loading loading-dots loading-sm hidden lg:block text-(--brand)"></span>
        ) : user ? (
          // user IS logged in → show Logout
          <div className="hidden lg:flex items-center gap-4">
            <div></div>
            <div></div>
            <Link href="/profile" className="flex items-center gap-1.5 text-sm font-medium text-gray-700 px-3 py-1.5 rounded-md hover:bg-blue-50 hover:text-[#1aa0c8] transition-colors duration-150 whitespace-nowrap">
              Profile
              <Avatar>
                <Avatar.Image alt={user.name} src={user?.image} />
                <Avatar.Fallback className="bg-white/40 text-[#1aa0c8] font-bold">{user.name.charAt(0).toUpperCase()}</Avatar.Fallback>
              </Avatar>
            </Link>

            <button
              onClick={async () => {
                await authClient.signOut();
                router.push('/');
              }}
              className="text-sm font-medium text-white bg-[#1aa0c8] px-4 py-1.5 rounded-lg hover:bg-[#1590b5] transition-all duration-150 hover:-translate-y-px"
            >
              Logout
            </button>
          </div>
        ) : (
          // user is NOT logged in → show Login/Signup
          <div className="hidden lg:flex items-center gap-1">
            <Link href="/profile" className="flex items-center gap-1.5 text-sm font-medium text-gray-700 px-3 py-1.5 rounded-md hover:bg-blue-50 hover:text-[#1aa0c8] transition-colors duration-150 whitespace-nowrap">

              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>

              Profile
            </Link>
            <Link href="/login" className="text-sm font-medium text-gray-700 px-3 py-1.5 rounded-md hover:bg-blue-50 hover:text-[#1aa0c8] transition-colors duration-150">

              Login
            </Link>
            <Link href="/signup" className="text-sm font-medium text-white bg-[#1aa0c8] px-4 py-1.5 rounded-lg hover:bg-[#1590b5] transition-all duration-150 hover:-translate-y-px">
              Sign Up
            </Link>
          </div>
        )}

        {/* ── Hamburger (mobile) ── */}
        <button
          className="lg:hidden flex flex-col justify-center gap-1.25 p-2 rounded-md hover:bg-blue-50 transition-colors duration-150"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-5 h-0.5 bg-gray-700 rounded transition-all duration-300 origin-center
              ${menuOpen ? "translate-y-1.75 rotate-45" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-700 rounded transition-all duration-300
              ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-gray-700 rounded transition-all duration-300 origin-center
              ${menuOpen ? "-translate-y-1.75 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* ── Mobile Dropdown ── */}
      <div
        className={`lg:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out
          ${menuOpen ? "max-h-100 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="flex flex-col gap-1 px-4 py-3">
          {navLinks.map(({ label, path }) => {
            const isActive = pathname === path;
            return (
              <Link
                key={path}
                href={path}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-medium px-3 py-2.5 rounded-lg transition-colors duration-150
                  ${isActive
                    ? "text-[#1aa0c8] bg-blue-50"
                    : "text-gray-700 hover:bg-blue-50 hover:text-[#1aa0c8]"
                  }`}
              >
                {label}
              </Link>
            );
          })}

          <div className="h-px bg-gray-100 my-1" />

          {/* ── Auth Links (mobile) ── */}


          {isPending ? (
            <span className="loading loading-dots loading-sm text-(--brand)"></span>
          ) : user ? (
            // user IS logged in → show Logout
            <div className="flex flex-col gap-4">
              <Link href="/profile" className="flex items-center gap-1.5 text-sm font-medium text-gray-700 px-3 py-1.5 rounded-md hover:bg-blue-50 hover:text-[#1aa0c8] transition-colors duration-150 whitespace-nowrap">
                <Avatar>
                  <Avatar.Image alt={user.name} src={user?.image} />
                  <Avatar.Fallback className="bg-white/40 text-[#1aa0c8] font-bold">{user.name.charAt(0).toUpperCase()}</Avatar.Fallback>
                </Avatar>
                Profile
              </Link>

              <button
                onClick={async () => {
                  await authClient.signOut();
                  router.push('/');
                }}
                className="text-sm font-medium text-white bg-[#1aa0c8] px-4 py-2.5 rounded-lg hover:bg-[#1590b5] transition-all duration-150 hover:-translate-y-px"
              >
                Logout
              </button>
            </div>
          ) : (
            // user is NOT logged in → show Login/Signup
            <div className="flex flex-col gap-1.5">
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 px-3 py-2.5 rounded-lg hover:bg-blue-50 hover:text-[#1aa0c8] transition-colors duration-150"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Profile
              </Link>

              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-gray-700 px-3 py-2.5 rounded-lg hover:bg-blue-50 hover:text-[#1aa0c8] transition-colors duration-150"
              >
                Login
              </Link>

              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-white bg-[#1aa0c8] px-4 py-2.5 rounded-lg text-center hover:bg-[#1590b5] transition-colors duration-150 mt-1"
              >
                Sign Up
              </Link>
            </div>
          )}





        </div>
      </div>
    </nav>
  );
};

export default Navbar;
