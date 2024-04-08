import { useState, useEffect } from 'react'

interface Question {
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

/** List of questions and respective list of answers */
const questionsAnswers: Question[] = [
    {questionId: 1, questionNo: 1, question: 'Which of these is not a renewable energy source?', answers: [{answerId: 1, answer: 'Hydropower', isCorrect: true}, {answerId: 2, answer: 'Coal', isCorrect: false}, {answerId: 3, answer: 'Solar energy', isCorrect: false}, {answerId: 4, answer: 'Windy energy', isCorrect: false}]},
    {questionId: 2, questionNo: 2, question: 'Several solar panels can be wired together to form a ...', answers: [{answerId: 5, answer: 'Solar assemby', isCorrect: false}, {answerId: 6, answer: 'Solar plexus', isCorrect: true}, {answerId: 7, answer: 'Solar array', isCorrect: false}, {answerId: 8, answer: 'Solarium', isCorrect: false}]},
    {questionId: 3, questionNo: 3, question: 'Fast chargers for electric cars run on ...', answers: [{answerId: 9, answer: 'AC power', isCorrect: false}, {answerId: 10, answer: 'BC power', isCorrect: false}, {answerId: 11, answer: 'CC power', isCorrect: true}, {answerId: 12, answer: 'DC power', isCorrect: false}]},
    {questionId: 4, questionNo: 4, question: 'When the phontons in sunlight hit the solar panels, electricity is produced via the ______ effect.', answers: [{answerId: 13, answer: 'Solar assemby', isCorrect: false}, {answerId: 14, answer: 'Solar plexus', isCorrect: false}, {answerId: 15, answer: 'Solar array', isCorrect: false}, {answerId: 16, answer: 'Solarium', isCorrect: true}]},
    {questionId: 5, questionNo: 5, question: 'Which energy source releases the most climate-altering carbon pollution?', answers: [{answerId: 17, answer: 'Oil', isCorrect: false}, {answerId: 18, answer: 'Coal', isCorrect: true}, {answerId: 19, answer: 'Natual Gas', isCorrect: false}, {answerId: 20, answer: 'Solar', isCorrect: true}]}

];

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
    const [ questions, setQuestions ] = useState<Question[][]>([]); /** two dimensional array where nested array consists of questions per page */
    const [ pageIndex, setPageIndex ] = useState<number>(0); /** indicate index of current page */

    /** On page load, set questions of each page */
    useEffect(() => {
        setQuestions(chunkArray(questionsAnswers, 2)); /** Second parameter is to set number of questions per page */
    }, [])

    /** On Next button click, if it's not the last page, go to next page */
    const handleNextButtonClick = () =>{
        if (pageIndex < questions.length - 1) { 
            setPageIndex(prevPageIndex => prevPageIndex + 1);
        }
    };

    /** On Previous button click, if it's not the first page, go to previous page */
    const handlePreviousButtonClick = () => {
        if (pageIndex > 0) { 
            setPageIndex(prevPageIndex => prevPageIndex - 1);
        }
    };   
    
    /** Submit answers */
    const handleSubmitButtonClick = () => {
        console.log('submit');
    };
      
    return (
        <div>
            <div className='page-title'>
                <p>Test</p>
            </div>

            <div className='page-number'>
                <span>Page {pageIndex +1 }/{questions.length}</span> {/* Show page number */}
            </div>

            <div className='questions'>
                {/* Loop through questions of current page */}
                {questions[pageIndex] ? questions[pageIndex].map((question) => (
                    <div key={question.questionId}>
                        <p>{`${question.questionNo}. ${question.question}`}</p>
                        {/* Loop through answers per question */}
                        {question.answers.map((answer) => (
                            <label key={answer.answerId} className='answers'>
                                <input type="radio" name={`question_${question.questionId}`} value={answer.answerId} /> {/* name is to group radio buttons */}
                                {answer.answer}
                            </label>
                        ))}
                        <br/>
                    </div>
                )) : <p>Loading questions...</p>} {/* If data is not populated yet */}
            </div>

            <div className='all-buttons'>
                {pageIndex > 0 && (
                    <button className='buttons' onClick={handlePreviousButtonClick}>Previous</button> 
                )} {/* Show Previous button only if it's not the first page */}
                {pageIndex < (questions.length - 1) && (
                    <button className='buttons' onClick={handleNextButtonClick}>Next</button> 
                )} {/* Show Next button only if it's not the last page */}
                {pageIndex === (questions.length - 1) && (
                    <button className='buttons' onClick={handleSubmitButtonClick}>Submit</button> 
                )} {/* Show Submit button on last page */}
            </div>
        </div>
    );
}

export default EntryTest;