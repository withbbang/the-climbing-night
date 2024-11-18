import React, { useEffect } from 'react';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { CustomWindow } from 'modules/types';
import {
  usePostDataByConfirmPopupHook,
  usePostDataHook,
} from 'modules/customHooks';
import { handleParseDataFromJSInterface } from 'modules/utils';
import { ToastError } from 'modules/customErrorClasses';
import AdminPT from './AdminPT';

function AdminCT({}: AdminCTProps): React.JSX.Element {
  return <AdminPT />;
}

interface AdminCTProps {}

export default AdminCT;
