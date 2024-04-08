import { Link } from 'react-scroll';
import Logo from "./Logo";
import { motion } from "framer-motion";
import { animationStart, reveal } from "./utils/animation";
import LinkedinLogo from "./LogoLinkedin";
import TiktokLogo from "./LogoTiktok";
import { Link as RouterLink } from 'react-router-dom'; //Imported Link to route to Test page

function Navbar() {
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
                    <Link to="mission-section" smooth={true} duration={500} offset={-80} className="cursor-pointer"><Logo /></Link>
                </motion.div>
                <div className="nav-bar">
                    <motion.div variants={reveal} className="cursor-pointer">
                        <Link to="about-section" smooth={true} duration={500}  offset={-80} className="cursor-pointer">About</Link>
                    </motion.div>
                    <motion.div variants={reveal} className="cursor-pointer">
                        <Link to="events-section" smooth={true} duration={500} offset={-80}className="cursor-pointer">Events</Link>
                    </motion.div>
                    <motion.div variants={reveal} className="cursor-pointer">
                        <RouterLink to="/entrytest">Engineering Test</RouterLink> {/* To route Engineering Test to Test page */}
                    </motion.div>
                    <motion.div variants={reveal} className="cursor-pointer">
                        <Link to="FAQ-section" smooth={true} duration={500} offset={-80} className="cursor-pointer">FAQ</Link>
                    </motion.div>
                    <motion.div variants={reveal} className="cursor-pointer">
                        <Link to="contact-section" smooth={true} duration={500} offset={-80} className="cursor-pointer">Contact</Link>
                    </motion.div>
                    <motion.div variants={reveal} className="cursor-pointer">
                    <a href="https://www.linkedin.com/company/aurinkolab" target="_blank" rel="noopener noreferrer" className="cursor-pointer"><LinkedinLogo /></a>
                    </motion.div>
                    <motion.div variants={reveal} className="cursor-pointer">
                    <a href="https://www.tiktok.com/@aurinkolab?_t=8kJWgknKlHN&_r=1" target="_blank" rel="noopener noreferrer" className="cursor-pointer"><TiktokLogo /></a>
                    </motion.div>
                </div>     
                <div className="apply-button">
                    <motion.span variants={reveal} className="cursor-pointer">
                        <Link to="events-section" smooth={true} duration={500} offset={-80} className="cursor-pointer">Apply Now</Link>
                    </motion.span>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default Navbar;
