/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Header from 'components/header';
import styles from './Join.module.scss';

function JoinPT({}: JoinPTProps): React.JSX.Element {
  return (
    <div className={styles.wrap}>
      <Header />
      <h1>Join Page</h1>
    </div>
  );
}

interface JoinPTProps {}

export default JoinPT;
