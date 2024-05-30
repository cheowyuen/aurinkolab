import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import Home from '../src/Home';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from "../i18nForTests";
import { NewsProvider } from '../src/utils/NewsContext';
import axios from 'axios';
import { languages } from './../language';


// Define the mock implementation for axios.get
const mockAxiosGet = jest.fn();

// Assign the mock implementation to axios.get
(axios as any).get = mockAxiosGet;

// Mock the resolved value for axios.get
mockAxiosGet.mockResolvedValue({
  data: {
    news: [],
  },
});
/** The component must be wrapped with the i18n module to ensure the jest test
 *  will read a translated component and not just the i18n keys 
 */

const changeLanguageAndRender = async (lang: string) => {
  await act(async () => {
    await i18n.changeLanguage(lang);
    render(
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <NewsProvider>
            <Home />
          </NewsProvider>
        </I18nextProvider>
      </BrowserRouter>
    );
  });
};


describe("Home Component", () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });
/** the loop is necessary to iterate through all of the languages available */
  languages.forEach((lang) => {
    describe(`Home Component in ${lang}`, () => {
      beforeEach(async () => {
        await changeLanguageAndRender(lang);
      });

      test('renders home text:Partners, middle text and hero text correctly', async () => {
        /** Hero */
        /* expect(screen.getByText("AurinkoLab: 20-Hour Hackathon for Engineers")).toBeInTheDocument(); */

        expect(screen.getByTestId("hero-paragraph-2")).toHaveTextContent(i18n.t('hero-paragraph-2'));
        screen.getAllByTestId("middle-text").forEach(element => {
            expect(element).toHaveTextContent(i18n.t('middle-text'));
          });
       

        /** Mission */
        /* expect(screen.getByText("AurinkoLab : Empowering Sustainable Engineering Education")).toBeInTheDocument();
        expect(screen.getByText(/The Sustainable Growth Program drives emission reductions globally/)).toBeInTheDocument();
        expect(screen.getByText(/Empower young individuals with engineering qualifications in hydrogen and solar energy/)).toBeInTheDocument(); */

        /** About */
        expect(screen.getByTestId("AurinkoLab")).toHaveTextContent(i18n.t('AurinkoLab'));
        expect(screen.getByText(/📚/)).toBeInTheDocument();
        expect(screen.getByTestId("AurinkoLab Resource Hub")).toHaveTextContent(i18n.t('AurinkoLab Resource Hub'));
        /* expect(screen.getByText(/Access a diverse range of materials such as diagrams, manuals, and training videos./)).toBeInTheDocument(); */

        expect(screen.getByText(/⏱️/)).toBeInTheDocument();
        expect(screen.getByTestId("20-Hour Engineering Hackathon")).toHaveTextContent(i18n.t('20-Hour Engineering Hackathon'));
        /* expect(screen.getByText(/20-hour education program designed for 15-21 year-olds to create their own electric-solar and hydrogen-driven vehicles./)).toBeInTheDocument(); */
        expect(screen.getByText(/🏆/)).toBeInTheDocument();
        expect(screen.getByTestId("Final Championship")).toHaveTextContent(i18n.t('Final Championship'));
        /* expect(screen.getByText(/The hackathon concludes with a final championship event - Solar Regatta or Racing - where teams showcase their innovative vehicles/)).toBeInTheDocument(); */
        expect(screen.getByText(/🌞 /)).toBeInTheDocument();
        expect(screen.getByTestId("AurinkoLab Engineering Talent Hub")).toHaveTextContent(i18n.t('AurinkoLab Engineering Talent Hub'));

        /** FAQ */
        /* expect(screen.getByText("Frequently Asked Questions ( 'FAQ' )")).toBeInTheDocument();
        expect(screen.getByText(/What are the requirements for hackathon participants?/)).toBeInTheDocument();
        expect(screen.getByText(/💡 No specific requirements; just a willingness to create and innovate./)).toBeInTheDocument();
        expect(screen.getByText(/How should one prepare for a hackathon?/)).toBeInTheDocument();
        expect(screen.getByText(/💡Before delving into the creation of marvelous solar boats/)).toBeInTheDocument();
        expect(screen.getByText(/How to sign up for a hackathon?/)).toBeInTheDocument();
        expect(screen.getByText(/💡Compose an email to info@aurinkolab.fi./)).toBeInTheDocument();
        expect(screen.getByText(/As an education center interested in organizing a hackathon for our students/)).toBeInTheDocument();
        expect(screen.getByText(/💡Here you can find information about Hackathon:/)).toBeInTheDocument();
        expect(screen.getByText(/To become an instructor and enroll in the educational course/)).toBeInTheDocument();
        expect(screen.getByText(/💡The instructor training takes place periodically./)).toBeInTheDocument();
        expect(screen.getByText(/What language will the hackthon be conducted in?/)).toBeInTheDocument();
        expect(screen.getByText(/💡The hackathon will be conducted in English, Finnish, and Swedish languages. /)).toBeInTheDocument();
        expect(screen.getByText(/We are interested in participating as a sponsor. How to connect you?/)).toBeInTheDocument();
        expect(screen.getByText(/Let's schedule a meeting to discuss further./)).toBeInTheDocument(); */

        /** Partners */
        expect(screen.getByTestId("Aurinko Partners")).toHaveTextContent(i18n.t('Aurinko Partners'));

        /** Contact */
        expect(screen.getByTestId("Contacts")).toHaveTextContent(i18n.t('Contacts'));
       
        expect(screen.getByText(/Maria Rohnonen/)).toBeInTheDocument();
        expect(screen.getByText(/358 45 312338/)).toBeInTheDocument();
        expect(screen.getByText(/maria@aurinkolab.fi/)).toBeInTheDocument();
        expect(screen.getByTestId("meeting")).toHaveTextContent(i18n.t('meeting'));

        /** FooterText */
        expect(screen.getByText(/Copyright/)).toBeInTheDocument();
        expect(screen.getByText(/Designed and Maintenance by AurinkoLab/)).toBeInTheDocument();
      });
    });
  });
});
