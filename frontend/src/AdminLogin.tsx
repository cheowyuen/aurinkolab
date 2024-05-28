import { useState, useEffect, useRef } from 'react';
import Notification from '../src/Notification';
import { admin_login } from './services/adminLoginService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/utils/useAuth';

const Login = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [submitCount, setSubmitCount] = useState(0);

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
    const { login: userLogin } = useAuth();

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

    /** set value of input box */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target as { name: string, value: string };
        setFields(prev => ({ ...prev, [name]: value }));
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
            /** Save tutor data */
            const user = await admin_login(
                fields.email, 
                fields.password
            );
            
            /** set user as authenticated */
            userLogin(JSON.stringify(user)); 
        } catch (error) {
            /** Handle any errors that might have occurred*/
            console.error(`Error logging in`, error);
            if (error instanceof Error) { 
                if (error.message === 'Invalid username or password') {
                    setErrorMessage("Invalid username or password."); 
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

        navigate('/admin-panel');
    };

    return (
        <div className="flex justify-center items-center min-h-screen"> 
            <div className="w-full max-w-xl p-6 bg-white rounded">
                <div className="signup-title login-title">
                    <p>Admin Log In</p>
                </div>   

                <div className="p-5 text-lg page-font-color">
                    <Notification ref={notificationRef} message={errorMessage} type="login-notification" />

                    <form noValidate className="w-full max-w-xl" onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block tracking-wide mb-2">
                                Username*
                            </label>
                            <input onChange={handleInputChange} value={fields.email} className={`appearance-none block w-full border ${errors.email ? 'border-red' : 'border-gray-300'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} name="email" type="email" />
                        </div>
                        <div className="mb-6">
                            <label className="block tracking-wide mb-2">
                                Password*
                            </label>
                            <input onChange={handleInputChange} value={fields.password} className={`appearance-none block w-full border ${errors.password ? 'border-red' : 'border-gray-300'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} name="password" type="password" />
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-10">
                            <div className="w-full px-3 text-center">
                                <button className="shadow focus:shadow-outline focus:outline-none text-white py-4 px-12 rounded-3xl bg-lightblue" type="submit">
                                    Log in
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;

