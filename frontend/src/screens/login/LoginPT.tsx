/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Header from 'components/header';
import styles from './Login.module.scss';

function LoginPT({}: LoginPTProps): React.JSX.Element {
  return (
    <div className={styles.wrap}>
      <Header />
      <h1>Login Page</h1>
    </div>
  );
}

interface LoginPTProps {}

export default LoginPT;
