import '@testing-library/jest-dom';
import { render, screen, waitFor, act } from '@testing-library/react';
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
      
    ]),
  }));

import { getAllEvents } from '../src/services/eventService';

describe("AllEvents Component", () => {
    beforeEach(async () => {
      await act(async () => {
        render(
            <BrowserRouter>
                <AllEvents />
            </BrowserRouter>
        );
      });
    });

    test('renders events correctly', async () => {
        const events = await getAllEvents();

        let title = screen.getByTestId("events-page-title");
        expect(title).toHaveTextContent("Events");
        title = screen.getByTestId("ongoing-events");
        expect(title).toHaveTextContent("Ongoing events");
        /*title = screen.getByTestId("upcoming-events");
        expect(title).toHaveTextContent("Upcoming events");
        title = screen.getByTestId("archive");
        expect(title).toHaveTextContent("Archive");*/
      

       /*for (let i = 0; i < events.length; i++) {
        await waitFor(() => {
          expect(screen.getByText(events[i].name)).toBeInTheDocument();
          expect(screen.getByText(events[i].place)).toBeInTheDocument();
          expect(screen.getByText(events[i].date)).toBeInTheDocument();
        });
      }*/
    })
})