import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, useAuth, UserButton } from '@clerk/clerk-react';
import { FiMenu, FiX } from 'react-icons/fi';
import Search from './Search';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-10 h-10 object-cover drop-shadow-md"
            />
            <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              Bloggify
            </span>
          </Link>
        </div>

        {/* Center: Search (hidden on small screens) */}
        <div className="hidden md:block flex-1 mx-4 lg:mx-10">
          <Search />
        </div>

        {/* Right: Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 font-medium text-gray-700 text-base">
          <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
          <Link to="/write" className="hover:text-indigo-600 transition">Write</Link>
          <Link to="/saved" className="hover:text-indigo-600 transition">Saved</Link>
          <Link to="/about" className="hover:text-indigo-600 transition">About</Link>

          <SignedOut>
            <Link to="/login">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:brightness-110 text-white py-1.5 px-5 rounded-full transition-all duration-200 shadow-md">
                Login 👋
              </button>
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-3xl text-gray-700 focus:outline-none"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-6 pt-4 pb-6 shadow-lg rounded-b-2xl transition-all duration-300 ease-in-out">
          <Search />
          <div className="mt-6 flex flex-col gap-4 text-base font-medium text-gray-700">
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600 transition">Home</Link>
            <Link to="/write" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600 transition">Write</Link>
            <Link to="/saved" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600 transition">Saved</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600 transition">About</Link>

            <SignedOut>
              <Link to="/login">
                <button className="mt-4 py-2 px-6 w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full shadow-md hover:brightness-110 transition">
                  Login
                </button>
              </Link>
            </SignedOut>

            <SignedIn>
              <div className="mt-4">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;



