import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import EventDetails from '../src/EventDetails';
import { MemoryRouter } from 'react-router-dom';
import { getEvent } from '../src/services/eventService';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), 
    useParams: () => ({
        eventId: '1'
    }),
}));

jest.mock('../src/services/eventService', () => ({
    getEvent: jest.fn()
}));

describe("EventDetails Component", () => {
    beforeEach(() => {
        getEvent.mockResolvedValue({
            id: 1, 
            name: "Engineering Hackathon-1", 
            date: "April - May 2024", 
            education_center: "Aurinko Lab",
            place: "Espoo, Finland", 
            vehicle: "Boat",
            engine: "Solar Electric",
            tutor: "Tony",
            status: "ongoing"
        });
        render(
            <MemoryRouter>
                <EventDetails />
            </MemoryRouter>
        );
    });

    test('renders event details correctly', async () => {
        // Await for the async elements to load
        await waitFor(() => {
            expect(screen.getByText("Ongoing Event")).toBeInTheDocument();
        });
        
        expect(screen.getByText("Engineering Hackathon-1")).toBeInTheDocument();
        expect(screen.getByText(/Dates/)).toBeInTheDocument();
        expect(screen.getByText(/April - May 2024/)).toBeInTheDocument();
        expect(screen.getByText(/Education Center/)).toBeInTheDocument();
        expect(screen.getByText(/Aurinko Lab/)).toBeInTheDocument();
        expect(screen.getByText(/Place/)).toBeInTheDocument();
        expect(screen.getByText(/Espoo, Finland/)).toBeInTheDocument();
        expect(screen.getByText(/Vehicle/)).toBeInTheDocument();
        expect(screen.getByText(/Boat/)).toBeInTheDocument();
        expect(screen.getByText(/Solar Electric/)).toBeInTheDocument();
        expect(screen.getByText(/Tutor/)).toBeInTheDocument();
        expect(screen.getByText(/Tony/)).toBeInTheDocument();
    });
});
