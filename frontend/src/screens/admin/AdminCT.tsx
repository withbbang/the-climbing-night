import React, { useEffect } from 'react';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { CustomWindow, TypeSidebarItem } from 'modules/types';
import {
  usePostDataByConfirmPopupHook,
  usePostDataHook,
} from 'modules/customHooks';
import { handleParseDataFromJSInterface } from 'modules/utils';
import { ToastError } from 'modules/customErrorClasses';
import AdminPT from './AdminPT';

function AdminCT({
  selectedSidebar,
  handleSetSelectedSidebar,
}: AdminCTProps): React.JSX.Element {
  const [isAdmin, setIsAdmin] = React.useState(true);
  const sidebarItems: TypeSidebarItem[] = [
    { title: '권한 관리', nick: 'authority' },
    { title: '회원 추가', nick: 'insert-member' },
    { title: '회원 수정', nick: 'update-memeber' },
    { title: '암장 추가', nick: 'insert-climbing-area' },
    { title: '암장 수정', nick: 'update-climbing-area' },
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
  handleSetSelectedSidebar: (selectedSidebar: string) => void;
}

export default AdminCT;
