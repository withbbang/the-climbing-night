/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Header from 'components/header';
import styles from './FindMember.module.scss';

function FindMemberPT({}: FindMemberPTProps): React.JSX.Element {
  return (
    <div className={styles.wrap}>
      <Header />
      <h1>Find Member Page</h1>
    </div>
  );
}

interface FindMemberPTProps {}

export default FindMemberPT;
