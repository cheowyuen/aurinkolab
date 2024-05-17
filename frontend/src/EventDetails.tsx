import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEvent } from '../src/services/eventService';
import { EventDetails as EventDetailsType} from "../src/types";
import { applyEvent } from '../src/services/applyEventService';
import Regatta from './Regatta';
import EventRegistration from './EventRegistration';
import { useAuth } from '../src/utils/useAuth';
//import allEvents from '../src/data/allEvents';

import date_icon from '/src/assets/date-icon.png';
import edu_centre_icon from '/src/assets/education-centre.png';
import place_icon from '/src/assets/location.png';
import vehicle_icon from '/src/assets/boat-icon.png';
import engine_icon from '/src/assets/engine.png';
import tutor_icon from '/src/assets/tutor.png';
import group_icon from '/src/assets/group-icon.png';
//import schedule_icon from '/src/assets/schedule.png';

const EventDetails = () => {
    const { eventId } = useParams(); 
    const [ event, setEvent ] = useState<EventDetailsType>({id: 0, name: "", date: "", education_center: "", place: "", vehicle: "", engine: "", tutor: "", status: "", image: "", event_type: "", max_participants: 0, available_spots: -1});
    const [ confirmation, setConfirmation ] = useState(false);
    const [ registered, setRegistered ] = useState(false);
    const [ success, setSuccess ] = useState(false);
    const [ registration, setRegistration ] = useState(false);
    const [ message, setMessage ] = useState("Registration successful! Check your email for a confirmation message.");
    const [ eventType ] = useState("");
    const [ isVisible, setIsVisible ] = useState(true);
    const regattaRef = useRef<HTMLDivElement>(null);
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

    useEffect(() => {
        const loggedUser = sessionStorage.getItem('userToken');
        if (loggedUser && event.event_type) {
            const user = JSON.parse(loggedUser);
            if ((user.role === "student" && event.event_type === "masterclass") || (user.role === "tutor" && event.event_type === "hackathon")) {
                setIsVisible(false);
            }
        }
    }, [event.event_type]);

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

    const handleRegistrationChange = (value: boolean) => {
        setRegistration(value);
    };

    const handleSubmit = async () => {
        if (event.event_type === "regatta") {
            setRegistration(true);
            setTimeout(() => {  /** Adding a timeout to ensure the component is rendered */
                if (regattaRef.current) {
                    const topPosition = regattaRef.current.getBoundingClientRect().top + window.scrollY - 100;
                    
                    window.scrollTo({
                        top: topPosition,
                        behavior: 'smooth',
                    });
                }
            }, 0);
        } else {
            if (isAuthenticated) {
                setConfirmation(true);
            } else {
                navigate("/login");
                //setEventType(event.event_type);
            } 
        }
    }

    const handleConfirmation = async () => {
        const loggedUserJSON = sessionStorage.getItem('userToken');
        if (loggedUserJSON) {
            try {
                const user = JSON.parse(loggedUserJSON)
                const info = await applyEvent(user.id, user.role, Number(eventId), user.token, Number(event.max_participants));

                if (info.message === "Added to waiting list") {
                    setMessage("Thank you for your interest in the event. Currently, we are at full capacity, but we have added you to our waiting list. We will notify you as soon as a spot becomes available.");
                }

                setSuccess(true);
                setConfirmation(false);
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.message === "It looks like you're already registered for this event. We look forward to your participation.") {
                        setRegistered(true);
                        setConfirmation(false);
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
                    {event.event_type === "hackathon" && (
                        <>
                            <span className="icon-text">
                                <img src={group_icon} alt="Spots" className="icon" />
                                <span className="icon-details"><span className="font-bold">Remaining spots</span>: {event.available_spots}</span>
                            </span><br/><br/>
                        </>
                    )}   
                    {/* <span className="icon-text">
                        <img src={schedule_icon} alt="Schedule" className="icon" />
                        <span className="icon-details"><span className="font-bold">Schedule</span>: </span>
                    </span><br/><br/> */}
                    {!registration && !confirmation && !registered && !success && eventType === "" && event.status === "upcoming" && isVisible && (
                        <button className="button-small" onClick={handleSubmit}>Apply</button> 
                    )}
                    {confirmation && (
                        <div className="navy font-semibold">
                            <p className="mb-5">Please click Confirm to finalize your event registration.</p>
                            <button className="button-event mr-6" onClick={handleConfirmation}>Confirm</button> 
                            <button className="button-event" onClick={handleCancellation}>Cancel</button> 
                        </div>
                    )}
                    {success && (
                        <div className="navy font-semibold">
                            <p>{message}</p>
                        </div>
                    )}
                    {registered && (
                        <div className="navy font-semibold">
                            <p>It looks like you're already registered for this event. We look forward to your participation.</p>
                        </div>
                    )}
                </div>
            </div>
            {registration && (
                <div ref={regattaRef}>
                    <Regatta onRegistrationChange={handleRegistrationChange} eventId={Number(eventId)} />
                </div>
            )}
            {eventType !== "" && (
                <div ref={regattaRef}>
                    <EventRegistration onRegistrationChange={handleRegistrationChange} eventId={Number(eventId)} />
                </div>
            )}
        </div>
    );
}

export default EventDetails;

