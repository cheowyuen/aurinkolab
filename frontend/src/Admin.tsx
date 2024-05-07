import { useState, useEffect, useRef } from 'react';
import Notification from '../src/Notification';
import { saveTutorSignup } from '../src/services/tutorSignupService';
import { getAllEducationCenters } from '../src/services/educationCenterService';
import { EducationCenter } from "../src/types";
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [submitCount, setSubmitCount] = useState(0);
    const [isAgreed, setIsAgreed] = useState(false);
    const [display_on_website, setDisplay_on_website] = useState(false);
    const [educationCenters, setEducationCenters] = useState<EducationCenter[]>([]);
    const [educationCenterId, setEducationCenterId] = useState(0);

    const [fields, setFields] = useState({
        firstName: "",
        lastName: "",
        email: "",
        contact_no: "",
        password: "",
        confirmPassword: "",
        role: ""
    });

    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        email: false,
        contact_no: false,
        password: false,
        role: false
    });

    const navigate = useNavigate();
    const notificationRef = useRef<HTMLDivElement | null>(null); /** Create a ref */

    useEffect(() => {
        getAllEducationCenters().then(data => {
          setEducationCenters(data);
          if (data.length > 0) {
            setEducationCenterId(data[0].id)
          }
        })
    }, [])

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

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateContactNo = (number: string) => {
        /** Allows optional country code, spaces, dashes, and parentheses */
        const phoneRegex = /^(\+?\d{1,3})?[-. ]?(\(?\d{1,3}\)?)?[-. ]?\d{3}[-. ]?\d{4}$/;
        return phoneRegex.test(number);
    };   

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsAgreed(event.target.checked);
    };

    const displayOnWebsiteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDisplay_on_website(event.target.checked);
    };

    const educationCenterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setEducationCenterId(Number(event.target.value));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setSubmitCount(prevCount => prevCount + 1);

        /** Set error for blank required fields */
        const updatedErrors = {
            firstName: fields.firstName.trim() === "",
            lastName: fields.lastName.trim() === "",
            email: fields.email.trim() === "",
            contact_no: fields.contact_no.trim() === "",
            password: fields.password.trim() === "",
            role: fields.role.trim() === ""
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
        if (!validateEmail(fields.email)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        } else {
            setErrorMessage('');
        }

        /** Contact number validation */
        if (!validateContactNo(fields.contact_no)) {
            setErrorMessage('Please enter a valid contact number.');
            return;
        } else {
            setErrorMessage('');
        }

        /** Check if passwords match */
        if (fields.password !== fields.confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        } else {
            setErrorMessage('');
        }

        /** Check if education center id is valid */
        if (educationCenterId === 0) {
            setErrorMessage("Invalid education center. Please contact administrator.");
            console.error("Please select a valid education center.");
            return;
        } else {
            setErrorMessage('');
        }

        /** Check if privacy policy checkbox is ticked */
        if (!isAgreed) {
            setErrorMessage('Please read and agree to our Privacy Policy to continue.');
            return;
        } else {
            setErrorMessage('');
        }

        try {
            /** Save tutor data */
            await saveTutorSignup(
                fields.firstName, 
                fields.lastName, 
                fields.email, 
                fields.contact_no, 
                fields.password, 
                educationCenterId,
                fields.role,
                display_on_website
            );
    
            /** If no error was thrown, data was saved successfully */
            console.error("Successfully registered tutor");
        } catch (error) {
            /** Handle any errors that might have occurred during saveQuiz */
            console.error("Error registering tutor:", error);
            if (error instanceof Error) { 
                if (error.message === 'Email already in use') {
                    setErrorMessage("This email address is already registered."); 
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
        setFields({
            firstName: "",
            lastName: "",
            email: "",
            contact_no: "",
            password: "",
            confirmPassword: "",
            role: ""
        });

        setEducationCenterId(educationCenters[0].id);
        setDisplay_on_website(false);
        setIsAgreed(false);

        navigate('/verifyemail', { state: { email: fields.email } })
    };

    return (
        <div className="flex justify-center items-center min-h-screen"> 
            <div className="w-full max-w-4xl p-6 bg-white rounded">
                <div className="signup-title">
                    <p>Tutor Registration</p>
                </div>   

                <div className="p-5 text-lg page-font-color">
                    <p className="title-font text-base text-center">
                        Already have an account? <a href="/login" className="lightblue hover:underline">Log in</a>
                    </p>

                    <Notification ref={notificationRef} message={errorMessage} />

                    <form noValidate className="w-full max-w-4xl pt-10" onSubmit={handleSubmit}>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block tracking-wide mb-2">
                                    First Name*
                                </label>
                                <input onChange={handleInputChange} value={fields.firstName} className={`appearance-none block w-full border ${errors.firstName ? 'border-red' : 'border-gray-300'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} name="firstName" type="text" />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block tracking-wide text mb-2">
                                    Last Name*
                                </label>
                                <input onChange={handleInputChange} value={fields.lastName} className={`appearance-none block w-full border ${errors.lastName ? 'border-red' : 'border-gray-300'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} name="lastName" type="text" />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block tracking-wide mb-2">
                                    Email*
                                </label>
                                <input onChange={handleInputChange} value={fields.email} className={`appearance-none block w-full border ${errors.email || errorMessage.includes("email") ? 'border-red' : 'border-gray-300'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} name="email" type="email" />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block tracking-wide text mb-2">
                                    Contact No.*
                                </label>
                                <input onChange={handleInputChange} value={fields.contact_no} className={`appearance-none block w-full border ${errors.contact_no || errorMessage.includes("contact") ? 'border-red' : 'border-gray-300'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} name="contact_no" type="text" />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block tracking-wide mb-2">
                                    Password*
                                </label>
                                <input onChange={handleInputChange} value={fields.password} className={`appearance-none block w-full border ${errors.password || errorMessage.includes("Passwords") ? 'border-red' : 'border-gray-300'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} name="password" type="password" />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block tracking-wide text mb-2">
                                    Confirm Password*
                                </label>
                                <input onChange={handleInputChange} value={fields.confirmPassword} className={`appearance-none block w-full border ${errorMessage.includes("Passwords") ? 'border-red' : 'border-gray-300'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} name="confirmPassword" type="password" />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block tracking-wide mb-2">
                                    Education Center*
                                </label>
                                <select onChange={educationCenterChange} value={educationCenterId} className="block w-full border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="education_center">
                                    {educationCenters.map((center) => (
                                        <option key={center.id} value={center.id}>{center.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block tracking-wide mb-2">
                                    Role*
                                </label>
                                <input onChange={handleInputChange} value={fields.role} className={`appearance-none block w-full border ${errors.role ? 'border-red' : 'border-gray-300'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} name="role" type="text" />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block tracking-wide mb-2">
                                    <input type="checkbox" name="display_on_website" className="mr-3" checked={display_on_website} onChange={displayOnWebsiteChange} />
                                    By checking this box, you agree to have your information displayed on the website.
                                </label>
                                <label className="block tracking-wide mb-2">
                                    <input type="checkbox" name="privacy_policy" className="mr-3" checked={isAgreed} onChange={handleCheckboxChange} />
                                    By creating an account, you agree to the <a href="" className="underline">Privacy Policy</a>.
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 text-center">
                                <button className="shadow focus:shadow-outline focus:outline-none text-white py-4 px-8 rounded-3xl bg-lightblue" type="submit">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Admin;

