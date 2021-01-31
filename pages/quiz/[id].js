import React from 'react';
import QuizScreen from '../../src/screens/Quiz'
import { ThemeProvider } from 'styled-components'

export default function QuizDaGaleraPage({ dbExterno }) {
    return (
        <ThemeProvider theme={dbExterno.theme}>
            <QuizScreen externalQuestions={dbExterno} />
        </ThemeProvider>
    )
}

//Sempre que receber uma chamada nessa página, carregar essa endPoint
export async function getServerSideProps(context) {

    const [projectName, gitHubUser] = context.query.id.split('___');
    const dbExterno = await fetch(`https://${projectName}.${gitHubUser}.vercel.app/api/db`)
        .then((resposta) => {
            if (resposta.ok) {
                return resposta.json();
            }

            throw new Error('Falha em pegar os dados');
        })
        .then((respostaConvertida) => respostaConvertida)
        .catch((err) => {
            console.error(err);
        })

    //monta o htlm
    return {
        props: {
            dbExterno,
        }
    };
};