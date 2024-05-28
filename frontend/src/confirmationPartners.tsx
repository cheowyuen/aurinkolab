import emailIcon from './assets/email-verification.png';
import { useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";

const VerifyEmail = () => {
    const {t} =useTranslation()
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
                    {t('confirmation-partners-paragraph-1')}   
                    </p>
                    <img className="email-icon" src={emailIcon} alt="Email Icon" />
                    <p className="text-base text-center mt-8">
                    {t('confirmation-partners-paragraph-2')}<b>{email}</b>. {t('confirmation-partners-paragraph-3')} 
                    </p>
                    <p className="text-base text-center mt-8">
                        <b>{t('confirmation-partners-paragraph-4')}</b> {t('confirmation-partners-paragraph-5')} 
                    </p>
                </div>
            </div>
        </div>
    );
}

export default VerifyEmail;
