import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion'
import { useRouter } from 'next/router';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Link from '../src/components/Link';

// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center
// `;

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width:500px){
    margin:auto;
    padding: 15px
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/quiz?name=${name}`);
  };

  const handleChange = ({ target }) => {
    setName(target.value);
  };

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{duration: 0.5, delay: 0}}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>#React</h1>

          </Widget.Header>
          <Widget.Content>
            <form onSubmit={handleSubmit}>
              <Input value={name} onChange={handleChange} placeholder="Dê o seu nome para jogar" name="nome" />
              <Button type="submit" disabled={name.length === 0}>
                JOGAR {name}
              </Button>
            </form>

          </Widget.Content>
        </Widget>
        <Widget
          as={motion.section}
          transition={{duration: 0.5, delay: 0.3}}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"  >
          <Widget.Content>
            <h1>Quizes da galera</h1>

            <ul>
              {
                db.external.map((link, index) => {
                  const [projectName, gitHubUser] = link
                    .replace(/\//g, '')
                    .replace('https:', '')
                    .replace('.vercel.app', '')
                    .split('.');
                  return (
                    <li key={index}>
                      <Widget.Topic data-quiz={name.length === 0} as={Link} href={`/quiz/${projectName}___${gitHubUser}`}>
                        {`${gitHubUser}/${projectName}`}
                      </Widget.Topic>
                    </li>
                  )
                })
              }

            </ul>
          </Widget.Content>
        </Widget>

        <Footer 
          as={motion.section}
          transition={{duration: 0.5, delay: 0.6}}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"  
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/eulaludmila/appquiz" />
    </QuizBackground>
  );
}
