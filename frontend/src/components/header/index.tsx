import React from 'react';
import { PropState } from 'middlewares/configureReducer';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { connect } from 'react-redux';
import { Action } from 'redux';
import TCN_LOGO from 'assets/images/TCN_LOGO.svg';
import styles from './Header.module.scss';

function mapStateToProps(state: PropState): CommonState {
  return {
    ...state.common,
  };
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {};
}

function Header(props: any) {
  return (
    <div className={styles.wrap}>
      <div className={styles.innerWrap}>
        <div className={styles.logo}>
          <img src={TCN_LOGO} alt="TCN_LOGO" />
        </div>
        <div className={styles.menus}>
          <div className={styles.menu}>회원 검색</div>
          <div className={styles.menu}>관리자</div>
          <div className={styles.menu}>벙 관리</div>
        </div>
        <div className={styles.auth}>로그인</div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
