import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import EntryTest from '../src/EntryTest';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import allQuestions from '../src/data/questions';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18nForTests';


jest.setTimeout(40000); // Set timeout to 40 seconds

const changeLanguageAndRender = async (lang: string) => {
  await i18n.changeLanguage(lang);
  return render(
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <EntryTest  />
      </I18nextProvider>
    </BrowserRouter>
  );
};

describe('EntryTest Component', () => {
  ['en', 'es'].forEach((lang) => {
    test(`checking the questions and answers in: ${lang}`, async () => {
      window.scrollTo = jest.fn();
      await changeLanguageAndRender(lang);

      const questionsPerPage = 6;
      const totalPages = Math.ceil(allQuestions.length / questionsPerPage);

      const title = screen.getByTestId('quiz-page-title');
      expect(title).toHaveTextContent(i18n.t('Quiz'));

      const pageNumberElement = screen.getByTestId('quiz-page-number');
      expect(pageNumberElement).toHaveTextContent(`${i18n.t('Page')} 1/${totalPages}`);

      const questionsOnPage = allQuestions.slice(0, questionsPerPage);
      questionsOnPage.forEach((question) => {
        const questionText = i18n.t(`questions_translation.questionT_${question.questionNo}`);
        const questionElement = screen.getByText((_content, element) => {
          if (!element) return false; // Check if element is null
          const hasText = (element: Element) => element.textContent === `${question.questionNo}. ${questionText}`;
          const elementHasText = hasText(element);
          const childrenDontHaveText = Array.from(element.children).every(child => !hasText(child));
          return elementHasText && childrenDontHaveText;
        });
        expect(questionElement).toBeInTheDocument();

        question.answers.forEach((_answer, index) => {
          const answerText = i18n.t(`answers_translation.questionT_${question.questionNo}answer.answer${index + 1}`);
          const answerElement = screen.getByText((_content, element) => {
            if (!element) return false; // Check if element is null
            const hasText = (element: Element) => element.textContent === answerText;
            const elementHasText = hasText(element);
            const childrenDontHaveText = Array.from(element.children).every(child => !hasText(child));
            return elementHasText && childrenDontHaveText;
          });
          expect(answerElement).toBeInTheDocument();
        });
      });
    });

    test(`Testing buttons next, submit and quiz result in : ${lang}`, async () => {
      window.scrollTo = jest.fn();
      await changeLanguageAndRender(lang);

      const user = userEvent.setup();
      const questionsPerPage = 6;
      const totalPages = Math.ceil(allQuestions.length / questionsPerPage);

      const title = screen.getByTestId('quiz-page-title');
      expect(title).toHaveTextContent(i18n.t('Quiz'));

      for (let i = 0; i < totalPages; i++) {
        const pageNumberElement = screen.getByTestId('quiz-page-number');
        expect(pageNumberElement).toHaveTextContent(`${i18n.t('Page')} ${i + 1}/${totalPages}`);

        const questionsOnPage = allQuestions.slice(i * questionsPerPage, (i + 1) * questionsPerPage);

        for (const question of questionsOnPage) {
          const questionText = i18n.t(`questions_translation.questionT_${question.questionNo}`);
          const questionElement = screen.getByText((_content, element) => {
            if (!element) return false; // Check if element is null
            const hasText = (element: Element) => element.textContent === `${question.questionNo}. ${questionText}`;
            const elementHasText = hasText(element as Element); // Type assertion 
            const childrenDontHaveText = Array.from(element!.children).every(child => !hasText(child));
            return elementHasText && childrenDontHaveText;
          });
          
          expect(questionElement).toBeInTheDocument();

          for (const [index, answer] of question.answers.entries()) {
            const answerText = i18n.t(`answers_translation.questionT_${question.questionNo}answer.answer${index + 1}`);
            const answerElements = screen.getAllByText((_content, element) => {
              if (!element) return false; // Check if element is null
              const hasText = (element: Element) => element.textContent === answerText;
              const elementHasText = hasText(element);
              const childrenDontHaveText = Array.from(element.children).every(child => !hasText(child));
              return elementHasText && childrenDontHaveText;
            });
            

            answerElements.forEach(answerElement => {
              expect(answerElement).toBeInTheDocument();
            });

            const answerId = `answer_${answer.answerId}`;
            const radioButton = screen.getByTestId(answerId);
            expect(radioButton).toBeInTheDocument();
            await user.click(radioButton);
            expect(radioButton).toBeChecked();
          }
        }

        const submitButton = screen.getByTestId('submit_button');
        await user.click(submitButton);

        if (i < totalPages - 1) {
          const nextButton = screen.getByTestId('next_button');
          await user.click(nextButton);
        }
      }

      const resultButton = screen.getByTestId('result_button');
      await user.click(resultButton);

      const score = screen.getByTestId('Score');
      expect(score).toHaveTextContent(i18n.t('Score'));

      const retakeQuizButton = screen.getByTestId("Retake Quiz");
      await user.click(retakeQuizButton);
    });
  });
});
