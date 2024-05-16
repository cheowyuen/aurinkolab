import emailIcon from './assets/email-verification.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../src/services/verifyEmailService';
import { resendLink } from '../src/services/resendLinkService';
import { useState, useEffect } from 'react';

const ConfirmEmail = () => {
    const query = new URLSearchParams(useLocation().search);
    const token = query.get('token');
    const role = query.get('role') || "student";
    const [ isVerified, setIsVerified ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ showButton, setShowButton ] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            verifyEmail(token, role) 
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
    }, [token, role]);

    const handleResendLink = async () => {
        if (token) {
            await resendLink(token, "", role);
            //alert("Verification link is resent. Please check your email.");
            setShowButton(false);
        }
    }

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
                    {isVerified && (
                        <button onClick={() => navigate('/login')} className="shadow focus:shadow-outline focus:outline-none text-white py-4 px-8 rounded-3xl bg-lightblue mt-10">
                            Continue
                        </button>
                    )}
                    {!isVerified && showButton && (
                        <button onClick={handleResendLink} className="shadow focus:shadow-outline focus:outline-none text-white py-4 px-8 rounded-3xl bg-lightblue mt-10">
                            Resend Link
                        </button>
                    )}
                    {!isVerified && !showButton && (
                        <p className="mt-10">Verification link is sent. Please check your email.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ConfirmEmail;

