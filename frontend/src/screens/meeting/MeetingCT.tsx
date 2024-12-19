import React, { useEffect } from 'react';
import { TypeSidebarItem } from 'modules/types';
import { useGetDataHook } from 'modules/customHooks';
import { DOMAIN } from 'modules/constants';
import MeetingPT from './MeetingPT';

function MeetingCT({ selectedSidebar }: MeetingCTProps): React.JSX.Element {
  const [isManager, setIsManager] = React.useState('N');
  const sidebarItems: TypeSidebarItem[] = [
    { title: '벙 추가', nick: 'insert-meeting' },
    { title: '벙 수정', nick: 'update-meeting' },
  ];

  useEffect(() => {
    useGetCheckAuth();
  }, []);

  // 인가 확인
  const { useGetData: useGetCheckAuth } = useGetDataHook({
    url: `${DOMAIN}/api/meeting-page-check-auth`,
    successCb: ({ isAuth }) => setIsManager(isAuth),
  });

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
