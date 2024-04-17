import HeroText from "./HeroText";
import BoatVideo from "./BoatVideo";
import FooterText from "./FooterText";
import MiddleText from "./MiddleText";
import Mission from "./Mission";
import AboutAurinkoLab from "./AboutAurinkoLab";
import FAQ from "./FAQ";
import Contact from "./Contact";
import Partners from "./Partners";

function Home() {
    return (
    <>
        <HeroText />
        <BoatVideo />
        <MiddleText />
        <Mission />
        <AboutAurinkoLab />
        <FAQ />
        <Partners />
        <Contact />
        <FooterText />
    </>
    );
}

export default Home;
