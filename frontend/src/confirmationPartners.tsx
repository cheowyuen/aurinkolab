import emailIcon from './assets/email-verification.png';
import { useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const VerifyEmail = () => {
    const location = useLocation();
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const { email } = location.state || {};

    useEffect(() => {
        if (!email) {
            /** Set state to trigger redirect */
            setShouldRedirect(true);
          }
    }, [email]);

    if (shouldRedirect) {
        /** Redirect */
        return <Navigate to="/" />;
    }

    return (
        <div className="flex justify-center page-styling-email"> 
            <div className="w-full max-w-xl">
                <div className="signup-title">
                    <p className="font-roboto">Aurinko Lab</p>
                </div>   

                <div className="text-lg page-font-color">
                    <p className="title-font text-2xl text-center mb-8">
                        Great, thansks for resquesting the presentation for partnerships opportunities.
                    </p>
                    <img className="email-icon" src={emailIcon} alt="Email Icon" />
                    <p className="text-base text-center mt-8">
                        We've sent a information to <b>{email}</b>. Please do not hesitate to ask for more information.
                    </p>
                    <p className="text-base text-center mt-8">
                        <b>Can't find the email?</b> It might be in your junk mail.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default VerifyEmail;
