/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Header from 'components/header';
import Sidebar from 'components/sidebar';
import { TypeSidebarItem } from 'modules/types';
import InsertMeeting from 'components/meetingComponents/insertMeeting';
import UpdateMeeting from 'components/meetingComponents/updateMeeting';
import styles from './Meeting.module.scss';

function MeetingPT({
  selectedSidebar,
  isManager,
  sidebarItems,
}: MeetingPTProps): React.JSX.Element {
  return (
    <div className={styles.wrap}>
      <Header />
      <div className={styles.innerWrap}>
        {isManager === 'Y' ? (
          <>
            <Sidebar sidebarItems={sidebarItems} />
            {selectedSidebar === 'insert-meeting' ? (
              <InsertMeeting />
            ) : selectedSidebar === 'update-meeting' ? (
              <UpdateMeeting />
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
}

interface MeetingPTProps {
  selectedSidebar: string;
  isManager: string;
  sidebarItems: TypeSidebarItem[];
}

export default MeetingPT;
