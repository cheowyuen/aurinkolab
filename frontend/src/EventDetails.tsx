import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import allEvents from '../src/data/allEvents';
import date_icon from '/src/assets/date-icon.png';
import edu_centre_icon from '/src/assets/education-centre.png';
import place_icon from '/src/assets/location.png';
import vehicle_icon from '/src/assets/boat-icon.png';
import engine_icon from '/src/assets/engine.png';
import tutor_icon from '/src/assets/tutor.png';
import schedule_icon from '/src/assets/schedule.png';

export interface Event {
    id: number;
    name: string;
    date: string;
    educationCenter: string;
    place: string;
    vehicle: string;
    engine: string;
    tutor: string;
    schedule: string;
    status: string;
    image: string;
}

function EventDetails() {
    const { eventId } = useParams(); 
    const [ events, setEvents ] = useState<Event[]>([]);
    let title = "Ongoing Event";

    useEffect(() => {
        setEvents(allEvents); 
    }, [])

    const event = events.find(e => e.id === Number(eventId))

    if (!event) {
        return <div>No event found</div>;
    }

    if (event.status === "upcoming") {
        title = "Upcoming Event";
    }
    else if (event.status === "archive") {
        title = "Past Event";
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
                        <span className="icon-details"><span className="font-bold">Education Center</span>: {event.educationCenter}</span>
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
                    <span className="icon-text">
                        <img src={schedule_icon} alt="Schedule" className="icon" />
                        <span className="icon-details"><span className="font-bold">Schedule</span>: </span>
                    </span><br/><br/>
                    {/* <button className="button-small">Apply</button> */}
                </div>
            </div>
        </div>
    );
}

export default EventDetails;

