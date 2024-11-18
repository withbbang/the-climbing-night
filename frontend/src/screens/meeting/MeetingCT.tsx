import React, { useEffect } from 'react';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { CustomWindow } from 'modules/types';
import {
  usePostDataByConfirmPopupHook,
  usePostDataHook,
} from 'modules/customHooks';
import { handleParseDataFromJSInterface } from 'modules/utils';
import { ToastError } from 'modules/customErrorClasses';
import MeetingPT from './MeetingPT';

function MeetingCT({}: MeetingCTProps): React.JSX.Element {
  return <MeetingPT />;
}

interface MeetingCTProps {}

export default MeetingCT;
