import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Search from './Search';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50 rounded-b-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap md:flex-nowrap items-center justify-between gap-y-4 md:gap-y-0 rounded-full bg-white">
        
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-12 h-12 object-cover drop-shadow-md rounded-full"
          />
          <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
            Bloggify
          </span>
        </Link>

        {/* Center: Search (Hidden on mobile) */}
        <div className="hidden md:block flex-1 mx-4 lg:mx-10 min-w-0">
          <Search />
        </div>

        {/* Right: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 font-medium text-gray-700 text-base flex-shrink-0">
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

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-3xl text-gray-700 focus:outline-none"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Slide-In Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t px-6 pt-4 pb-6 shadow-xl rounded-b-2xl"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
