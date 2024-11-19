import React, { useEffect } from 'react';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { CustomWindow } from 'modules/types';
import {
  usePostDataByConfirmPopupHook,
  usePostDataHook,
} from 'modules/customHooks';
import { handleParseDataFromJSInterface } from 'modules/utils';
import { ToastError } from 'modules/customErrorClasses';
import LoginPT from './LoginPT';

function LoginCT({}: LoginCTProps): React.JSX.Element {
  useEffect(() => {});

  return <LoginPT />;
}

interface LoginCTProps extends CommonState {}

export default LoginCT;
