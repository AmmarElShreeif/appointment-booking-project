import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { navLinks } from "@/data";


export function Navbar() {
  const { user, loginWithGoogle } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location]);


  const handleSubmit = async () => {
    try {
      const loggedInUser = await loginWithGoogle();

      if (!loggedInUser) {
        throw new Error("Failed in Log In : failed to get user data");
      }

      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loggedInUser.email,
          username: loggedInUser.displayName,
          photoUrl: loggedInUser.photoURL,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something wrong in log in try again later");
      }

    } catch (error) {
      console.error("Failed In Log In", error);
    }
  };



  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-lg shadow-soft" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-semibold"
            >
              <span className="text-primary">Med</span>
              <span>Book</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <nav className="flex space-x-6 mr-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground/80"
                    }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      layoutId="navbar-indicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {user !== null ? (
              <div className="w-9 h-9">
                <Link to='/dashboard'>
                  <img src={user.photoURL || undefined} alt='profile foto' className="rounded-full" />
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  asChild
                  className="text-sm font-medium"
                  variant="outline"
                  onClick={handleSubmit}
                >
                  <a className="flex cursor-pointer items-center gap-1">
                    <div
                      style={{
                        backgroundImage: "url('/google.png')",
                        width: "32px",
                        height: "32px",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }}
                    />
                    Sign In
                  </a>
                </Button>
              </div>
            )
            }

          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center justify-center">
            <div>
              {user !== null ? (
                <div className="w-9 h-9">
                  <Link to='/dashboard'>
                    <img src={user.photoURL || undefined} alt='profile foto' className="rounded-full" />
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button
                    asChild
                    className="text-sm font-medium"
                    variant="outline"
                    onClick={handleSubmit}
                  >
                    <a className="flex cursor-pointer items-center gap-1">
                      <div
                        style={{
                          backgroundImage: "url('/google.png')",
                          width: "32px",
                          height: "32px",
                          backgroundSize: "cover",
                          backgroundPosition: "center"
                        }}
                      />
                      Sign In
                    </a>
                  </Button>
                </div>
              )
              }
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-10 w-10" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {/* <div className="flex items-center ">
          <Link to='dashboard'>
            <img src={user.photoURL || undefined} alt='profile foto' className="rounded-full" />
          </Link>
        </div> */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-md shadow-soft"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-base py-2 transition-colors hover:text-primary ${location.pathname === link.path
                      ? "text-primary font-medium"
                      : "text-foreground/80"
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
