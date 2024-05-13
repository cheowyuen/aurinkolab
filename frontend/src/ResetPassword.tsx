import { useState, useEffect, useRef } from 'react';
import Notification from '../src/Notification';
import successIcon from './assets/success-icon.png';

const ResetPassword = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [submitCount, setSubmitCount] = useState(0);
    const [emailSent, setEmailSent] = useState(false);

    const [fields, setFields] = useState({
        email: ""
    });

    const [errors, setErrors] = useState({
        email: false
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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setSubmitCount(prevCount => prevCount + 1);

        /** Set error for blank required fields */
        const updatedErrors = {
            email: fields.email.trim() === ""
        };

        setErrors(updatedErrors);

        /** Check for blank required fields */
        const hasError = Object.values(updatedErrors).some(e => e);
        if (hasError) {
            setErrorMessage("Please fill in email.");
            return;
        } else {
            setErrorMessage('');
        }

        try {
            /*const token = await login(
                fields.email, 
                "",
                ""
            );*/

            setEmailSent(true)

            /** If no error was thrown, data was saved successfully */
            console.log(`Reset password email sent`);
        } catch (error) {
            /** Handle any errors that might have occurred during saveQuiz */
            console.error(`Error sending email to reset password`, error);
            if (error instanceof Error) { 
                setErrorMessage("An error occurred during sending reset password email. Please try again."); 
                return;
            } else {
                setErrorMessage("An unexpected error occurred. Please try again."); 
                return;
            }
        }

        /** Reset fields after successful submission */
        setFields({
            email: ""
        });
    };

    return (
        <div className="flex justify-center items-center min-h-screen"> 
            <div className="w-full max-w-xl p-6 bg-white rounded">
                {!emailSent && (
                    <div>
                        <div className="signup-title login-title">
                            <p>Reset Password</p>
                        </div>  
                        <p className="text-center mb-5">to continue to your Aurinko Lab account.</p> 

                        <div className="p-5 text-lg page-font-color">
                            <Notification ref={notificationRef} message={errorMessage} type="login-notification" />

                            <form noValidate className="w-full max-w-xl" onSubmit={handleSubmit}>
                                <div className="mb-10">
                                    <label className="block tracking-wide mb-2">
                                        Email*
                                    </label>
                                    <input onChange={handleInputChange} value={fields.email} className={`appearance-none block w-full border ${errors.email || errorMessage.includes("email") ? 'border-red' : 'border-gray-300'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} name="email" type="email" />
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-10">
                                    <div className="w-full px-3 text-center">
                                        <button className="shadow focus:shadow-outline focus:outline-none text-white py-4 px-12 rounded-3xl bg-lightblue" type="submit">
                                            Send reset password email
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {emailSent && (
                    <div className='text-center'>
                        <img className="success-icon" src={successIcon} alt="Success Icon" />
                        <p className="text-3xl mb-3 font-semibold">Reset password email sent!</p>
                        <p className="text-base">Check your email for a password reset link if your email address is registered with us.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ResetPassword;

