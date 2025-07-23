import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, useAuth, UserButton  } from '@clerk/clerk-react';
import { useEffect } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); ;

  // const {getToken} = useAuth()

  // useEffect(()=>{
  //   getToken().then(token => console.log(token));
  // }, )

  return (
    <div className="w-full px-4 py-4 flex items-center justify-between bg-white relative">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="w-8 h-8" />
        <span>Bloggify</span>
      </Link>

      {/* Mobile menu toggle button */}
      <div className="md:hidden text-3xl cursor-pointer" onClick={() => setMenuOpen(prev => !prev)}>
        {menuOpen ? '✖' : '☰'}
      </div>

      {/* Desktop nav */}
      <div className="hidden md:flex gap-6 text-gray-800 font-medium items-center">
        <Link to="/">Home</Link>
        <Link to="/">Trending</Link>
        <Link to="/">Most Popular</Link>
        <Link to="/about">About</Link>

        <SignedOut>
          <Link to="/login">
            <button className="bg-blue-700 hover:bg-blue-800 text-white py-1 px-4 rounded-full transition">
              Login 👋
            </button>
          </Link>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full h-[calc(100vh-4rem)] bg-gradient-to-b from-[#e5eaff] to-[#cfd8ff] flex flex-col items-center justify-center space-y-6 z-50 transition-all duration-300">
          <Link to="/" className="text-lg text-gray-800 font-medium">Home</Link>
          <Link to="/" className="text-lg text-gray-800 font-medium">Trending</Link>
          <Link to="/" className="text-lg text-gray-800 font-medium">Most Popular</Link>
          <Link to="/about" className="text-lg text-gray-800 font-medium">About</Link>

          <SignedOut>
            <Link to="/login">
              <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
                Login
              </button>
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      )}
    </div>
  );
};

export default Navbar;
