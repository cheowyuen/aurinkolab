import { useEffect } from 'react'

/**
 * @date 17.04.2024
 * @module EducationCentersForm
 * @description Education centers page for displaying general information about the instrucctions and details for particapatio
 * 
*/


function EducationCentersForm (){
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
   


    return (
        <div className="container-education-centers">
            <div className='partners-title'>
                <p>Eduation Centers</p>
            </div>

            <div className="education-box-2">
            <div className="overview">
                <div className="header-content">
                <h1>Overview</h1>
                </div>
                <br />
                <p>Focused on multimodal building expertise, hydrogen and solar energy promotion, and environmentally conscious transport, the AurinkoLab EdTech program is designed to equip participants with the skills to adhere to the ISO14083 standard. The AurinkoLab engineering program is strategically positioned in alignment with contemporary energy development trends. This educational initiative supports the new ISO14083 standard requirements. 

                    The growing adoption of eco-friendly renewable energy sources, and the widespread use of individual vehicles, including hydrogen and electric motor boats, highlight the demand for skills in these evolving domains.</p>
                <br />
                </div>
                <div className="header-content">
                <h1>How to apply </h1>
                </div>
                <br />
                <div className="header-content">
                <h1>Step 1</h1>
                </div>
                <p>For education centers</p>
                <br />
                <p>Determine your vehicle type:</p>
                <br />
                <ul style={{ listStyle: 'inside' }}>
                    <li>Solar electric boat</li>
                    <li>Hydrogen-driven boat</li>
                    <li>Solar-elctric go-kart</li>
                    <li>Hydrogen go-kart</li>
                    <li>Electric snow-bike</li>
                </ul>
                <br />
                <div className="header-content"> 
                <h1>step 2</h1>
                </div>
                <br />
                <p>Your next step is to decide when to participate:</p>
                <br />
                <ul style={{ listStyle: 'inside' }}>
                    <li>Autumn 2024</li>
                    <li>Winter 2024</li>
                    <li>Spring 2025</li>
                    
                </ul>
                <br />
                <div className="header-content"> 
                <span>step 3</span>
                </div>

                <br />
                <p>There are a series of aspects that educational centers must take into account to participate in the competitions. Therefore, it is recommended to consider the following:</p>
                <br />

                <ul style={{ listStyle: 'inside' }}>
                    <li>Team and participants</li>
                    <br />
                    <p>To enhance the quality of work and maximize the benefits of participation in the project, we strive to involve teams of participants rather than individual developers. Working in a team allows students to refine skills in effective collaboration, communication, task sharing, and responsibility delegation. It also fosters the ability to make individual and collective decisions. 

                        Teamwork shapes leadership qualities and cultivates students' abilities to advocate for their ideas while listening to the ideas of other team members.

                        Size of the team: 5 - 18 participants. (The group size is calculated based on the maximum capacity of the development and participation groups).</p>
                    <br />
                    <li>Workspace</li>
                    <br />
                    <p>Secure a dedicated space for boat construction, whether industrial or a team member's garage.</p>
                    <br />
                    <li>Tools</li>
                    <br />
                    <p>Obtain various tools and measuring instruments necessary for construction and quality control processes.</p>
                    <br />
                    <li>Project Organization</li>
                    <br />
                </ul>
                <br />
                

              
            </div>

            <div>
            <form  >
                <div className="container-form">
                <fieldset>
                    <legend>Registration for Education Center</legend>
             
                <div className="container-fieldset">
                  <div className="form-box-1">
                    <label className="input-text-form" >Education Center Name</label>
                    <input className="options2" type="text" name="name" placeholder="Enter the name of the Education Center" required />
                  </div>
    
                  <div className="form-box-1">
                    <label className="input-text-form">Address</label>
                    <input className="options2" type="text" name="address" placeholder="Enter your address" required />
                  </div>
                  
                  <div className="form-box-1">
                    <label className="input-text-form" >E-mail</label>
                    <input  className="options2" type="email" name="email" placeholder="Enter your email" required />
                  </div>
                  
                  <div className="form-box-1">
                    <label className="input-text-form">Contact Number</label>
                    <input className="options2" type="text" name="contactNumber"  placeholder="Enter your contact number" required />
                  </div>
                  <div className="input-text-form2">
                    <label className="options-label">When do you want to make it?</label>
                    <select className="options" name="timing">
                        <option value="Autumn 2024">Autumn 2024</option>
                        <option value="Winter 2024">Winter 2024</option>
                        <option value="Spring 2025">Spring 2025</option>
                    </select>
                </div>
               
                <div className="input-text-form2">
                <label className="options-label">What vehicles do you want to build??</label>
                    <select className="options" name="vehicle">
                        <option className="delect-options" value="solar electric boat">solar electric boat</option>
                        <option className="delect-options" value="hydrogen-driven boat">hydrogen-driven boat</option>
                        <option className="delect-options"  value="solar-elctric go-kart">solar-elctric go-kart</option>
                        <option className="delect-options" value="hydrogen go-kart">hydrogen go-kart</option>
                        <option className="delect-options" value="electric snow-bike">electric snow-bike</option>
                    </select>
                </div>
                
                <div className="input-text-form2">
                <label className="options-label">Who will provide the vehicle?</label>
                    <select className="options" name="vehicle-owner">
                        <option value="AurinkoLab's vehicles">AurinkoLab's vehicles</option>
                        <option value="We will create the vehicle ourselves">We will create the vehicle ourselves</option>
                    </select>
                </div>
                
                <div className="input-text-form2">
                <label className="options-label">Do you have a place for construction?</label>
                    <select className="options" name="vehicle-owner">
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
               
                <div className="input-text-form2">
                <label className="options-label">Do you need a team?</label>
                    <select className="options" name="vehicle-owner">
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                
                  <div className="input-text-form2">
                  <label className="options-label">Do you need a sponsorchip?</label>
                    <select className="options" name="yes/no">
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
               
                  

                  </div>
                </fieldset>
                <div className="container-buttom">
                      <button type="submit" className="apply-education-center">Apply</button>
                  </div>

                </div>
                
            </form>
          
            </div>
           
        </div>
    );
}

export default EducationCentersForm;