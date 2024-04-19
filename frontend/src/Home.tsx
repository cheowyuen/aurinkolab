import HeroText from "./HeroText";
import BoatVideo from "./BoatVideo";
import FooterText from "./FooterText";
import MiddleText from "./MiddleText";
import AboutAurinkoLab from "./AboutAurinkoLab";
import Contact from "./Contact";
import Partners from "./Partners";

function Home() {
    return (
    <>
        <HeroText />
        <BoatVideo />
        <MiddleText />
        <AboutAurinkoLab />
        {/* Mariaro: hided for a main page. TODO: delete after 28.04.2024 */}
        {/* <FAQ /> */}
        <MiddleText />
        <Partners />
        <MiddleText />
        <Contact />
        <FooterText />
    </>
    );
}

export default Home;
