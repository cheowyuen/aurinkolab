import emailIcon from './assets/email-verification.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../src/services/verifyEmailService';
import { useState, useEffect } from 'react';

const ConfirmEmail = () => {
    const query = new URLSearchParams(useLocation().search);
    const token = query.get('token');
    const [ isVerified, setIsVerified ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            verifyEmail(token) 
                .then(response => {
                    if (response.message === "Email verification is successful") {
                        setIsVerified(true);
                    } else {
                        setErrorMessage('Unable to verify email. Please try the verification link again or request a new one.');
                    }
                })
                .catch(error => {
                    console.error('Verification error:', error.message);
                    setErrorMessage(error.message);
                });
        } else {
            setErrorMessage('Verification token is missing.');
        }
    }, [token]);

    return (
        
        <div className="flex justify-center page-styling-email"> 
            <div className="w-full max-w-xl">
                <div className="signup-title">
                    <p className="font-roboto">Aurinko Lab</p>
                </div>   

                <div className="text-lg page-font-color">
                    <p className="title-font text-2xl text-center mb-8">
                        {isVerified ? "Email successfully verified!" : errorMessage}
                    </p>
                    <img className="email-icon" src={emailIcon} alt="Email Icon" />
                    <button onClick={() => navigate('/events')} className="shadow focus:shadow-outline focus:outline-none text-white py-4 px-8 rounded-3xl bg-lightblue mt-10">
                        {isVerified ? "Continue" : "Resend Link"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmEmail;

