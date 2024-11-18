import React, { useEffect } from 'react';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { CustomWindow } from 'modules/types';
import {
  usePostDataByConfirmPopupHook,
  usePostDataHook,
} from 'modules/customHooks';
import { handleParseDataFromJSInterface } from 'modules/utils';
import { ToastError } from 'modules/customErrorClasses';
import JoinPT from './JoinPT';

function JoinCT({}: JoinCTProps): React.JSX.Element {
  return <JoinPT />;
}

interface JoinCTProps {}

export default JoinCT;
