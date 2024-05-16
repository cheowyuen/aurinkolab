import { useState, useEffect, useRef } from 'react';
import Notification from '../src/Notification';
import { useLocation } from 'react-router-dom';
import { resetPassword } from '../src/services/resetPasswordService';
import successIcon from './assets/success-icon.png';

const ResetPassword = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [submitCount, setSubmitCount] = useState(0);
    const [passwordReset, setPasswordReset] = useState(false);

    const [fields, setFields] = useState({
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({
        password: false
    });

    const notificationRef = useRef<HTMLDivElement | null>(null); /** Create a ref */

    const query = new URLSearchParams(useLocation().search);
    const token = query.get('token');
    const role = query.get('role') || "student";

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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setSubmitCount(prevCount => prevCount + 1);

        /** Set error for blank required fields */
        const updatedErrors = {
            password: fields.password.trim() === ""
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

        if (fields.password !== fields.confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        } else {
            setErrorMessage('');
        }

        try {
            if (token) {
                await resetPassword(token, role, fields.password);
                setPasswordReset(true);
        
                /** If no error was thrown, data was saved successfully */
                console.log(`Password reset`);
            }
            else {
                setErrorMessage('Verification token is missing.');
            }
        } catch (error) {
            /** Handle any errors that might have occurred during saveQuiz */
            console.error(`Error logging in`, error);
            if (error instanceof Error) { 
                setErrorMessage("An error occurred during password reset. Please try again."); 
                return;
            } else {
                setErrorMessage("An unexpected error occurred. Please try again."); 
                return;
            }
        }

        /** Reset fields after successful submission */
        setFields({
            password: "",
            confirmPassword: ""
        });
    };

    return (
        <div className="flex justify-center items-center min-h-screen"> 
            <div className="w-full max-w-xl p-6 bg-white rounded">
                {!passwordReset && (
                    <div>
                        <div className="signup-title login-title">
                            <p>Reset Password</p>
                        </div>   

                        <div className="p-5 text-lg page-font-color">
                            <Notification ref={notificationRef} message={errorMessage} type="login-notification" />

                            <form noValidate className="w-full max-w-xl" onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <label className="block tracking-wide mb-2">
                                        Password*
                                    </label>
                                    <input onChange={handleInputChange} value={fields.password} className={`appearance-none block w-full border ${errors.password || errorMessage.includes("Passwords") ? 'border-red' : 'border-gray-300'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} name="password" type="password" />
                                </div>
                                <div className="mb-8">
                                    <label className="block tracking-wide mb-2">
                                        Confirm Password*
                                    </label>
                                    <input onChange={handleInputChange} value={fields.confirmPassword} className={`appearance-none block w-full border ${errorMessage.includes("Passwords") ? 'border-red' : 'border-gray-300'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} name="confirmPassword" type="password" />
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-10">
                                    <div className="w-full px-3 text-center">
                                        <button className="shadow focus:shadow-outline focus:outline-none text-white py-4 px-12 rounded-3xl bg-lightblue" type="submit">
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {passwordReset && (
                    <div className='text-center'>
                        <img className="success-icon" src={successIcon} alt="Success Icon" />
                        <p className="text-3xl mb-3 font-semibold">Password is reset!</p>
                        <p className="underline"><a href="/login">Click here to login</a></p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ResetPassword;

