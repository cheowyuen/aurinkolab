import React, { useState } from 'react';
import Logo from "./Logo";



// Define an interface for the form data
interface FormData {
  name: string;
  educationalLanguage: string;
  email: string;
  contactNumber: string;
}

const ApplicationForm: React.FC = () => {
  // Set up state to manage the form data
  const [formData, setFormData] = useState<FormData>({
    name: '',
    educationalLanguage: '',
    email: '',
    contactNumber: ''
  });
  
  // State to manage the submission message visibility
  const [submissionMessageVisible, setSubmissionMessageVisible] = useState<boolean>(false);

  // Function to handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      name: '',
      educationalLanguage: '',
      email: '',
      contactNumber: ''
    });
    setSubmissionMessageVisible(true);
    setTimeout(() => {
      setSubmissionMessageVisible(false);
    }, 3000);
  };

  return (
    <div id="events-section" className="hackathon-section">
      <div className="hackathon-content">
        <span>Engineering Hackathon - 1</span>
      </div>
      <div className="hackathon-content-wrapper">
        <div className="hackathon-schedule-text">
          <p>
            🌞 Dates: April - May 2024<br />
            🏢 Place: TBD, Espoo<br />
            🛥️ Multimodal vehicles: Solar Electric Boats<br />
            ⛵ Solar Regatta: 01 June 2024<br />
          </p>
        </div>
        <div className="apply-section">
          <div className="apply-text">
            <form onSubmit={handleSubmit}>
              <p>Registration is closed. If you're interested in participating, <br/>please apply by sending your name and contact number via email to info@aurinkolab.fi<br/>-------------------------------------------------------</p>
              {/* <p>Please apply fill out the form to apply</p> */}
              <table>
                <tbody>
                  <tr>
                    <td>Name, Surname *</td>
                    <td><input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required /></td>
                  </tr>
                  <tr>
                    <td>Educational Language *</td>
                    <td><input type="text" name="educationalLanguage" value={formData.educationalLanguage} onChange={handleChange} placeholder="Enter your educational language" required /></td>
                  </tr>
                  <tr>
                    <td>E-mail *</td>
                    <td><input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required /></td>
                  </tr>
                  <tr>
                    <td>Contact Number *</td>
                    <td><input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Enter your contact number" required /></td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="center-button">
                      <button type="submit" style={{ marginTop: '10px' }}>Submit</button>
                    </td>
                  </tr>
                  {submissionMessageVisible && (
                    <tr>
                      <td colSpan={2} style={{ color: "#785050", background: '#EBE5CE' }} className="center-button">
                        <Logo />
                        {/* Thank You! Your application has been submitted */}
                        Registration is closed. If you're interested in participating,<br/>please apply by sending your name and contact number via email to info@aurinkolab.fi   Thanks!<br/>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationForm;
