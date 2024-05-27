import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import EntryTest from '../src/EntryTest';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import allQuestions from '../src/data/questions';
import { I18nextProvider } from 'react-i18next';
import i18n from "./../i18nForTests"


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
 
/** The componente must be wrap with the i18n module ensure the jest test will read a tranlated component and not just the i18n keys */
describe("EntryTest Component", () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
            < I18nextProvider i18n={i18n}> 
               <EntryTest/>
               </I18nextProvider>   
            </BrowserRouter>
        );
    });

    test('renders quiz', async () => {
        window.scrollTo = jest.fn();

        const questionsPerPage = 6;
        const totalPages = allQuestions.length / questionsPerPage;

        /** Test page title */
        const title = screen.getByTestId("quiz-page-title");
        expect(title).toHaveTextContent("Quiz");

        /** Test page number */
        const pageNumberElement = screen.getByTestId("quiz-page-number");
        expect(pageNumberElement).toHaveTextContent(`Page 1/${totalPages}`);

        /** Test skipping question */
        const user = userEvent.setup(); 
        const submit_button = screen.getByTestId('submit_button'); 
        await user.click(submit_button)
        
        /** Test notification */
        const notification = screen.getByTestId("notification");
        expect(notification).toHaveTextContent(/Your quiz isn't complete/);

        for (let i = 0; i < questionsPerPage; i++) {
            /** Check question is correctly labeled */
            const question = screen.getByText(`${i+1}. ${allQuestions[i].question}`);
            expect(question).toBeDefined

            allQuestions[i].answers.forEach(answer => {
                /** Check answers are correctly labeled */
                const radioOption = screen.getByRole('radio', { name: new RegExp(answer.answer) });
                expect(radioOption).toBeInTheDocument();
            });
        }
    })

    
})
