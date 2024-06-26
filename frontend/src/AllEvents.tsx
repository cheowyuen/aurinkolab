import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Event } from "../src/types";
import { getAllEvents } from '../src/services/eventService';
import { useTranslation } from "react-i18next";

const AllEvents = () => {   
    const [events, setEvents] = useState<Event[]>([]);
    const navigate = useNavigate();

    /** get all events */
    useEffect(() => {
        getAllEvents().then(data => {
          setEvents(data);
        })
    }, [])

    /** navigate to event details */
    const handleEventClick = (eventId: number) => {
        navigate(`/events/${eventId}`);
    };

    const {t} =useTranslation()
    
    return (
        <div>
            <div className='events-title' data-testid="events-page-title">
                <p>{t('Events')}</p>
            </div>
            <div id= "ongoing-events" className="text-center title-font text-4xl mt-10" data-testid="ongoing-events"> 
                <p>{t('Ongoing events')}</p>
            </div>
            <div className="flex justify-center p-16 events-page">
                <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-12">
                    {events.filter(e => e.status==="ongoing").map((event, i) => (
                        <div key={i} className="relative w-80 h-60 bg-gray-300 rounded-xl overflow-hidden cursor-pointer event-container" onClick={() => handleEventClick(event.id)}> 
                            <img src={event.image} alt={event.place} className="absolute w-full h-full object-cover opacity-80" /> 
                            <div className="absolute inset-0 bg-black opacity-30 overlay"></div>
                            <div className="absolute inset-0 flex items-center justify-center flex-col text-xl">
                                <p className="text-center text-white italic">{event.name}</p>
                                <p className="text-center text-white">{event.place}</p>
                                <p className="text-center text-white">{event.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="text-center title-font text-4xl mt-10" data-testid="upcoming-events"> 
                <p>{t('Upcoming events')}</p>
            </div>
            <div className="flex justify-center p-16 events-page">
                <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-12">
                    {events.filter(e => e.status==="upcoming").map((event, i) => (
                        <div key={i} className="relative w-80 h-60 bg-gray-300 rounded-xl overflow-hidden cursor-pointer event-container" onClick={() => handleEventClick(event.id)}> 
                            <img src={event.image} alt={event.place} className="absolute w-full h-full object-cover opacity-80" /> 
                            <div className="absolute inset-0 bg-black opacity-30 overlay"></div>
                            <div className="absolute inset-0 flex items-center justify-center flex-col text-xl">
                                <p className="text-center text-white italic">{event.name}</p>
                                <p className="text-center text-white">{event.place}</p>
                                <p className="text-center text-white">{event.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="text-center title-font text-4xl mt-10" data-testid="archive"> 
                <p>{t('Archive')}</p>
            </div>
            <div className="flex justify-center p-16 events-page">
                <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-12">
                    {events.filter(e => e.status==="archive").map((event, i) => (
                        <div key={i} className="relative w-80 h-60 bg-gray-300 rounded-xl overflow-hidden cursor-pointer event-container" onClick={() => handleEventClick(event.id)}> 
                            <img src={event.image} alt={event.place} className="absolute w-full h-full object-cover opacity-80" /> 
                            <div className="absolute inset-0 bg-black opacity-30 overlay"></div>
                            <div className="absolute inset-0 flex items-center justify-center flex-col text-xl">
                                <p className="text-center text-white italic">{event.name}</p>
                                <p className="text-center text-white">{event.place}</p>
                                <p className="text-center text-white">{event.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            </div>
    )
}

export default AllEvents;