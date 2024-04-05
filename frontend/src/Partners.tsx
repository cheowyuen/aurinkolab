import Valtteri from "./LogoValtteri";
import Elvene from "./LogoElvene";
import Megawatt from "./LogoMegawatt"

/**
 * 
 * @module PartnersSection 
 * @date 5.4.2024
 * 
 * @description this is a Function for displaying the Partner's logos in the home page of the web site.s
 * 
 */

function PartnersSection(): JSX.Element {
    return (
     <div className= "partners-div">  <p className= "partners-text">Our Partners</p>
    <div id="partners-section" className="partners-section">
            
        <div>
        <a ><Valtteri /></a>
        </div> 

        <div>
        <a ><Megawatt /></a>
        </div> 
       
        <div>
        <a ><Elvene /></a>
        </div>
        
  </div>
  </div> 
    );
  }
  
  export default PartnersSection;
  
  