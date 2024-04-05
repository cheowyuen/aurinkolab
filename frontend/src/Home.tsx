import HeroText from "./HeroText";
import BoatVideo from "./BoatVideo";
import FooterText from "./FooterText";
import MiddleText from "./MiddleText";
import Mission from "./Mission";
import AboutAurinkoLab from "./AboutAurinkoLab";
import FAQ from "./FAQ";
import Contact from "./Contact";
import Partners from "./Partners";
import Events from "./Events";

function Home() {
    return (
    <>
        <HeroText />
        <BoatVideo />
        <MiddleText />
        <Mission />
        <AboutAurinkoLab />
        <FAQ />
        <Events />
        <Partners />
        <Contact />
        <FooterText />
    </>
    );
}

export default Home;
