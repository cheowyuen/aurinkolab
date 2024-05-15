import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEvent } from '../src/services/eventService';
import { EventDetails as EventDetailsType} from "../src/types";
import { useAuth } from '../src/utils/useAuth';
import { applyEvent } from '../src/services/applyEventService';
//import allEvents from '../src/data/allEvents';

import date_icon from '/src/assets/date-icon.png';
import edu_centre_icon from '/src/assets/education-centre.png';
import place_icon from '/src/assets/location.png';
import vehicle_icon from '/src/assets/boat-icon.png';
import engine_icon from '/src/assets/engine.png';
import tutor_icon from '/src/assets/tutor.png';
//import schedule_icon from '/src/assets/schedule.png';

const EventDetails = () => {
    const { eventId } = useParams(); 
    const [ event, setEvent ] = useState<EventDetailsType>({id: 0, name: "", date: "", education_center: "", place: "", vehicle: "", engine: "", tutor: "", status: "", image: ""});
    const [ confirmation, setConfirmation ] = useState(false);
    const [ registered, setRegistered ] = useState(false);
    const [ success, setSuccess ] = useState(false);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    let title = "Ongoing Event";

    useEffect(() => {
        if (eventId) {
            getEvent(eventId).then(data => {
                setEvent(data);
            }).catch(error => {
                console.error('Failed to load event:', error);
            });
        } else {
            console.error('Event ID is undefined');
        }
    }, [eventId])

    //const event = events.find(e => e.id === Number(eventId))

    if (!event) {
        return <div>No event found</div>;
    }

    if (event.status === "upcoming") {
        title = "Upcoming Event";
    }
    else if (event.status === "archive") {
        title = "Past Event";
    }

    const handleSubmit = async () => {
        if (event.name === "Regatta" || event.name === "Race") {
            navigate(`/regatta/${event.id}`);
        } else {
            setConfirmation(true);
        }
    }

    const handleConfirmation = async () => {
        const loggedUserJSON = sessionStorage.getItem('userToken');
        if (loggedUserJSON) {
            try {
                const user = JSON.parse(loggedUserJSON)
                await applyEvent(user.id, user.role, Number(eventId), user.token);
                setSuccess(true);
                setConfirmation(false);
                //alert("Registration successful!");
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.message === "It looks like you're already registered for this event. We look forward to your participation.") {
                        setRegistered(true);
                        setConfirmation(false);
                        //alert(error.message);
                        return;
                    } else {
                        console.log("An error occurred during event registration.")
                        return;
                    }
                } else {
                    console.log("An unexpected error occurred.");
                    return;
                }
            }
        }
    }

    const handleCancellation = () => {
        setConfirmation(false);
    }

    return (
        <div>
            <div className='event-title' data-testid="event-details-title">
                <p>{title}</p>
            </div>

            <div className="flex flex-wrap md:flex-nowrap">
                <div className="flex-1 event-image-container">
                    <img src={event.image} alt="Vehicle" className="max-w-full h-auto rounded-lg shadow-md vehicle-image" />
                </div>

                <div className="flex-1 text-xl event-text-container">
                    <p className="text-3xl title-font">{event.name}</p><br/>
                    <span className="icon-text">
                        <img src={date_icon} alt="Date" className="icon" />
                        <span className="icon-details"><span className="font-bold">Dates</span>: {event.date}</span>
                    </span><br/><br/>
                    <span className="icon-text">
                        <img src={edu_centre_icon} alt="Education Centre" className="icon" />
                        <span className="icon-details"><span className="font-bold">Education Center</span>: {event.education_center}</span>
                    </span><br/><br/>
                    <span className="icon-text">
                        <img src={place_icon} alt="Place" className="icon" />
                        <span className="icon-details"><span className="font-bold">Place</span>: {event.place}</span>
                    </span><br/><br/>
                    <span className="icon-text">
                        <img src={vehicle_icon} alt="Vehicle" className="icon" />
                        <span className="icon-details"><span className="font-bold">Vehicle</span>: {event.vehicle}</span>
                    </span><br/><br/>
                    <span className="icon-text">
                        <img src={engine_icon} alt="Engine" className="icon" />
                        <span className="icon-details"><span className="font-bold">Engine</span>: {event.engine}</span>
                    </span><br/><br/>
                    {event.tutor != "" && (
                        <>
                            <span className="icon-text">
                                <img src={tutor_icon} alt="Tutor" className="icon" />
                                <span className="icon-details"><span className="font-bold">Tutor</span>: {event.tutor}</span>
                            </span><br/><br/>
                        </>
                    )}   
                    {/* <span className="icon-text">
                        <img src={schedule_icon} alt="Schedule" className="icon" />
                        <span className="icon-details"><span className="font-bold">Schedule</span>: </span>
                    </span><br/><br/> */}
                    {!confirmation && !success && !registered && isAuthenticated && event.status === "upcoming" && (
                        <button className="button-small" onClick={handleSubmit}>Apply</button> 
                    )}
                    {confirmation && (
                        <div className="purple font-semibold">
                            <p className="mb-5">Please click Confirm to finalize your event registration.</p>
                            <button className="button-event mr-6" onClick={handleConfirmation}>Confirm</button> 
                            <button className="button-event" onClick={handleCancellation}>Cancel</button> 
                        </div>
                    )}
                    {success && (
                        <div className="purple font-semibold">
                            <p>Registration successful! Check your email for a confirmation message.</p>
                        </div>
                    )}
                    {registered && (
                        <div className="purple font-semibold">
                            <p>It looks like you're already registered for this event. We look forward to your participation.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EventDetails;

