import React, { useEffect } from 'react';
import { TypeSidebarItem } from 'modules/types';
import MeetingPT from './MeetingPT';

function MeetingCT({ selectedSidebar }: MeetingCTProps): React.JSX.Element {
  const [isManager, setIsManager] = React.useState(true);
  const sidebarItems: TypeSidebarItem[] = [
    { title: '벙 추가', nick: 'insert-meeting' },
    { title: '벙 수정', nick: 'update-meeting' },
  ];

  return (
    <MeetingPT
      selectedSidebar={selectedSidebar}
      isManager={isManager}
      sidebarItems={sidebarItems}
    />
  );
}

interface MeetingCTProps {
  selectedSidebar: string;
}

export default MeetingCT;
