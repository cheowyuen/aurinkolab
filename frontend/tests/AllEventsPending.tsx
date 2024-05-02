import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AllEvents from '../src/AllEvents';
import { BrowserRouter } from 'react-router-dom';
import event_img from '../src/assets/aalto-design-factory.jpeg';
import userEvent from '@testing-library/user-event';

/** Mock for useNavigate hook */
const mockNavigate = jest.fn();

// Mock the react-router-dom library
jest.mock('react-router-dom', () => {
  const actualNav = jest.requireActual('react-router-dom');
  return {
    ...actualNav,
    useNavigate: () => mockNavigate,
  };
});


describe("AllEvents Component", () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <AllEvents />
            </BrowserRouter>
        );
    });

    test('renders events correctly', async () => {
        const events = [
            {image: event_img, place: "Espoo", date: "Apr - May 2024", eventId: 1},
            {image: event_img, place: "Espoo", date: "Aug - Dec 2024", eventId: 2},
            {image: event_img, place: "Espoo", date: "Jan - Jun 2025", eventId: 3},
            {image: event_img, place: "Espoo", date: "TBA", eventId: 4},
            {image: event_img, place: "Espoo", date: "TBA", eventId: 5},
        ]

        const title = screen.getByTestId("events-page-title");
        expect(title).toHaveTextContent("Events");

        for (let i = 0; i < events.length, i++;) {
            expect(screen.getByText(events[i].place)).toBeInTheDocument();
            expect(screen.getByText(events[i].date)).toBeInTheDocument();
        }
    })

    test('navigates to the event detail page on click', async () => {
        const user = userEvent.setup(); 
        const navigate = require('react-router-dom').useNavigate(); 
    
        const image = screen.getAllByText("Espoo")[0];
        await user.click(image);
        expect(navigate).toHaveBeenCalledWith('/events/1');
      });
})


