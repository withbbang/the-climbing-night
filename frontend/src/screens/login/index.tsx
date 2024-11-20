import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { PropState } from 'middlewares/configureReducer';
import {
  useEnterKeyDownHook,
  useChangeHook,
  usePostDataHook,
} from 'modules/customHooks';
import Header from 'components/header';
import AuthInput from 'components/authInput';
import { AuthState, setAccessToken } from 'middlewares/reduxToolkits/authSlice';
import { DOMAIN } from 'modules/constants';
import { handleCheckEmail } from 'modules/utils';
import styles from './Login.module.scss';

function mapStateToProps(state: PropState): AuthState {
  return { ...state.auth };
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {
    handleLogin: (accessToken: string): void => {
      dispatch(setAccessToken({ accessToken }));
    },
  };
}

function Login({ accessToken, handleLogin }: TypeLogin): React.JSX.Element {
  const navigate = useNavigate();
  const { form, useChange } = useChangeHook({ memberId: '', password: '' });

  useEffect(() => {
    if (accessToken) navigate('/', { replace: true });
  }, []);

  // admin 등록
  const { usePostData: usePostLogin } = usePostDataHook({
    url: `${DOMAIN}/api/login`,
    beforeCb: () => {
      if (!form.memberId) throw new Error('이메일을<br/>입력해주세요.');
      if (!handleCheckEmail(`${form.memberId}`))
        throw new Error('이메일을<br/>확인해주세요.');
      if (!form.password) throw new Error('비밀번호를<br/>입력해주세요.');
    },
    successCb: (response) => {
      handleLogin(response);
      navigate('/', { replace: true });
    },
  });

  // 이메일, 비밀번호 입력 후 엔터 콜백
  const useEnterKeyDown = useEnterKeyDownHook(form, () => useLogin());

  // 로그인
  const useLogin = () => {
    usePostLogin({
      memberId: form.memberId,
      password: form.password,
    });
  };

  return (
    <div className={styles.wrap}>
      <Header />
      <div className={styles.innerWrap}>
        <h2>로그인</h2>
        <AuthInput
          title={'이메일'}
          label={'memberId'}
          value={form.memberId as string}
          onChange={useChange}
          onKeyDown={useEnterKeyDown}
        />
        <AuthInput
          title={'비밀번호'}
          label={'password'}
          value={form.password as string}
          onChange={useChange}
          onKeyDown={useEnterKeyDown}
        />
        <div className={styles.btns}>
          <button onClick={() => navigate('/join')}>관리자 등록</button>
          <button onClick={() => useLogin()}>로그인</button>
        </div>
      </div>
    </div>
  );
}

interface TypeLogin extends AuthState {
  handleLogin: (accessToken: string) => void;
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
