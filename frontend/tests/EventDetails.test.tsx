import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import EventDetails from '../src/EventDetails';
import { BrowserRouter } from 'react-router-dom';

describe("EventDetails Component", () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <EventDetails />
            </BrowserRouter>
        );
    });

    test('renders event details correctly', async () => {
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

        const title = screen.getByTestId("event-details-title");
        expect(title).toHaveTextContent(event.eventName);

        expect(screen.getByText("Dates")).toBeInTheDocument();
        expect(screen.getByText(`: ${event.dates}`)).toBeInTheDocument();
        expect(screen.getByText("Education Centre")).toBeInTheDocument();
        expect(screen.getByText(`: ${event.educationCentre}`)).toBeInTheDocument();
        expect(screen.getByText("Place")).toBeInTheDocument();
        expect(screen.getByText(`: ${event.place}`)).toBeInTheDocument();
        expect(screen.getByText("Vehicle")).toBeInTheDocument();
        expect(screen.getByText(`: ${event.vehicle}`)).toBeInTheDocument();
        expect(screen.getByText("Engine")).toBeInTheDocument();
        expect(screen.getByText(`: ${event.engine}`)).toBeInTheDocument();
        expect(screen.getByText("Schedule")).toBeInTheDocument();
    })
})


