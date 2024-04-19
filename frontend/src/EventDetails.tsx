//import { useParams } from 'react-router-dom';
import event_img from '/src/assets/aalto-design-factory.jpeg';
import date_icon from '/src/assets/date-icon.png';
import edu_centre_icon from '/src/assets/education-centre.png';
import place_icon from '/src/assets/location.png';
import vehicle_icon from '/src/assets/boat-icon.png';
import engine_icon from '/src/assets/engine.png';
import schedule_icon from '/src/assets/schedule.png';

function EventDetails() {
    //const { eventId } = useParams(); 
  
    const event = {
        eventId: 1, 
        eventName: "Engineering Hackathon - 1", 
        dates: "April - May 2024", 
        educationCentre: "Aurinko Lab",
        place: "Keran Hallit, Aalto Design Factory", 
        vehicle: "Boat",
        engine: "Solar Electric",
        regatta: "01 June 2024"
    };

    return (
        <div>
            <div className='event-title' data-testid="event-details-title">
                <p>{event.eventName}</p>
            </div>

            <div className="flex flex-wrap md:flex-nowrap">
                <div className="flex-1 event-image-container">
                    <img src={event_img} alt="Vehicle" className="max-w-full h-auto rounded-lg shadow-md vehicle-image" />
                </div>

                <div className="flex-1 text-xl event-text-container">
                    <p className="text-3xl title-font">Event Details</p><br/>
                    <span className="icon-text">
                        <img src={date_icon} alt="Date" className="icon" />
                        <span className="icon-details"><span className="font-bold">Dates</span>: {event.dates}</span>
                    </span><br/><br/>
                    <span className="icon-text">
                        <img src={edu_centre_icon} alt="Education Centre" className="icon" />
                        <span className="icon-details"><span className="font-bold">Education Center</span>: {event.educationCentre}</span>
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
                    <span className="icon-text">
                        <img src={schedule_icon} alt="Schedule" className="icon" />
                        <span className="icon-details"><span className="font-bold">Schedule</span>: </span>
                    </span><br/><br/>
                    <button className="button-small">Apply</button>
                </div>
            </div>
        </div>
    );
}

export default EventDetails;
