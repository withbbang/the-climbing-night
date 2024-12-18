import React, { useEffect } from 'react';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { CustomWindow, TypeSidebarItem } from 'modules/types';
import {
  useGetDataHook,
  usePostDataByConfirmPopupHook,
  usePostDataHook,
} from 'modules/customHooks';
import { encrypt } from 'modules/utils';
import { ToastError } from 'modules/customErrorClasses';
import { DOMAIN } from 'modules/constants';
import IndexPT from './IndexPT';

function IndexCT({ selectedSidebar }: IndexCTProps): React.JSX.Element {
  const sidebarItems: TypeSidebarItem[] = [
    { title: 'Dashboard', nick: 'dashboard' },
    { title: 'Schedule', nick: 'schedule' },
  ];

  useEffect(() => {}, []);

  return (
    <IndexPT selectedSidebar={selectedSidebar} sidebarItems={sidebarItems} />
  );
}

interface IndexCTProps {
  selectedSidebar: string;
}

export default IndexCT;
