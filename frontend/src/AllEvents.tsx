import { useNavigate } from 'react-router-dom';
import event_img from '/src/assets/aalto-design-factory.jpeg';

const AllEvents = () => {   
    const navigate = useNavigate();

    const events = [
        {image: event_img, place: "Espoo", date: "Apr - May 2024", eventId: 1},
        {image: event_img, place: "Espoo", date: "Apr - May 2024", eventId: 2},
        {image: event_img, place: "Sigulda", date: "Apr - May 2024", eventId: 3},
        {image: event_img, place: "Helsinki", date: "01 Jun 2024", eventId: 4},
        {image: event_img, place: "Espoo", date: "28 - 29 Aug 2024", eventId: 5},
        {image: event_img, place: "Espoo", date: "Sep - Oct 2024", eventId: 6},
        {image: event_img, place: "Espoo", date: "Sep - Oct 2024", eventId: 7},
        {image: event_img, place: "Vantaa", date: "26 Oct 2024", eventId: 8},
    ]

    const handleEventClick = (eventId: number) => {
        navigate(`/events/${eventId}`);
    };

    return (
        <div>
            <div className='events-title' data-testid="events-page-title">
                <p>Events</p>
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