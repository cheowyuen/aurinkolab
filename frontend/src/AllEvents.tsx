import { useNavigate } from 'react-router-dom';

const AllEvents = () => {   
    const navigate = useNavigate();

    const events = [
        {image: '/src/assets/Kerava.jpg', name: "Visit to Keravan Energia's Solar Plant", place: "Kerava, Finand", date: "04 Apr 2024", eventId: 1, status: "archive"},
        {image: '/src/assets/Aalto.jpeg', name: "Engineering Hackathon-1", place: "Espoo, Finland", date: "Apr - May 2024", eventId: 2, status: "ongoing"},
        {image: '/src/assets/Aalto.jpeg', name: "Engineering Hackathon-2", place: "Espoo, Finland", date: "Apr - May 2024", eventId: 3, status: "ongoing"},
        {image: '/src/assets/Sigulda.png', name: "Engineering Hackathon-3", place: "Sigulda, Latvia", date: "Apr - May 2024", eventId: 4, status: "upcoming"},
        {image: '/src/assets/Helsinki.png', name: "Solar Regatta", place: "Helsinki, Finland", date: "01 Jun 2024", eventId: 5, status: "upcoming"},
        {image: '/src/assets/Aalto.jpeg', name: "Training for Tutors", place: "Espoo, Finland", date: "28 - 29 Aug 2024", eventId: 6, status: "upcoming"},
        {image: '/src/assets/Aalto.jpeg', name: "Engineering Hackathon-4", place: "Espoo, Finland", date: "Sep - Oct 2024", eventId: 7, status: "upcoming"},
        {image: '/src/assets/Aalto.jpeg', name: "Engineering Hackathon-5", place: "Espoo, Finland", date: "Sep - Oct 2024", eventId: 8, status: "upcoming"},
        {image: '/src/assets/Vantaa.jpg', name: "Solar Race", place: "Vantaa, Finland", date: "26 Oct 2024", eventId: 9, status: "upcoming"},
    ]

    const handleEventClick = (eventId: number) => {
        navigate(`/events/${eventId}`);
    };

    return (
        <div>
            <div className='events-title' data-testid="events-page-title">
                <p>Events</p>
            </div>
            <div className="text-center title-font text-4xl mt-10"> 
                <p>Ongoing events</p>
            </div>
            <div className="flex justify-center p-16 events-page">
                <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-12">
                    {events.filter(e => e.status==="ongoing").map((event) => (
                        <div key={event.eventId} className="relative w-80 h-60 bg-gray-300 rounded-xl overflow-hidden cursor-pointer event-container" onClick={() => handleEventClick(event.eventId)}> 
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
            <div className="text-center title-font text-4xl mt-10"> 
                <p>Upcoming events</p>
            </div>
            <div className="flex justify-center p-16 events-page">
                <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-12">
                    {events.filter(e => e.status==="upcoming").map((event) => (
                        <div key={event.eventId} className="relative w-80 h-60 bg-gray-300 rounded-xl overflow-hidden cursor-pointer event-container" onClick={() => handleEventClick(event.eventId)}> 
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
            <div className="text-center title-font text-4xl mt-10"> 
                <p>Archive</p>
            </div>
            <div className="flex justify-center p-16 events-page">
                <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-12">
                    {events.filter(e => e.status==="archive").map((event) => (
                        <div key={event.eventId} className="relative w-80 h-60 bg-gray-300 rounded-xl overflow-hidden cursor-pointer event-container" onClick={() => handleEventClick(event.eventId)}> 
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