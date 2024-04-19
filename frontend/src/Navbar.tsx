//import { Link } from 'react-scroll';
import Logo from "./Logo";
import { motion } from "framer-motion";
import { animationStart, reveal } from "./utils/animation";
import LinkedinLogo from "./LogoLinkedin";
import TiktokLogo from "./LogoTiktok";
import { Link as RouterLink, useLocation } from 'react-router-dom'; //Imported Link to route to Test page
import { useState, useEffect } from 'react';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const timer = setTimeout(() => {
          if (location.state?.scrollTo) {
            const section = document.getElementById(location.state.scrollTo);
            if (section) {
              section.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }, 100); 
      
        return () => clearTimeout(timer); 
      }, [location.state]);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: animationStart }}
        >
            <motion.div variants={reveal} initial="hiddenVariant" animate="revealedVariant" transition={{
                ease: "easeIn",
                type: "tween",
                staggerChildren: 0.1,
                duration: 0.5,
                delayChildren: animationStart + 0.5,
            }} className="w-full flex items-center justify-between h-80px fixed top-0" style={{ backgroundColor: '#505050', zIndex: 100 }}
            >
                <motion.div variants={reveal}>
                    <RouterLink to={"/"} onClick={() => setIsOpen(false)} state={{ scrollTo: "mission-section" }}><Logo /></RouterLink>
                </motion.div>
                <button onClick={toggleDropdown} className="md:hidden">
                    <svg className="w-8 h-8 hamburger-menu" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 5h14a1 1 0 010 2H3a1 1 0 110-2zm0 6h14a1 1 0 010 2H3a1 1 0 010-2zm0 6h14a1 1 0 010 2H3a1 1 0 110-2z" clipRule="evenodd" />
                    </svg>
                </button>

                {isOpen && (
                    <div className="absolute top-full left-0 w-full py-3 px-5 md:hidden dropdown-menu">
                        <RouterLink to={"/"} state={{ scrollTo: "about-section" }} onClick={() => setIsOpen(false)} className="block py-2 px-4 cursor-pointer">About</RouterLink>
                        <RouterLink to={"/"} state={{ scrollTo: "partners-section" }} onClick={() => setIsOpen(false)} className="block py-2 px-4 cursor-pointer">Partners</RouterLink>
                        <RouterLink to="/educationcenters" onClick={() => setIsOpen(false)} className="block py-2 px-4 cursor-pointer">Education Centers</RouterLink>
                        <RouterLink to="/events" onClick={() => setIsOpen(false)} className="block py-2 px-4 cursor-pointer">Events</RouterLink>
                        <RouterLink to="/entrytest" onClick={() => setIsOpen(false)} className="block py-2 px-4 cursor-pointer">Quiz</RouterLink>
                        <RouterLink to={"/"} state={{ scrollTo: "FAQ-section" }} onClick={() => setIsOpen(false)} className="block py-2 px-4 cursor-pointer">FAQ</RouterLink>
                        <RouterLink to={"/"} state={{ scrollTo: "contact-section" }} onClick={() => setIsOpen(false)} className="block py-2 px-4 cursor-pointer">Contact</RouterLink>
                        <a href="https://www.linkedin.com/company/aurinkolab" target="_blank" rel="noopener noreferrer" className="cursor-pointer py-4 px-4 container"><LinkedinLogo /></a>
                        <a href="https://www.tiktok.com/@aurinkolab?_t=8kJWgknKlHN&_r=1" target="_blank" rel="noopener noreferrer" className="cursor-pointer py-4 px-4 container"><TiktokLogo /></a>
                        <RouterLink to="/events" onClick={() => setIsOpen(false)} className="block py-2 px-4 cursor-pointer">Apply Now</RouterLink>
                    </div>
                )}

                <div className="nav-bar hidden md:flex">
                    <motion.div variants={reveal} className="cursor-pointer">
                        <RouterLink to="/events">Events</RouterLink>
                    </motion.div>
                    <motion.div variants={reveal} className="cursor-pointer">
                        <RouterLink to="/entrytest">Quiz</RouterLink> {/* Route to quiz page */}
                    </motion.div>
                    <motion.div variants={reveal} className="cursor-pointer">
                        <RouterLink to={"/"} state={{ scrollTo: "about-section" }}>About</RouterLink>
                    </motion.div>
                    <motion.div variants={reveal} className="cursor-pointer">
                        <RouterLink to={"/"} state={{ scrollTo: "partners-section" }}>Partners</RouterLink>
                    </motion.div>
                    {/* Mariaro: TODO: 'apply' button. Hided until 'apply' button is work */}
                    {/* <motion.div variants={reveal} className="cursor-pointer">
                        <RouterLink to={"/educationcenters"} >Education Centers</RouterLink>
                    </motion.div> */}
                    {/* Mariaro TODO: to fins a better place */}
                    {/* <motion.div variants={reveal} className="cursor-pointer">
                        <RouterLink to={"/"} state={{ scrollTo: "FAQ-section" }}>FAQ</RouterLink>
                    </motion.div> */}
                    <motion.div variants={reveal} className="cursor-pointer">
                        <RouterLink to={"/"} state={{ scrollTo: "contact-section" }}>Contact</RouterLink>
                    </motion.div>
                    <motion.div variants={reveal} className="cursor-pointer">
                    <a href="https://www.linkedin.com/company/aurinkolab" target="_blank" rel="noopener noreferrer" className="cursor-pointer"><LinkedinLogo /></a>
                    </motion.div>
                    <motion.div variants={reveal} className="cursor-pointer">
                    <a href="https://www.tiktok.com/@aurinkolab?_t=8kJWgknKlHN&_r=1" target="_blank" rel="noopener noreferrer" className="cursor-pointer"><TiktokLogo /></a>
                    </motion.div>
                </div>     
                <div className="apply-button hidden md:flex">
                    <motion.span variants={reveal} className="cursor-pointer">
                        <RouterLink to="/events">Apply Now</RouterLink>
                    </motion.span>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default Navbar;