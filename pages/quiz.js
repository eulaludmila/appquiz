import React, { useEffect } from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import QuizContainer from '../src/components/QuizContainer';
import AlternativesForm from '../src/components/AlternativesForm';
import Button from '../src/components/Button';

function LoadingScreen() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>
      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  )
}

function ResultWidget({ results }) {

  return (
    <Widget>
      <Widget.Header>
        RESULTADO
      </Widget.Header>
      <Widget.Content>

        <p>Você acertou {results.filter(item => item).length} questões</p>

        <ul>
          {
            results.map((result, index) => {
              return (
                <li key={index}>
                  #{index + 1} Resultado: {result == true ? 'Acertou' : 'Errou'}
                </li>
              )
            })
          }
        </ul>
      </Widget.Content>
    </Widget>
  )
}

const QuestionWidget = ({ question, totalQuestions, questionIndex, onSubmit, addResult }) => {

  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const questionId = `question_${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false)
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <h3>Pergunta {questionIndex + 1} de {totalQuestions}</h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <AlternativesForm onSubmit={(e) => {
          e.preventDefault();
          setIsQuestionSubmited(true);

          setTimeout(() => {
            addResult(isCorrect);
            onSubmit();
            setIsQuestionSubmited(false);
            setSelectedAlternative(undefined);
          }, 3 * 1000);
        }}>
          {
            question.alternatives.map((alternative, alternativeIndex) => {
              const alternativeId = `altenative_${alternativeIndex}`
              //Verificando se é a alternativa correta
              const alternativeStatus = isCorrect ? 'SUCCESS': 'ERROR';
              const isSelected = selectedAlternative === alternativeIndex;

              return (
                <Widget.Topic data-selected={isSelected} data-status={isQuestionSubmited && alternativeStatus} key={alternativeId} as="label" htmlFor={alternativeId}>
                  <input style={{ display: 'none' }} id={alternativeId} name={questionId} type="radio" onChange={() => setSelectedAlternative(alternativeIndex)} /> {alternative}
                </Widget.Topic>
              )
            })
          }
          <Button disabled={!hasAlternativeSelected} type="submit">Confirmar</Button>
        </AlternativesForm>

        {isCorrect && isQuestionSubmited && <p>Você Acertou</p>}
        {!isCorrect && isQuestionSubmited && <p>Você Errou</p>}

      </Widget.Content>
    </Widget>
  )
}

const screenStates = {
  LOADING: 'LOADING',
  QUIZ: 'QUIZ',
  RESULT: 'RESULT',
}

export default function QuizPage() {

  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  const [results, setResults] = React.useState([]);

  function addResult(result) {
    setResults([
      ...results,
      result
    ]);
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, [])

  function handleSubmitQuiz() {

    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(questionIndex + 1);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ &&
          <QuestionWidget question={question} totalQuestions={totalQuestions} questionIndex={questionIndex} onSubmit={handleSubmitQuiz} addResult={addResult} />}
        {screenState === screenStates.LOADING && <LoadingScreen />}
        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}
