/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import QuizPage from '../../components/QuizPage'

export default function QuizGalera({externalQuestions}) {
 
  return (
    <QuizPage questionsDB={externalQuestions}/>
  );
}
