import React, { useEffect, useState } from 'react';
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
import { DOMAIN } from 'modules/constants';
import { decrypt, encrypt, handleCheckEmail } from 'modules/utils';
import styles from './MemberDetail.module.scss';

function mapStateToProps(state: PropState) {
  return {};
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {};
}

function MemberDetail({}: TypeMemberDetail): React.JSX.Element {
  return (
    <div className={styles.wrap}>
      <Header />
      <div className={styles.innerWrap}></div>
    </div>
  );
}

interface TypeMemberDetail {}

export default connect(mapStateToProps, mapDispatchToProps)(MemberDetail);
