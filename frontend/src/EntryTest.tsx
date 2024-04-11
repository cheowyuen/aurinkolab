import { useState, useEffect, useRef } from 'react';
import allQuestions from '../src/data/questions';
import Notification from '../src/Notification';
import popper from '/src/assets/popper.png';
import goodTry from '/src/assets/logo_sun.png';

export interface Question {
    questionId: number;
    questionNo: number;
    question: string;
    answers: Answer[];
}

interface Answer {
    answerId: number;
    answer: string;
    isCorrect: boolean;
} 

/** 
 * Set questions for each page
 * @param {Question[]} array - All questions
 * @param {number} chunkSize - Number of questions per page 
 */
const chunkArray = (array: Question[], chunkSize: number): Question[][] => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
} 

const EntryTest = () => {
    const [ questions, setQuestions ] = useState<Question[][]>([]); /** Two dimensional array where nested array consists of questions per page */
    const [ pageIndex, setPageIndex ] = useState<number>(0); /** Indicate index of current page */
    const [ participantAnswers, setParticipantAnswers ] = useState<Array<{ questionId: number, answerId: number, isCorrect: boolean }>>([]); /** To store participant's answers */
    //const [ skippedQuestions, setSkippedQuestions ] = useState<number[]>([]); /** To store questions skipped by participant */
    const [ message, setMessage ] = useState<string>(''); /** To display message, e.g. when questions are skipped */
    const [ currentButton, setCurrentButton ] = useState<string>('Submit'); 
    const [ quizCompleted, setQuizCompleted] = useState<boolean>(false);
    const [ score, setScore ] = useState(0);
    const [ resultMessage, setResultMessage ] = useState('');

    const notificationRef = useRef<HTMLDivElement | null>(null); /** Create a ref */

    /** On page load, set questions of each page */
    useEffect(() => {
        setQuestions(chunkArray(allQuestions, 1)); /** Second parameter is to set number of questions per page */
    }, [])

    useEffect(() => {
        if (message !== '') { 
            if (notificationRef.current) {
                const topPosition = notificationRef.current.getBoundingClientRect().top + window.scrollY - 100; /** Subtract 100 pixels to account for the navbar height */
                
                window.scrollTo({
                    top: topPosition,
                    behavior: 'smooth',
                });
            }
        }
      }, [message]);

    /** 
     * Save/Update participant's answers
     * @param {number} questionId - Question ID 
     * @param {number} answerId - Answer ID
     * @param {boolean} isCorrect - True indicates correct answer and otherwise
     * */
    const handleAnswerChange = (questionId: number, answerId: number, isCorrect: boolean) => {
        /** Find if an answer for the question already exists */
        const existingAnswerIndex = participantAnswers.findIndex(answer => answer.questionId === questionId);
        
        /** If it exists, update it, otherwise add a new entry */
        if (existingAnswerIndex !== -1) {
            /** Copy existing answers and update the specific answer */
            const updatedAnswers = [...participantAnswers];
            updatedAnswers[existingAnswerIndex] = { questionId, answerId, isCorrect };
            setParticipantAnswers(updatedAnswers);
        } else {
            /** Add a new answer */
            setParticipantAnswers([...participantAnswers, { questionId, answerId, isCorrect}]);
        }
    };

    /** On Next button click, go to next page */
    const handleNextButtonClick = () =>{
        if (pageIndex < questions.length - 1) { 
            setPageIndex(currentPageIndex => currentPageIndex + 1);
            setCurrentButton('Submit');
            setMessage('');

            /** Scroll to the top of the page */
            window.scrollTo({
            top: 0,
            behavior: 'smooth', 
        });
        }
    }; 
    
    /** Submit answers for a specific page */
    const handleSubmitButtonClick = () => {
        /** Create a set of answered question IDs for fast lookup */
        const answeredQuestionIds = new Set(participantAnswers.map(answer => answer.questionId));

        /** Filter questions of current page that haven't been answered */
        const skippedQuestionsNos = questions[pageIndex]
            .filter(question => !answeredQuestionIds.has(question.questionId))
            .map(question => question.questionNo);

        /** Update skipped question IDs */
        if (skippedQuestionsNos.length > 0) {
            /*setSkippedQuestions(skippedQuestionsNos);

            const totalQuestions = skippedQuestionsNos.length === 1? 'one question' : 'a few questions';
            const questionsNos = skippedQuestionsNos.join(', ');
            setMessage(`Your quiz isn't complete, just ${totalQuestions} left: Question no. ${questionsNos}`);*/
            setMessage('Please select an answer to proceed.');
        }
        else {
            //setMessage('Good try!');

            if (pageIndex === questions.length - 1) {
                setCurrentButton('Result');
            } else {
                setCurrentButton('Next');
            }
        }
    };

    /** Final submit for all answers */
    const handleResultButtonClick = () => {
        let localScore = 0;
        for(const answer of participantAnswers ) {
            if (answer.isCorrect === true) {
                localScore += 1;
            }
        }

        setScore(localScore);
        const grade = localScore / allQuestions.length * 10;
        setResultMessage(grade >= 8.7 ? "Congratulations! You have passed the quiz" : "Close effort! Let's try again.");
        setQuizCompleted(true)
    };

    /** Reset all */
    const handleRetakeQuizButtonClick = () => {
        setQuizCompleted(false);
        setPageIndex(0);
        setMessage("");
        //setSkippedQuestions([]);
        setCurrentButton("Submit");
        setParticipantAnswers([]);
        setScore(0);
        setResultMessage('');
    }
      
    return (
        <div>
            <div className='page-title'>
                <p>Quiz</p>
            </div>

            {!quizCompleted ? (
                <>
                    <div className='page-number'>
                        <span>Page {pageIndex +1 }/{questions.length}</span> {/* Show page number */}
                    </div>

                    <Notification ref={notificationRef} message={message} />

                    <div className='questions'>
                        {/* Loop through questions of current page */}
                        {questions[pageIndex] ? questions[pageIndex].map((question) => (
                            <div key={question.questionId} className='individual-question'>
                                <p>{`${question.questionNo}. ${question.question}`} 
                                    {/* <span className={`unanswered-question ${(skippedQuestions.includes(question.questionNo) && currentButton === "Submit") ? '' : 'hidden'}`}> 
                                        {skippedQuestions.includes(question.questionNo) ? 'Unanswered' : '' }
                                    </span> */}
                                </p>
                                {/* Loop through answers per question */}
                                {question.answers.map((answer) => (
                                    <label key={answer.answerId} className='answers'>
                                        <input 
                                            type="radio" 
                                            name={`question_${question.questionId}`} 
                                            value={answer.answerId} 
                                            disabled={currentButton != 'Submit'}
                                            checked={participantAnswers.some(pa => pa.questionId === question.questionId && pa.answerId === answer.answerId)} 
                                            onChange={(e) => handleAnswerChange(question.questionId, parseInt(e.target.value), answer.isCorrect)} 
                                        /> {/* Save/Update answer on change */}
                                        {answer.answer}
                                         {/* Show "Your answer" only if the answer is incorrect and it's selected */}
                                         <span className={`correct-answer ${(!answer.isCorrect 
                                            && participantAnswers.some(pa => pa.questionId === question.questionId && pa.answerId === answer.answerId) 
                                            && currentButton !== "Submit") ? '' : 'hidden'}`}> 
                                            Your answer
                                        </span>
                                        {/* Show which is "Correct answer" if the answer is incorrect */}
                                        <span className={`incorrect-answer ${(answer.isCorrect && currentButton != "Submit") ? '' : 'hidden'}`}> 
                                            {answer.isCorrect ? 'Correct answer' : '' }
                                        </span>
                                    </label>
                                ))}
                                <br/>
                            </div>
                        )) : <p>Loading questions...</p>} {/* If data is not populated yet */}
                    </div>

                    <div className='all-buttons'>
                        {/* {pageIndex > 0 && (
                            <button className='buttons' onClick={handlePreviousButtonClick}>Previous</button> 
                        )} */}
                        {currentButton === 'Submit' && (
                            <button className='buttons' onClick={handleSubmitButtonClick}>Submit</button> 
                        )}
                        {currentButton === 'Next' && (
                            <button className='buttons' onClick={handleNextButtonClick}>Next</button> 
                        )} {/* Show Next button only if it's not the last page */}
                        {currentButton === 'Result' && (
                            <button className='buttons' onClick={handleResultButtonClick}>Result</button> 
                        )} {/* Show Result button on last page */}
                    </div>

                    {/* <iframe src="https://quizlet.com/902790814/test/embed?i=4ew41k&x=1jj1" height="500" width="100%" style={{ border: "0" }}></iframe> */}
                </>
            ) : (
                <div className='page-styling'> {/* Show Quiz Result page after final submit */}
                    <p className='page-heading'>Quiz Result</p>
                    <img src={resultMessage.includes("Congratulations") ? popper : goodTry} alt="Result Logo" />
                    <br/>
                    <p className="result">{resultMessage}</p>
                    <br/> <br/>
                    <p className="result">Score: {score}/{allQuestions.length}</p>
                    {resultMessage.includes("Congratulations") && (
                        <p className="result">Grade: {(score / allQuestions.length * 10).toFixed(1)}</p>
                    )}
                    <br/><br/>
                    {resultMessage.includes("Congratulations") && (
                        <button className="buttons">Continue</button>
                    )}
                    {!resultMessage.includes("Congratulations") && (
                        <button className="buttons" onClick={handleRetakeQuizButtonClick}>Retake Quiz</button>
                    )}
                </div>
            )}
        </div>
    );
}

export default EntryTest;