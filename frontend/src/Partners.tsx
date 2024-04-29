import Valtteri from "./LogoValtteri";
import Elvene from "./LogoElvene";
import Megawatt from "./LogoMegawatt";
import Aalto from "./LogoAalto";
import Stek from "./LogoStek";
import Comstdt from "./LogoComstedt"

import { useNavigate } from 'react-router-dom';


/**
 * 
 * @module PartnersSection 
 * @date 5.4.2024
 * 
 * @description this is a Function for displaying the Partner's logos in the home page of the web site.s
 * 
 */

function PartnersSection(): JSX.Element {
    const navigate = useNavigate();
    return (
    <div id="partners-container" className= "partners-div"> 
        <div className="header-content"><p>Aurinko Partners :</p></div>
            <div id="partners-section" className="partners-section">
                <div>
                    <a ><Elvene /></a>
                </div>

                <div>
                    <a ><Stek /></a>
                </div> 

                <div>
                    <a ><Megawatt /></a>
                </div>

                <div>
                    <a ><Aalto /></a>
                </div>
            </div>
            <div className="partners-section">
                <div>
                    <a><Valtteri /></a>
                </div>
                <div>
                    <a><Comstdt /></a>
                </div>
            </div>
            <div className="flex justify-center mx-auto pt-12 pb-6  w-full">
                <div className="flex flex-col items-center">
                    <button className="button-tiny" onClick={() => navigate('/partnersregistration')}>Download the Presentation for Partners</button>
                </div>
            </div>
    </div> 
    );
  }
  
  export default PartnersSection;
  
  