import '@testing-library/jest-dom';
import { render, screen , fireEvent} from '@testing-library/react';
import Home from '../src/Home';
import { BrowserRouter } from 'react-router-dom';

describe("HeroText Component", () => {
    beforeEach(() => {
        window.scrollTo = jest.fn();
        
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );
    });

    test('renders hero text correctly', async () => {
        /** Hero */
        /* expect(screen.getByText("AurinkoLab: 20-Hour Hackathon for Engineers")).toBeInTheDocument(); */
        expect(screen.getByText("Crafting Electric-Solar or Hydrogen-Powered Multimodal Vehicles")).toBeInTheDocument();
        const elements = screen.getAllByText("AurinkoLab Engineering Hackathon: 20 hours for your own electric-solar or hydrogen-driven vehicles");
        elements.forEach(element => {
            expect(element).toBeInTheDocument();
        });
        /** Mission */
      /*   expect(screen.getByText("AurinkoLab : Empowering Sustainable Engineering Education")).toBeInTheDocument();
        expect(screen.getByText(/The Sustainable Growth Program drives emission reductions globally/)).toBeInTheDocument();
        expect(screen.getByText(/Empower young individuals with engineering qualifications in hydrogen and solar energy/)).toBeInTheDocument(); */
    
        /** About */
        expect(screen.getByText("AurinkoLab :")).toBeInTheDocument();
        expect(screen.getByText(/📚/)).toBeInTheDocument();
        expect(screen.getByText("AurinkoLab Resource Hub")).toBeInTheDocument();
       /*  expect(screen.getByText(/Access a diverse range of materials such as diagrams, manuals, and training videos./)).toBeInTheDocument(); */

        expect(screen.getByText(/⏱️/)).toBeInTheDocument();
        expect(screen.getByText(/20-Hour Engineering Hackathon/)).toBeInTheDocument();
        /* expect(screen.getByText(/20-hour education program designed for 15-21 year-olds to create their own electric-solar and hydrogen-driven vehicles./)).toBeInTheDocument(); */
        expect(screen.getByText(/🏆/)).toBeInTheDocument();
        expect(screen.getByText(/Final Championship/)).toBeInTheDocument();
       /*  expect(screen.getByText(/The hackathon concludes with a final championship event - Solar Regatta or Racing - where teams showcase their innovative vehicles/)).toBeInTheDocument(); */
        expect(screen.getByText(/🌞 /)).toBeInTheDocument();
        expect(screen.getByText(/AurinkoLab Engineering Talent Hub/)).toBeInTheDocument();
    
        /** FAQ */
       /*  expect(screen.getByText("Frequently Asked Questions ( 'FAQ' )")).toBeInTheDocument();
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
        expect(screen.getByText(/Let's schedule a meeting to discuss further./)).toBeInTheDocument();
 */
        /** Partners */
        expect(screen.getByText("Aurinko Partners :")).toBeInTheDocument();

        /** Contact */
        expect(screen.getByText(/Contacts:/)).toBeInTheDocument();
        expect(screen.getByText(/Maria Rohnonen/)).toBeInTheDocument();
        expect(screen.getByText(/358 45 312338/)).toBeInTheDocument();
        expect(screen.getByText(/maria@aurinkolab.fi/)).toBeInTheDocument();
        expect(screen.getByText(/Set up a meeting:/)).toBeInTheDocument();

        /** FooterText */
        expect(screen.getByText(/Copyright/)).toBeInTheDocument();
        expect(screen.getByText(/Designed and Maintenance by AurinkoLab/)).toBeInTheDocument();
    })
})
