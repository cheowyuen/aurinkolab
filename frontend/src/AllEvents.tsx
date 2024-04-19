import { useNavigate } from 'react-router-dom';
import event_img_1 from '/src/assets/Aalto.png';
import event_img_2 from '/src/assets/Sigulda.png';
import event_img_3 from '/src/assets/Helsinki.png';

const AllEvents = () => {   
    const navigate = useNavigate();

    const events = [
        {image: event_img_1, place: "Espoo, Finand", date: "Apr - May 2024", eventId: 1},
        {image: event_img_2, place: "Sigulda, Latvia", date: "May 2024", eventId: 2},
        {image: event_img_3, place: "Helsinki, Finland", date: "1st June 2024", eventId: 3},
        {image: event_img_3, place: "Helsinki, Finland", date: "Aug 2024", eventId: 4},
        {image: event_img_1, place: "Espoo, Finland", date: "Sep 2024", eventId: 5},
        {image: event_img_3, place: "Helsinki, Finland", date: "Sep - Oct 2024", eventId: 6},
    ]

    const handleEventClick = (eventId: number) => {
        navigate(`/events/${eventId}`);
    };

    return (
        <div>
            <div className='events-title' data-testid="events-page-title">
                <p>Upcoming Events</p>
            </div>

            <div className="flex justify-center p-16 events-page">
                <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-12">
                    {events.map((event) => (
                        <div key={event.eventId} className="relative w-80 h-60 bg-gray-300 rounded-xl overflow-hidden cursor-pointer event-container" onClick={() => handleEventClick(event.eventId)}> 
                            <img src={event.image} alt={event.place} className="absolute w-full h-full object-cover opacity-80" /> 
                            <div className="absolute inset-0 bg-black opacity-30 overlay"></div>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
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