/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Header from 'components/header';
import Sidebar from 'components/sidebar';
import { TypeSidebarItem } from 'modules/types';
import Authority from 'components/adminComponents/authority';
import InsertMember from 'components/adminComponents/insertMember';
import UpdateMember from 'components/adminComponents/updateMember';
import Degree from 'components/adminComponents/degree';
import InsertClimbingArea from 'components/adminComponents/insertClimbingArea';
import UpdateClimbingArea from 'components/adminComponents/updateClimbingArea';
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
        {isAdmin === 'Y' ? (
          <>
            <Sidebar sidebarItems={sidebarItems} />
            {selectedSidebar === 'authority' ? (
              <Authority />
            ) : selectedSidebar === 'insert-member' ? (
              <InsertMember />
            ) : selectedSidebar === 'update-memeber' ? (
              <UpdateMember />
            ) : selectedSidebar === 'insert-climbing-area' ? (
              <InsertClimbingArea />
            ) : selectedSidebar === 'update-climbing-area' ? (
              <UpdateClimbingArea />
            ) : selectedSidebar === 'degree' ? (
              <Degree />
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
}

interface AdminPTProps {
  selectedSidebar: string;
  isAdmin: string;
  sidebarItems: TypeSidebarItem[];
}

export default AdminPT;
