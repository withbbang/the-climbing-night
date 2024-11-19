import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { PropState } from 'middlewares/configureReducer';
import { useEnterKeyDownHook, useChangeHook } from 'modules/customHooks';
import Header from 'components/header';
import AuthInput from 'components/authInput';
import styles from './Login.module.scss';

function mapStateToProps(state: PropState) {
  return {};
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {};
}

function Login({}: TypeLoginIn): React.JSX.Element {
  const navigate = useNavigate();
  const { form, useChange } = useChangeHook({ email: '', password: '' });
  const useEnterKeyDown = useEnterKeyDownHook(form, () => {});

  return (
    <div className={styles.wrap}>
      <Header />
      <div className={styles.innerWrap}>
        <h2>로그인</h2>
        <AuthInput
          label={'email'}
          value={form.email as string}
          onChange={useChange}
          onKeyDown={useEnterKeyDown}
        />
        <AuthInput
          label={'password'}
          value={form.password as string}
          onChange={useChange}
          onKeyDown={useEnterKeyDown}
        />
        <button>로그인</button>
      </div>
    </div>
  );
}

interface TypeLoginIn {}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
