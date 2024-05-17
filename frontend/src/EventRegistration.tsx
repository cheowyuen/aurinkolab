import { useState, useEffect, useRef } from 'react';
import Notification from '../src/Notification';
import { applyRegatta } from '../src/services/regattaService';

interface RegattaProps {
    onRegistrationChange: (value: boolean) => void; 
    eventId: number;
}

const EventRegistration = ({ onRegistrationChange, eventId }: RegattaProps) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [submitCount, setSubmitCount] = useState(0);
    const [showLogoUpload] = useState(false);
    const [success, setSuccess] = useState(false);

    const [fields, setFields] = useState({
        vehicleName: "",
        teamLeader: "",
        email: "",
        contactNo: "",
        teamLogo: ""
    });

    const [errors, setErrors] = useState({
        vehicleName: false,
        teamLeader: false,
        email: false,
        contactNo: false
    });

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

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateContactNo = (number: string) => {
        /** Allows optional country code, spaces, dashes, and parentheses */
        const phoneRegex = /^(\+?\d{1,3})?[-. ]?(\(?\d{1,3}\)?)?[-. ]?\d{3}[-. ]?\d{4}$/;
        return phoneRegex.test(number);
    };  
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFields((prevFields) => ({
                    ...prevFields,
                    teamLogo: reader.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCancel = () => {
        onRegistrationChange(false);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setSubmitCount(prevCount => prevCount + 1);

        /** Set error for blank required fields */
        const updatedErrors = {
            vehicleName: fields.vehicleName.trim() === "",
            teamLeader: fields.teamLeader.trim() === "",
            email: fields.email.trim() === "",
            contactNo: fields.contactNo.trim() === ""
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
        if (!validateContactNo(fields.contactNo)) {
            setErrorMessage('Please enter a valid contact number.');
            return;
        } else {
            setErrorMessage('');
        }

        try {
            /** Save tutor data */
            await applyRegatta(
                eventId,
                fields.vehicleName, 
                fields.teamLeader, 
                fields.email, 
                fields.contactNo, 
                fields.teamLogo
            );
    
            /** If no error was thrown, data was saved successfully */
            setSuccess(true);
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Email already registered with this event.") {
                    setErrorMessage(error.message);
                    return;
                } else {
                    console.log("An error occurred during event registration.")
                    return;
                }
            } else {
                console.log("An unexpected error occurred.");
                return;
            }
        }

        /** Reset fields after successful submission */
        setFields({
            vehicleName: "",
            teamLeader: "",
            email: "",
            contactNo: "",
            teamLogo: ""
        });
    };

    return (
        <div className="flex ml-5 min-h-screen"> 
            <div className="w-full max-w-2xl p-6 bg-white rounded">
                <div className="regatta-title pl-5">
                    <p>Regatta Registration</p>
                </div>   

                <div className="pl-5 text-lg page-font-color">
                    {!success && (
                        <div>
                            <Notification ref={notificationRef} message={errorMessage} />

                            <form noValidate className="w-full max-w-4xl pt-10" onSubmit={handleSubmit}>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <label className="block tracking-wide mb-2">
                                            Vehicle Name*
                                        </label>
                                        <input onChange={handleInputChange} value={fields.vehicleName} className={`appearance-none block w-full border ${errors.vehicleName ? 'border-red' : 'border-gray-300'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} name="vehicleName" type="text" />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <label className="block tracking-wide mb-2">
                                            Team Leader*
                                        </label>
                                        <input onChange={handleInputChange} value={fields.teamLeader} className={`appearance-none block w-full border ${errors.teamLeader ? 'border-red' : 'border-gray-300'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} name="teamLeader" type="text" />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <label className="block tracking-wide mb-2">
                                            Email*
                                        </label>
                                        <input onChange={handleInputChange} value={fields.email} className={`appearance-none block w-full border ${errors.email || errorMessage.includes("email") ? 'border-red' : 'border-gray-300'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} name="email" type="text" />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <label className="block tracking-wide mb-2">
                                            Contact No.*
                                        </label>
                                        <input onChange={handleInputChange} value={fields.contactNo} className={`appearance-none block w-full border ${errors.contactNo || errorMessage.includes("contact") ? 'border-red' : 'border-gray-300'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} name="contactNo" type="text" />
                                    </div>
                                </div>
                                {showLogoUpload && (
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block tracking-wide mb-2">
                                                Team Logo
                                            </label>
                                            <input type="file" onChange={handleFileChange} className="mt-2" name="teamLogo" />
                                        </div>
                                    </div>
                                )}
                                <div className="flex flex-wrap -mx-3 mb-6 mt-10">
                                    <div className="w-full px-3">
                                        <button className="shadow focus:shadow-outline focus:outline-none text-white py-4 px-10 rounded-3xl bg-navy" type="submit">
                                            Submit
                                        </button>
                                        <button onClick={handleCancel} className="shadow focus:shadow-outline focus:outline-none text-white py-4 px-10 rounded-3xl bg-navy ml-6" type="button">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                    {success && (
                        <div className="mt-8">
                            <p className="font-bold">Registration successful! Check your email for a confirmation message.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EventRegistration;

