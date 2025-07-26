import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, useAuth, UserButton } from '@clerk/clerk-react';
import { FiMenu, FiX } from 'react-icons/fi'; // icons for menu

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-10 h-10 drop-shadow-md" />
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
            Bloggify
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 items-center font-medium text-gray-800 text-lg">
          <Link to="/" className="hover:text-blue-700 transition">Home</Link>
          <Link to="/trending" className="hover:text-blue-700 transition">Trending</Link>
          <Link to="/save" className="hover:text-blue-700 transition">Saved</Link>
          <Link to="/about" className="hover:text-blue-700 transition">About</Link>

          <SignedOut>
            <Link to="/login">
              <button className="bg-gradient-to-r from-blue-700 to-indigo-700 hover:brightness-110 text-white py-1.5 px-5 rounded-full transition-all duration-200">
                Login 👋
              </button>
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </nav>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-3xl text-gray-700 focus:outline-none"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 pt-4 bg-white shadow-md rounded-b-2xl">
          <div className="flex flex-col gap-4 text-lg font-medium text-gray-800">
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-700">Home</Link>
            <Link to="/trending" onClick={() => setMenuOpen(false)} className="hover:text-blue-700">Trending</Link>
            <Link to="/save" onClick={() => setMenuOpen(false)} className="hover:text-blue-700">Saved</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-blue-700">About</Link>

            <SignedOut>
              <Link to="/login">
                <button className="mt-4 py-2 px-6 bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-full shadow-md">
                  Login
                </button>
              </Link>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

