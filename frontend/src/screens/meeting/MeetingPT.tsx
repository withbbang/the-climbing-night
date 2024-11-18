/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Header from 'components/header';
import styles from './Meeting.module.scss';

function MeetingPT({}: MeetingPTProps): React.JSX.Element {
  return (
    <div className={styles.wrap}>
      <Header />
      <h1>Meeting Page</h1>
    </div>
  );
}

interface MeetingPTProps {}

export default MeetingPT;
