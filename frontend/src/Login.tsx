import { useState, useEffect, useRef } from 'react';
import Notification from '../src/Notification';
import { login } from './services/loginService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/utils/useAuth';
import { useTranslation } from "react-i18next";

const Login = () => {
    const {t} =useTranslation()
    const [errorMessage, setErrorMessage] = useState("");
    const [submitCount, setSubmitCount] = useState(0);
    const [student, setStudent] = useState(true);
    const [tutor, setTutor] = useState(false);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const [fields, setFields] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        email: false,
        password: false
    });

    const navigate = useNavigate();
    const notificationRef = useRef<HTMLDivElement | null>(null); /** Create a ref */
    const { login: userLogin, isAuthenticated } = useAuth();

    /** scroll to notification */
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

    useEffect(() => {
        if (isAuthenticated) {
            /** Set state to trigger redirect */
            setShouldRedirect(true);
          }
    }, [isAuthenticated]);

    if (shouldRedirect) {
        /** Redirect to events if authenticated */
        navigate('/events');
    }

    /** set value of input box */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target as { name: string, value: string };
        setFields(prev => ({ ...prev, [name]: value }));
    };

    /** set selected radio button as student */
    const studentRadioChange = () => {
        setStudent(true);
        setTutor(false);
    };

    /** set selected radio button as tutor */
    const tutorRadioChange = () => {
        setTutor(true);
        setStudent(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setSubmitCount(prevCount => prevCount + 1);

        /** Set error for blank required fields */
        const updatedErrors = {
            email: fields.email.trim() === "",
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

        try {
            /** verify email and password */
            const user = await login(
                fields.email, 
                fields.password,
                student ? "student" : "tutor"
            );
            
            /** set user as auuthenticated */
            userLogin(JSON.stringify(user));
        } catch (error) {
            /** Handle any errors that might have occurred*/
            console.error(`Error logging in`, error);
            if (error instanceof Error) { 
                if (error.message === 'Invalid email or password') {
                    setErrorMessage("Invalid email or password."); 
                    return;
                } else {
                    setErrorMessage("An error occurred during login. Please try again."); 
                    return;
                }
            } else {
                setErrorMessage("An unexpected error occurred. Please try again."); 
                return;
            }
        }

        /** Reset fields after successful submission */
        setFields({
            email: "",
            password: ""
        });

        setStudent(true);
        setTutor(false);

        /** redirect to events after login */
        navigate('/events');
    };

    return (
        <div className="flex justify-center items-center min-h-screen"> 
            <div className="w-full max-w-xl p-6 bg-white rounded">
                <div className="signup-title login-title">
                    <p>{t('Log in')}</p>
                </div>   

                <div className="p-5 text-lg page-font-color">
                    <Notification ref={notificationRef} message={errorMessage} type="login-notification" />

                    <form noValidate className="w-full max-w-xl" onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block tracking-wide mb-2">
                            {t('Email')}*
                            </label>
                            <input onChange={handleInputChange} value={fields.email} className={`appearance-none block w-full border ${errors.email ? 'border-red' : 'border-gray-300'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} name="email" type="email" />
                        </div>
                        <div className="mb-6">
                            <label className="block tracking-wide mb-2">
                            {t('Password')}*
                            </label>
                            <input onChange={handleInputChange} value={fields.password} className={`appearance-none block w-full border ${errors.password ? 'border-red' : 'border-gray-300'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} name="password" type="password" />
                            <p className='text-sm underline'><a href="/request-reset">Forgot password?</a></p>
                        </div>
                        <label className="block tracking-wide mb-2">
                        {t('Role')} 
                        </label>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <input type="radio" name="student" className="mr-3" checked={student} onChange={studentRadioChange} />
                                {t('Student')}  
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <input type="radio" name="student" className="mr-3" checked={tutor} onChange={tutorRadioChange} />
                                {t('Tutor')}  
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-10">
                            <div className="w-full px-3 text-center">
                                <button className="shadow focus:shadow-outline focus:outline-none text-white py-4 px-12 rounded-3xl bg-lightblue" type="submit">
                                {t('Log in')}  
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="flex flex-wrap -mx-3 mb-10">
                        <p className="title-font text-xl">
                        {t("Don't have an account?")}  
                        </p>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-10">
                        <div className="w-full px-3 text-center">
                            <button onClick={() => {navigate('/signup?role=student')}} className="shadow focus:shadow-outline focus:outline-none text-white py-4 px-12 rounded-3xl bg-gray w-3/4">
                            {t('Student Registration')}   
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-10">
                        <div className="w-full px-3 text-center">
                            <button onClick={() => {navigate('/signup?role=tutor')}} className="shadow focus:shadow-outline focus:outline-none text-white py-4 px-12 rounded-3xl bg-gray w-3/4">
                            {t('Tutor Registration')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

