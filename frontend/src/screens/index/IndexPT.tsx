/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Header from 'components/header';
import { TypeSidebarItem } from 'modules/types';
import Sidebar from 'components/sidebar';
import Dashboard from 'components/indexComponenets/dashboard';
import Schedule from 'components/indexComponenets/schedule';
import styles from './Index.module.scss';

function IndexPT({
  selectedSidebar,
  sidebarItems,
}: IndexPTProps): React.JSX.Element {
  return (
    <div className={styles.wrap}>
      <Header />
      <div className={styles.innerWrap}>
        <Sidebar sidebarItems={sidebarItems} />
        {selectedSidebar === 'dashboard' ? (
          <Dashboard />
        ) : selectedSidebar === 'schedule' ? (
          <Schedule />
        ) : null}
      </div>
    </div>
  );
}

interface IndexPTProps {
  selectedSidebar: string;
  sidebarItems: TypeSidebarItem[];
}

export default IndexPT;
