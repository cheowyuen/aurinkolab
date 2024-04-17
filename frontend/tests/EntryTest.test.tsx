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

        const totalPages = allQuestions.length;

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
        expect(notification).toHaveTextContent("Please select an answer to proceed.");

        /** Select answers */
        for (let i = 0; i < totalPages; i++) {
            /** Check question is correctly labeled */
            const question = screen.getByText(`${i+1}. ${allQuestions[i].question}`);
            expect(question).toBeDefined

            allQuestions[i].answers.forEach(answer => {
                /** Check answers are correctly labeled */
                const radioOption = screen.getByRole('radio', { name: new RegExp(answer.answer) });
                expect(radioOption).toBeInTheDocument();
            });

            const answerId = `answer_${allQuestions[i].answers[0].answerId}`;
            const radioButton = screen.getByTestId(answerId);
            await user.click(radioButton);
            expect(radioButton).toBeChecked(); /** Radio button is checked */
            const submitButton = screen.getByTestId('submit_button');
            await user.click(submitButton);

            allQuestions[i].answers.forEach(answer => {
                /** Check correct answer is labeled after submit */
                const correctAnswerIndicator = screen.queryByTestId(`correct_answer_${answer.answerId}`);
                if (answer.isCorrect) {
                    expect(correctAnswerIndicator).toBeInTheDocument();
                    expect(correctAnswerIndicator).not.toHaveClass('hidden');
                } else {
                    expect(correctAnswerIndicator).toHaveClass('hidden');
                }

                /** Check selected answer is labeled as Your answer after submit, if wrong answer is selected */
                const wrongAnswerIndicator = screen.queryByTestId(`wrong_answer_${answer.answerId}`);
                const answerId = `answer_${answer.answerId}`;
                const radioOption = screen.getByTestId(answerId) as HTMLInputElement;
                if (!answer.isCorrect && radioOption.checked) {
                    expect(wrongAnswerIndicator).toBeInTheDocument();
                    expect(wrongAnswerIndicator).not.toHaveClass('hidden');
                } else {
                    expect(wrongAnswerIndicator).toHaveClass('hidden');
                }
            });

            /** Go to next page */
            if (i < totalPages - 1) {
                const next_button = screen.getByTestId('next_button');
                await user.click(next_button);
                expect(pageNumberElement).toHaveTextContent(`Page ${i+2}/${totalPages}`); 
            }
        }

        const result_button = screen.getByTestId("result_button");
        expect(result_button).toBeDefined;
    })

    test('fails quiz', async () => {
        window.scrollTo = jest.fn();

        const totalPages = allQuestions.length;
        const user = userEvent.setup(); 

        /** Select answers */
        for (let i = 0; i < totalPages; i++) {
            const answerId = `answer_${allQuestions[i].answers[0].answerId}`;
            const radioButton = screen.getByTestId(answerId);
            await user.click(radioButton);
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
        const score = screen.getByText(`Score: 0/${allQuestions.length}`);
        expect(score).toBeDefined();

        /** Test quiz result button */
        const retakeQuizButton = screen.getByText("Retake Quiz")
        await user.click(retakeQuizButton)
        const title = screen.getByTestId("quiz-page-title");
        expect(title).toHaveTextContent("Quiz");
        const pageNumberElement = screen.getByTestId("quiz-page-number");
        expect(pageNumberElement).toHaveTextContent(`Page 1/${totalPages}`);
    })

    test('passes quiz', async () => {
        window.scrollTo = jest.fn();

        const totalPages = allQuestions.length;
        const user = userEvent.setup(); 

        /** Select answers */
        for (let i = 0; i < totalPages; i++) {
            const answerId = `answer_${allQuestions[i].answers[1].answerId}`;
            const radioButton = screen.getByTestId(answerId);
            await user.click(radioButton);
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
        const quiz_result = screen.getByText("Congratulations! You have passed the quiz");
        expect(quiz_result).toBeDefined();
        const score = screen.getByText(`Score: ${allQuestions.length}/${allQuestions.length}`);
        expect(score).toBeDefined();
        const grade = screen.getByText(`Grade: 10.0`);
        expect(grade).toBeDefined();

        /** Test quiz result button */
        const navigate = require('react-router-dom').useNavigate();
    
        const continue_button = screen.getByText("Continue");
        await user.click(continue_button);
        expect(navigate).toHaveBeenCalledWith('/events');
    })
})
