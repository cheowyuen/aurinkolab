import { motion } from "framer-motion";
import { animationStart, reveal } from "./utils/animation";
import "./index.css";
import { useTranslation } from "react-i18next";


function HeroText() {
    const {t}= useTranslation()
    return (
        <motion.div 
            layout
            initial={{ height: 0 }} 
            animate={{ height: "unset" }} 
            transition={{ delay: animationStart, duration: 1 }} 
            className="hero-text"
            style={{ zIndex: 1, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}
        >
            <motion.div variants={reveal} initial="hiddenVariant" animate="revealedVariant" transition={{ delay: animationStart + 1, duration: 0.5 }} className="flex flex-col text-2vw <md:text-24px font-bold mb-30px pt-100px ">
                <span className="aurinkolab-text">{t('hero-paragraph-1')}</span>
            </motion.div>
            <motion.span variants={reveal} initial="hiddenVariant" animate="revealedVariant" transition={{ delay: animationStart + 1, duration: 0.5 }} className="description-herotext">
              {t('hero-paragraph-2')} <br />
            </motion.span>
        </motion.div>
    );
}


export default HeroText;
