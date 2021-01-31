import React from 'react';
import QuizPage from '../../src/components/QuizPage'
import db from '../../db.json';

export default function Quiz() {
  return (
    <QuizPage questionsDB={db}/>
  );
}
