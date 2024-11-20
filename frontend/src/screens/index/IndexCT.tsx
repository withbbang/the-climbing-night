import React, { useEffect } from 'react';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { CustomWindow } from 'modules/types';
import {
  useGetDataHook,
  usePostDataByConfirmPopupHook,
  usePostDataHook,
} from 'modules/customHooks';
import { ToastError } from 'modules/customErrorClasses';
import { DOMAIN } from 'modules/constants';
import IndexPT from './IndexPT';

function IndexCT({}: IndexCTProps): React.JSX.Element {
  const { useSetActivePostDataByConfirmPopup } = usePostDataByConfirmPopupHook({
    message: 'hello',
    url: '/wlekfj',
    confirmBtnText: 'There',
    cancelBtnText: 'Hello',
    beforeCb: () => console.warn('called beforeCb'),
    successCb: () => console.warn('called successCb'),
    cancelBtnCb: () => console.warn('called cancelBtnCb'),
    failCb: (code?: string, message?: string) => {
      throw new ToastError('toast err');
    },
    errorPopupBtnCb: (code?: string) => console.warn('called errorPopupBtnCb'),
  });

  const { usePostData } = usePostDataHook({
    url: `${DOMAIN}/api/get-member-info/0`,
  });

  const { useGetData } = useGetDataHook({
    url: `${DOMAIN}/api/get-member-info/0`,
  });

  useEffect(() => {
    const customWindow = window as CustomWindow;
    customWindow.goBack = handleGoBack;
    customWindow.onResult = handleOnResult;

    return () => {
      delete customWindow.goBack;
      delete customWindow.onResult;
    };
  }, []);

  const test = (p: string): Promise<string> =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(p);
      }, 500);
    });

  const onClick = () => {
    useSetActivePostDataByConfirmPopup({
      a: 'a',
      b: test('b'),
      c: test('c'),
    });
  };

  const handleGoBack = (data?: any) => {
    console.warn('goBack visit? ', data);
  };

  const handleOnResult = (data?: any) => {
    console.warn('onResult visit?', data);
  };

  return <IndexPT onClick={onClick} />;
}

interface IndexCTProps extends CommonState {}

export default IndexCT;
