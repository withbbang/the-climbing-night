import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PageTitle.module.scss';

function PageTitle({ title }: TypePageTitle) {
  const navigate = useNavigate();

  return (
    <div className={styles.wrap}>
      <div className={styles.innerWrap}>
        <div className={styles.icon}>
          <div className={styles.top}>&nbsp;&nbsp;</div>
          <div className={styles.bottom}>&nbsp;&nbsp;</div>
        </div>
        <h2 dangerouslySetInnerHTML={{ __html: title || '' }} />
      </div>
    </div>
  );
}

interface TypePageTitle {
  title: string;
}

export default PageTitle;
