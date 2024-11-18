/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Header from 'components/header';
import styles from './Admin.module.scss';

function AdminPT({}: AdminPTProps): React.JSX.Element {
  return (
    <div className={styles.wrap}>
      <Header />
      <h1>Admin Page</h1>
    </div>
  );
}

interface AdminPTProps {}

export default AdminPT;
