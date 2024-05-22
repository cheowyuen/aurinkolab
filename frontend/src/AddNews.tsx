import { useState, useEffect, useRef } from 'react';
import Notification from '../src/Notification';
import { applyRegatta } from '../src/services/regattaService';

const AddNews = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [submitCount, setSubmitCount] = useState(0);

    const [fields, setFields] = useState({
        title: "",
        image: "",
        text: ""
    });

    const [errors, setErrors] = useState({
        title: false,
        image: false,
        text: false
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
            title: fields.title.trim() === "",
            image: fields.image.trim() === "",
            text: fields.text.trim() === ""
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
            await applyRegatta(
                1,
                fields.title, 
                fields.image, 
                fields.text, 
                '', 
                ''
            );
        } catch (error) {
            if (error instanceof Error) {
                console.log("An error occurred while adding news.")
                return;
            } else {
                console.log("An unexpected error occurred.");
                return;
            }
        }

        /** Reset fields after successful submission */
        setFields({
            title: "",
            image: "",
            text: ""
        });
    };

    return (
        <div className="flex ml-5 min-h-screen"> 
            <div className="w-full max-w-3xl p-6 bg-white rounded">
                <div className="admin-panel-title pl-5 tracking-widest font-semibold">
                    <p>Add News</p>
                    <hr className="custom-hr" />
                </div>   

                <div className="pl-5 text-base page-font-color">
                    <div>
                        <Notification ref={notificationRef} message={errorMessage} type="admin-panel-notification" />

                        <form noValidate className="w-full max-w-4xl pt-2" onSubmit={handleSubmit}>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label className="block tracking-wide mb-2">
                                        Title*
                                    </label>
                                    <input onChange={handleInputChange} value={fields.title} className={`appearance-none block w-full border ${errors.title ? 'border-red' : 'border-gray-300'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} name="title" type="text" />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label className="block tracking-wide mb-2">
                                        Image*
                                    </label>
                                    <input onChange={handleInputChange} value={fields.image} className={`appearance-none block w-full border ${errors.image ? 'border-red' : 'border-gray-300'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} name="image" type="text" />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label className="block tracking-wide mb-2">
                                        Text*
                                    </label>
                                    <input onChange={handleInputChange} value={fields.text} className={`appearance-none block w-full border ${errors.text ? 'border-red' : 'border-gray-300'} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} name="text" type="text" />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6 mt-10">
                                <div className="w-full px-3">
                                    <button className="dark-gray rounded-2xl p-2 pl-8 pr-8 text-lg tracking-widest inline-block" type="submit">
                                        Add
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddNews;



