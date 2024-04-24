import { useState, useRef } from 'react';
import Notification from '../src/Notification';

const Signup = () => {
    const [ message, setMessage ] = useState<string>('');

    const [fields, setFields] = useState({
        firstName: '',
        lastName: ''
    });
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: ''
    });

    const notificationRef = useRef<HTMLDivElement | null>(null); /** Create a ref */
    let error = false;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFields(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitButtonClick = () => {
        error = false;

        if (error) {
            setMessage("Please fill in all required fields.");
        }
        else {
            setMessage('');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen"> 
            <div className="w-full max-w-4xl p-6 bg-white rounded">
                <div className="signup-title">
                    <p>Tutor Registration</p>
                </div>   

                <div className="p-5 text-lg page-font-color">
                    <p className="title-font text-base text-center">
                        Already have an account? <a href="/login" className="lightblue hover:underline">Log in</a>
                    </p>

                    <Notification ref={notificationRef} message={message} />

                    <form className="w-full max-w-4xl pt-10">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block tracking-wide mb-2">
                                    First Name*
                                </label>
                                <input onChange={handleInputChange} className={`appearance-none block w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="first-name" type="text" />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block tracking-wide text mb-2">
                                    Last Name*
                                </label>
                                <input required className={`appearance-none block w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="last-name" type="text" />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block tracking-wide mb-2">
                                    Email*
                                </label>
                                <input required className={`appearance-none block w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="email" type="email" />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block tracking-wide text mb-2">
                                    Contact No.*
                                </label>
                                <input required className={`appearance-none block w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="contact-no" type="text" />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block tracking-wide mb-2">
                                    Password*
                                </label>
                                <input required className={`appearance-none block w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="password" type="password" />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block tracking-wide text mb-2">
                                    Confirm Password*
                                </label>
                                <input required className={`appearance-none block w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="confirm-password" type="password" />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block tracking-wide mb-2">
                                    Education Center*
                                </label>
                                <select required className="block w-full border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="education-center">
                                    <option value="Aurinko Lab">Aurinko Lab</option>
                                    <option value="Aalto University">Aalto University</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block tracking-wide mb-2">
                                    Role*
                                </label>
                                <input required className={`appearance-none block w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="role" type="text" />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block tracking-wide mb-2">
                                    <input type="checkbox" name="display-on-website" value="no" className="mr-3" />
                                    By checking this box, you agree to have your information displayed on the website.
                                </label>
                                <label className="block tracking-wide mb-2">
                                    <input type="checkbox" name="privacy-policy" value="no" className="mr-3" />
                                    By creating an account, you agree to the <a href="" className="underline">Privacy Policy</a>.
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 text-center">
                                <button className="shadow focus:shadow-outline focus:outline-none text-white py-4 px-8 rounded-3xl bg-lightblue" onClick={handleSubmitButtonClick} type="submit">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;

