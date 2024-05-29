import '@testing-library/jest-dom';
import { render, screen, waitFor, act } from '@testing-library/react';
import AllEvents from '../src/AllEvents';
import { BrowserRouter } from 'react-router-dom';
import i18n from "../i18nForTests";
import { languages } from './../language';
import { I18nextProvider } from 'react-i18next';

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

/** The component must be wrapped with the i18n module to ensure the jest test
 *  will read a translated component and not just the i18n keys 
 */

const changeLanguageAndRender = async (lang: string) => {
  await i18n.changeLanguage(lang);
  return render(
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
      <AllEvents />
      </I18nextProvider>
    </BrowserRouter>
  );
};
/** the loop is necessary to iterate through all of the languages available */
languages.forEach((lang) => {
  describe(`renders events correctly in: ${lang}`, () => {
    beforeEach(async () => {
      await act(async () => {
        await changeLanguageAndRender(lang);
      });
    });

    test('renders events correctly', async () => {
        const events = await getAllEvents();

      

        let title = screen.getByTestId("events-page-title");
        expect(title).toHaveTextContent(i18n.t('Events'));
        title = screen.getByTestId("ongoing-events");
        expect(title).toHaveTextContent(i18n.t('Ongoing events'));
        title = screen.getByTestId("upcoming-events");
        expect(title).toHaveTextContent(i18n.t('Upcoming events'));
        title = screen.getByTestId("archive");
        expect(title).toHaveTextContent(i18n.t('Archive'));
      

       for (let i = 0; i < events.length; i++) {
        await waitFor(() => {
          expect(screen.getByText(events[i].name)).toBeInTheDocument();
          expect(screen.getByText(events[i].place)).toBeInTheDocument();
          expect(screen.getByText(events[i].date)).toBeInTheDocument();
        });
      }
    })
})
});