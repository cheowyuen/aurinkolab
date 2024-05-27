import { useState, useEffect, useRef } from 'react';
import Notification from '../src/Notification';
import { useTranslation } from "react-i18next";
import { savePartnersData } from '../src/services/savePartnersData';
import { useNavigate } from 'react-router-dom';



    
const partnersRegistration = () => {
    const {t} =useTranslation()
    const [errorMessage, setErrorMessage] = useState("");
    const [submitCount, setSubmitCount] = useState(0);

    const [fields, setFields] = useState({
        companyName: "",
        emailAddress: ""
       
    });

    const [errors, setErrors] = useState({
        companyName: false,
        emailAddress: false
    });

    const navigate = useNavigate();
    const notificationRef = useRef<HTMLDivElement | null>(null); /** Create a ref */
   

    useEffect(() => {
        if (errorMessage !== '') { 
            if (notificationRef.current) {
                const topPosition = notificationRef.current.getBoundingClientRect().top + window.scrollY - 100; /** Subtract 100 pixels to account for the navbar height */
                
                window.scrollTo({
                    top: topPosition,
                    behavior: 'smooth',
                });
            }
        }
      }, [errorMessage, submitCount]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target as { name: string, value: string };
        setFields(prev => ({ ...prev, [name]: value }));
    };

    const validateEmail = (emailAddress: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailAddress);
    };

    

    const handleSubmit =async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setSubmitCount(prevCount => prevCount + 1);

        /** Set error for blank required fields */
        const updatedErrors = {
            companyName: fields.companyName.trim() === "",
            emailAddress: fields.emailAddress.trim() === ""
           
        };

        setErrors(updatedErrors);

        /** Check for blank required fields */
        const hasError = Object.values(updatedErrors).some(e => e);
        if (hasError) {
            setErrorMessage("Please fill in all required fields.");
            return;
        } else {
            setErrorMessage('');
        }

        /** Email validation */
        if (!validateEmail(fields.emailAddress)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        } else {
            setErrorMessage('');
        }

        try {
            /** Save partners data */
            await savePartnersData(
                fields.companyName, 
                fields.emailAddress
            );
            console.log("sending the form data")
    
            /** If no error was thrown, data was saved successfully */
            console.error(`Successfully registered`);
        } catch (error) {
            /** Handle any errors that might have occurred during saveQuiz */
            console.error(`Error registering :`, error);
            console.log("estes es el error>>>",error)
            if (error instanceof Error) { 
                if (error.message == "Email already request the presentation") {
                    setErrorMessage(error.message); 
                    return;
                } else {
                    setErrorMessage("An error occurred during registration. Please try again."); 
                    return;
                }
            } else {
                setErrorMessage("An unexpected error occurred. Please try again."); 
                return;
            }
        }

     
        /** Reset fields after successful submission */
        const emailForNavigation = fields.emailAddress;

        /** Reset fields after successful submission */
        setFields({
            companyName: "",
            emailAddress: ""
        });
    
        /** Navigate after resetting fields */
        navigate('/confirmationpartners', { state: { email: emailForNavigation } 
    });

};

    return (
        <div className="flex justify-center items-center min-h-screen"> 
            <div className="w-full max-w-4xl p-6 bg-white rounded">
                <div className="signup-title">
                    <p>{t('Sponsorship Opportunities')}</p>
                </div>
                <div>
                    <p className="text-center"> {t('partner-description')}</p>
                    
                </div>   

                <div className="p-5 text-lg page-font-color">
                   
                    <Notification ref={notificationRef} message={errorMessage} />

                    <form noValidate className="w-full max-w-4xl pt-10" onSubmit={handleSubmit}>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block tracking-wide mb-2">
                                {t('Company Name')}*
                                </label>
                                <input onChange={handleInputChange} value={fields.companyName} className={`appearance-none block w-full border ${errors.companyName ? 'border-red' : 'border-gray-300'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} name="companyName" type="text" />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block tracking-wide text mb-2">
                                {t('Email Address')}*
                                </label>
                                <input onChange={handleInputChange} value={fields.emailAddress} className={`appearance-none block w-full border ${errors.emailAddress ? 'border-red' : 'border-gray-300'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} name="emailAddress" type="text" />
                            </div>
                        </div>
                       
                      
                   
                
           
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 text-center">
                                <button className="shadow focus:shadow-outline focus:outline-none text-white py-4 px-8 rounded-3xl bg-lightblue" type="submit">
                                    {t('Send me the presentation')}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default partnersRegistration;
