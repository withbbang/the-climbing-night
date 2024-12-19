import React, { useEffect } from 'react';
import { TypeSidebarItem } from 'modules/types';
import { useGetDataHook } from 'modules/customHooks';
import { DOMAIN } from 'modules/constants';
import AdminPT from './AdminPT';

function AdminCT({ selectedSidebar }: AdminCTProps): React.JSX.Element {
  const [isAdmin, setIsAdmin] = React.useState('N');
  const sidebarItems: TypeSidebarItem[] = [
    { title: '권한 관리', nick: 'authority' },
    { title: '회원 추가', nick: 'insert-member' },
    { title: '회원 수정', nick: 'update-memeber' },
    { title: '암장 추가', nick: 'insert-climbing-area' },
    { title: '암장 수정', nick: 'update-climbing-area' },
    { title: '기수 관리', nick: 'degree' },
  ];

  useEffect(() => {
    useGetCheckAuth();
  }, []);

  // 인가 확인
  const { useGetData: useGetCheckAuth } = useGetDataHook({
    url: `${DOMAIN}/api/admin-page-check-auth`,
    successCb: ({ isAuth }) => setIsAdmin(isAuth),
  });

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
