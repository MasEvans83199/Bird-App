import React from 'react';

const QuizQuestion = ({ question, handleAnswerOptionClick }) => {
  return (
    <div className="quiz-question">
      <h2>{question.question}</h2>
      <img src={question.imageSrc} alt={question.question} />
      <div className="quiz-answer-options">
        {question.options.map((option, index) => (
          <button key={index} onClick={() => handleAnswerOptionClick(option.isCorrect)}>
            {option.answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;