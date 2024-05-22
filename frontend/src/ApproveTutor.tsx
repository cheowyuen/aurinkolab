import { useState, useEffect, useRef } from 'react';
import { TutorsPendingApproval } from "./types";
import { getAllTutors } from './services/approveTutorService';
import { approveTutor } from './services/approveTutorService';
import Notification from './Notification';

const ApprroveTutor = () => {
    const [tutors, setTutors] = useState<TutorsPendingApproval[]>([]);
    const [checked, setChecked] = useState<boolean[]>([]);
    const [ids, setIds] = useState<number[]>([]);
    const [message, setMessage] = useState("");
    const notificationRef = useRef<HTMLDivElement | null>(null); /** Create a ref */

    useEffect(() => {
        getAllTutors().then(data => {
          setTutors(data);
        })
    }, [])

    useEffect(() => {
        setChecked(new Array(tutors.length).fill(false));
    }, [tutors]);

    useEffect(() => {
        if (message !== '') { 
            if (notificationRef.current) {
                //const topPosition = notificationRef.current.getBoundingClientRect().top + window.scrollY - 100; /** Subtract 100 pixels to account for the navbar height */
                
                window.scrollTo({
                    top: 10,
                    behavior: 'smooth',
                });
            }
        }
      }, [message]);

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setChecked(new Array(tutors.length).fill(isChecked));
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, position: number) => {
        const id = Number(event.target.value);
        const isChecked = event.target.checked;

        const updatedCheckedState = checked.map((item, index) =>
            index === position ? !item : item
        );
        setChecked(updatedCheckedState);

        if (isChecked) {
            setIds([...ids, Number(id)]);
        } else {
            const updatedIds = ids.filter(item => item !== id)
            setIds(updatedIds)
        }
    };

    const handleSubmit = async (action: string) => {
        try {
            if (ids.length > 0) {
                await approveTutor(ids, action);

                const updatedTutors = await getAllTutors();
                setTutors(updatedTutors);
                setIds([]);
                
                const status = (action === "approve" ? "approved" : "rejected")
                setMessage(`Tutors successfully ${status}`);
                setTimeout(() => {
                    setMessage("");
                }, 2000)
            }
        } catch (error) {
            console.error("Error approving tutor:", error);
        }
    }

    return (
        <div>
            <div className="w-full max-w-4xl p-6 bg-white rounded-xl">
                <div className="mt-30">
                    <button onClick={() => handleSubmit("approve")} type="button" className="rounded-2xl p-2 pl-4 pr-4 tracking-widest inline-block mr-5 dark-gray">Approve Tutor</button>
                    <button onClick={() => handleSubmit("reject")} type="button" className="rounded-2xl p-2 pl-4 pr-4 tracking-widest inline-block dark-gray">Reject Tutor</button>
                </div>   
            </div>

            <Notification ref={notificationRef} message={message} type="tutor-notification" />

            <div className="max-w-6xl ml-5 mt-2 mb-20">
                <div className="flex flex-col">
                    <div className="overflow-x-auto shadow-md sm:rounded-lg">
                        <div className="inline-block min-w-full align-middle">
                            <div className="overflow-hidden ">
                                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                                    <thead className="bg-gray-100 dark:bg-gray-700">
                                        <tr>
                                            <th scope="col" className="p-4">
                                                <div className="flex items-center">
                                                    <input id="checkbox-all" onChange={handleSelectAll} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label className="sr-only">checkbox</label>
                                                </div>
                                            </th>
                                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                Tutor Name
                                            </th>
                                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                Email
                                            </th>
                                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                Contact No.
                                            </th>
                                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                Education Center
                                            </th>
                                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                Role
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                        {tutors.map((tutor, index) => (
                                            <tr key={tutor.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <td className="p-4 w-4">
                                                    <div className="flex items-center">
                                                        <input id={`checkbox-${tutor.id}`} value={tutor.id} checked={checked[index]} onChange={(e) => handleCheckboxChange(e, index)} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label className="sr-only">checkbox</label>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-sm font-medium text-gray-700 whitespace-nowrap dark:text-white">{tutor.tutor_name}</td>
                                                <td className="py-4 px-6 text-sm font-medium text-gray-700 whitespace-nowrap dark:text-white">{tutor.email}</td>
                                                <td className="py-4 px-6 text-sm font-medium text-gray-700 whitespace-nowrap dark:text-white">{tutor.contact_no}</td>
                                                <td className="py-4 px-6 text-sm font-medium text-gray-700 whitespace-nowrap dark:text-white">{tutor.education_center}</td>
                                                <td className="py-4 px-6 text-sm font-medium text-gray-700 whitespace-nowrap dark:text-white">{tutor.role}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default ApprroveTutor;

