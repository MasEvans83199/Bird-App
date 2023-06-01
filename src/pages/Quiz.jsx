import React, { useState, useEffect } from 'react';
import { shuffle } from 'lodash';

function Quiz() {
  const [questions, setQuestions] = useState([
    {
      text: 'What is the scientific name for the common house sparrow?',
      options: ['Passer domesticus', 'Accipiter gentilis', 'Sitta carolinensis'],
      answer: 'Passer domesticus',
      image: '/images/sparrow.jpg',
    },
    {
      text: 'What is the largest bird of prey in North America?',
      options: ['Bald Eagle', 'Golden Eagle', 'Peregrine Falcon'],
      answer: 'Golden Eagle',
      image: '/images/eagle.jpg',
    },
    {
      text: 'What bird is known for imitating the sounds it hears, including human speech?',
      options: ['Parrot', 'Crow', 'Mockingbird'],
      answer: 'Parrot',
      image: '/images/parrot.jpg',
    },
    {
      text: 'What is the scientific name for the Golden Eagle?',
      options: [
        'Accipiter gentilis',
        'Alphabet soup',
        'Cepphus grylle',
        'Aquila chrysaetos',
      ],
      answer: 'Aquila chrysaetos',
    }
  ]);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleAnswer = (answer) => {
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionIndex] = answer;
      return updatedAnswers;
    });
  };

  const handleSubmit = () => {
    // calculate score and show popup with score and option to review answers
  };

  useEffect(() => {
    setQuestions((prevQuestions) =>
      shuffle(prevQuestions.map((question) => ({
        ...question,
        options: shuffle(question.options),
      })))
    );
  }, []);

  const currentQuestion = questions[questionIndex];

  return (
    <div>
      <h2>Question {questionIndex + 1} of {questions.length}</h2>
      {currentQuestion.image && (
        <img src={currentQuestion.image} alt="" />
      )}
      <p>{currentQuestion.text}</p>
      <ul>
        {currentQuestion.options.map((option, index) => (
          <li key={index} onClick={() => handleAnswer(option)}>
            {option}
          </li>
        ))}
      </ul>
      <button onClick={() => setQuestionIndex((prevIndex) => prevIndex - 1)}>Back</button>
      <button onClick={() => setQuestionIndex((prevIndex) => prevIndex + 1)}>Next</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Quiz;