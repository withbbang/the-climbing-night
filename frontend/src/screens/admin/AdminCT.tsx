import React, { useEffect } from 'react';
import { TypeSidebarItem } from 'modules/types';
import AdminPT from './AdminPT';

function AdminCT({ selectedSidebar }: AdminCTProps): React.JSX.Element {
  const [isAdmin, setIsAdmin] = React.useState(true);
  const sidebarItems: TypeSidebarItem[] = [
    { title: '권한 관리', nick: 'authority' },
    { title: '회원 추가', nick: 'insert-member' },
    { title: '회원 수정', nick: 'update-memeber' },
    { title: '암장 추가', nick: 'insert-climbing-area' },
    { title: '암장 수정', nick: 'update-climbing-area' },
    { title: '기수 관리', nick: 'degree' },
  ];

  useEffect(() => {
    // TODO: 권한 조회
  }, []);

  return (
    <AdminPT
      selectedSidebar={selectedSidebar}
      isAdmin={isAdmin}
      sidebarItems={sidebarItems}
    />
  );
}

interface AdminCTProps {
  selectedSidebar: string;
}

export default AdminCT;
