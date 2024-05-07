import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AllEvents from '../src/AllEvents';
import { BrowserRouter } from 'react-router-dom';

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

jest.mock('../src/services/eventService', () => ({
    getAllEvents: jest.fn().mockResolvedValue([
      {name: "Engineering Hackathon-1", place: "Espoo, Finland", date: "Apr - May 2024", status: "ongoing", eventId: 1},
      {name: "Solar Regatta", place: "Helsinki, Finland", date: "01 Jun 2024", status: "upcoming", eventId: 2},
      {name: "Visit to Keravan Energia''s Solar Plant", place: "Kerava, Finland", date: "04 Apr 2024", status: "archive", eventId: 3},
    ]),
  }));

import { getAllEvents } from '../src/services/eventService';

describe("AllEvents Component", () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <AllEvents />
            </BrowserRouter>
        );
    });

    test('renders events correctly', async () => {
        const events = await getAllEvents();

        let title = screen.getByTestId("events-page-title");
        expect(title).toHaveTextContent("Events");
        title = screen.getByTestId("ongoing-events");
        expect(title).toHaveTextContent("Ongoing events");
        title = screen.getByTestId("upcoming-events");
        expect(title).toHaveTextContent("Upcoming events");
        title = screen.getByTestId("archive");
        expect(title).toHaveTextContent("Archive");

        for (let i = 0; i < events.length, i++;) {
            expect(screen.getByText(events[i].name)).toBeInTheDocument();
            expect(screen.getByText(events[i].place)).toBeInTheDocument();
            expect(screen.getByText(events[i].date)).toBeInTheDocument();
        }
    })
})


