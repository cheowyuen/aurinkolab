import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import EntryTest from '../src/EntryTest';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import allQuestions from '../src/data/questions';

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

describe("EntryTest Component", () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <EntryTest />
            </BrowserRouter>
        );
    });

    test('renders and submits quiz', async () => {
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

    test('fails quiz', async () => {
        window.scrollTo = jest.fn();

        const user = userEvent.setup(); 
        const questionsPerPage = 6;
        const totalPages = allQuestions.length / questionsPerPage;

        /** Select answers */
        for (let i = 0; i < totalPages; i++) {
            for (let j = 0; j < questionsPerPage; j++) {
                const answerId = `answer_${allQuestions[j + i * questionsPerPage].answers[0].answerId}`;
                const radioButton = screen.getByTestId(answerId);
                await user.click(radioButton);
            }

            const submitButton = screen.getByTestId('submit_button');
            await user.click(submitButton);

            if (i < totalPages - 1) {
                const next_button = screen.getByTestId('next_button');
                await user.click(next_button);
            }
        }

        /** Go to result page */
        const result_button = screen.getByTestId("result_button");
        await user.click(result_button);

        /** Test quiz result */
        const quiz_result_title = screen.getByText('Quiz Result');
        expect(quiz_result_title).toBeDefined();
        const quiz_result = screen.getByText("Close effort! Let's try again.");
        expect(quiz_result).toBeDefined();
        const score = screen.getByText(/Score:/);
        expect(score).toBeDefined();

        /** Test quiz result button */
        const retakeQuizButton = screen.getByText("Retake Quiz")
        await user.click(retakeQuizButton)
        const title = screen.getByTestId("quiz-page-title");
        expect(title).toHaveTextContent("Quiz");
        const pageNumberElement = screen.getByTestId("quiz-page-number");
        expect(pageNumberElement).toHaveTextContent(`Page 1/${totalPages}`);
    })
})
