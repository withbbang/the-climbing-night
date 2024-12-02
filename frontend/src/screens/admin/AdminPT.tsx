/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Header from 'components/header';
import Sidebar from 'components/sidebar';
import { TypeSidebarItem } from 'modules/types';
import InsertMember from 'components/adminComponents/insertMember';
import Authority from 'components/adminComponents/authority';
import Degree from 'components/adminComponents/degree';
import styles from './Admin.module.scss';

function AdminPT({
  selectedSidebar,
  isAdmin,
  sidebarItems,
}: AdminPTProps): React.JSX.Element {
  return (
    <div className={styles.wrap}>
      <Header />
      <div className={styles.innerWrap}>
        <Sidebar sidebarItems={sidebarItems} />
        {!isAdmin ? null : selectedSidebar === 'authority' ? (
          <Authority />
        ) : selectedSidebar === 'insert-member' ? (
          <InsertMember />
        ) : selectedSidebar === 'update-memeber' ? (
          <InsertMember />
        ) : selectedSidebar === 'insert-climbing-area' ? (
          <InsertMember />
        ) : selectedSidebar === 'update-climbing-area' ? (
          <InsertMember />
        ) : selectedSidebar === 'degree' ? (
          <Degree />
        ) : null}
      </div>
    </div>
  );
}

interface AdminPTProps {
  selectedSidebar: string;
  isAdmin: boolean;
  sidebarItems: TypeSidebarItem[];
}

export default AdminPT;
