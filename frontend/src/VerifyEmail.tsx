import emailIcon from './assets/email-verification.png';

const VerifyEmail = () => {
    return (
        <div className="flex justify-center items-center min-h-screen page-styling"> 
            <div className="w-full max-w-4xl p-6 bg-white rounded">
                <div className="signup-title">
                    <p className="font-roboto">Aurinko Lab</p>
                </div>   

                <div className="p-5 text-lg page-font-color">
                    <p className="title-font text-base text-center">
                        Great, now verify your email
                    </p>
                    <img src={emailIcon} alt="Email Icon" />
                </div>
            </div>
        </div>
    );
}

export default VerifyEmail;

