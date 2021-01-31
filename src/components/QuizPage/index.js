import React, { useEffect, useState } from 'react';
import Widget from '../Widget';
import QuizBackground from '../QuizBackground';
import QuizLogo from '../QuizLogo';
import QuizContainer from '../QuizContainer';
import AlternativesForm from '../AlternativesForm';
import Button from '../Button';
import BackLinkArrow from '../BackLinkArrow'
import Lottie from 'react-lottie'
import animationData from '../../screens/Quiz/animations/loading.json'
import parabensData from '../../screens/Quiz/animations/parabens.json'

function LoadingScreen() {

  const [animateState, setAnimateState] = useState({
    isStopped: false, isPaused: false
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>
      <Widget.Content style={{ display: 'flex', justifyContent: 'center' }}>
        <Lottie
          options={defaultOptions}
          width="200px"
          height="200px"
          isStopped={animateState.isStopped}
          isPaused={animateState.isPaused} />
      </Widget.Content>
    </Widget>
  )
}

function ResultWidget({ results }) {

  const [animateState, setAnimateState] = useState({
    isStopped: false, isPaused: false
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: parabensData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

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

        <Lottie
          options={defaultOptions}
          width="100%"
          height="200px"
          isStopped={animateState.isStopped}
          isPaused={animateState.isPaused} />
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
        <BackLinkArrow href="/" />
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
              const alternativeId = `altenative_${questionIndex}_${alternativeIndex}`
              //Verificando se é a alternativa correta
              const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
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

export default function QuizPage({ questionsDB }) {

  //Lógica de troca de tela
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  //total de questões
  const totalQuestions = questionsDB.questions.length;
  //início das questões em zero
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  //pergar todas as alternativas da questão
  const question = questionsDB.questions[questionIndex];
  //array de resultados
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
    }, 1 * 5000);
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
    <QuizBackground backgroundImage={questionsDB.bg}>
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
