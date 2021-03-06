/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';
import db from '../db.json';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    /* New styles */
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    // Deixa branco no começo
    color: ${({ theme }) => { return theme.colors.contrastText; }};
    outline:none;
  }
  html, body {
    min-height: 100vh;
  }
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

const { theme } = db;

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
        <title>App Quiz</title>

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon" />
        <link rel="icon" type="image/png" sizes="32x32" href="/quiz.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/quiz.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
