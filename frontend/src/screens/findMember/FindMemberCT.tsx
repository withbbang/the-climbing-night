import React, { useEffect } from 'react';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { CustomWindow } from 'modules/types';
import {
  usePostDataByConfirmPopupHook,
  usePostDataHook,
} from 'modules/customHooks';
import { handleParseDataFromJSInterface } from 'modules/utils';
import { ToastError } from 'modules/customErrorClasses';
import FindMemberPT from './FindMemberPT';

function FindMemberCT({}: FindMemberCTProps): React.JSX.Element {
  useEffect(() => {});

  return <FindMemberPT />;
}

interface FindMemberCTProps {}

export default FindMemberCT;
