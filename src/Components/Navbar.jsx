import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useClerk, SignedOut, SignedIn, UserButton } from "@clerk/clerk-react";
import { User, Key, Menu, X } from "lucide-react";
import { navbarStyles } from "../assets/dummyStyles";
import logo from "../assets/logo.png";

const STORAGE_KEY = "doctorToken_v1";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDoctorLoggedIn, setIsDoctorLoggedIn] = useState(() => {
    try {
      return Boolean(localStorage.getItem(STORAGE_KEY));
    } catch {
      return false;
    }
  });

  const location = useLocation();
  const navRef = useRef(null);
  const clerk = useClerk();
  const navigate = useNavigate();

  // Hide and Show Navbar on Scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Sync the doctor login State
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        setIsDoctorLoggedIn(Boolean(e.newValue));
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // close the toggle menu for mobile when click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Doctors", href: "/doctors" },
    { label: "Services", href: "/services" },
    { label: "Appointments", href: "/appointments" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <div className={navbarStyles.navbarBorder}></div>
      <nav
        ref={navRef}
        className={`${"sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 transition-transform duration-500"} ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl font-[pacifico] md:px-2 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 -ml-3 sm:-ml-4">
              <div className="relative flex items-center justify-center overflow-hidden p-2 mx-1 h-full w-full">
                <img
                  src={logo}
                  alt="logo"
                  className="w-14 h-14 sm:w-18 sm:h-18 lg:w-15 lg:h-15 xl:w-24 xl:h-24 md:w-20 md:h-20 object-contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="md:text-2xl lg:text-2xl xl:text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-emerald-600 to-green-600 tracking-tight text-xl leading-none">
                  MediCare
                </h1>
                <p className="lg:text-xs text-gray-500whitespace-nowrap leading-none text-xs mt-1">
                  Healthcare Solutions
                </p>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:-mx-5 lg:flex items-center gap-2">
              <div className="flex gap-1 bg-white border border-emerald-200 p-1 rounded-full shadow-lg">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`"nav-item px-5 md:px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300" ${
                        isActive
                          ? "active"
                          : "text-gray-700 hover:text-emerald-600"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right side (Desktop) */}
            <div className="flex items-center gap-3">
              <SignedOut>
                <Link
                  to="/doctor-admin/login"
                  className="btn-add hidden lg:inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold transition-transform duration-200"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden lg:text-xs lg:whitespace-nowrap sm:inline-block">
                    Doctor Admin
                  </span>
                </Link>
                <button
                  onClick={() => clerk.openSignIn()}
                  className="btn-login hidden lg:flex lg:text-sm items-center gap-2 bg-linear-to-r from-emerald-400 to-green-600 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-xl transition-all duration-300 cursor-default"
                >
                  <Key className="w-4 h-4" />
                  Login
                </button>
              </SignedOut>

              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>

              {/* Mobile toggle button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2.5 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                {isOpen ? (
                  <X className="w-6 h-6 text-gray-900" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-900" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isOpen && (
            <div className="mobile-menu lg:hidden pb-4 space-y-2 border-t border-emerald-100 pt-4">
              {navItems.map((item, idx) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={idx}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-emerald-500 text-white"
                        : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <SignedOut>
                <Link
                  to="/doctor-admin/login"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full border border-emerald-200 bg-white text-sm font-semibold hover:bg-emerald-50 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Doctor Admin
                </Link>

                <div className="w-full mt-3">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      clerk.openSignIn();
                    }}
                    className="w-full md:rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-emerald-500 to-green-600 text-white py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all cursor-pointer"
                  >
                    Login
                  </button>
                </div>
              </SignedOut>
            </div>
          )}
        </div>
        <style>{navbarStyles.animationStyles}</style>
      </nav>
    </>
  );
};

export default Navbar;
