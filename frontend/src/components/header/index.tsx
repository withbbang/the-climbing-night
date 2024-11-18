import React from 'react';
import { PropState } from 'middlewares/configureReducer';
import { CommonState } from 'middlewares/reduxToolkits/commonSlice';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleMovePage = (url: string) => {
    navigate(url);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.innerWrap}>
        <div className={styles.logo} onClick={() => handleMovePage('/')}>
          <img src={TCN_LOGO} alt="TCN_LOGO" />
        </div>
        <div className={styles.menus}>
          <div
            className={styles.menu}
            onClick={() => handleMovePage('/find-member')}
          >
            회원 검색
          </div>
          <div className={styles.menu} onClick={() => handleMovePage('/admin')}>
            관리자
          </div>
          <div
            className={styles.menu}
            onClick={() => handleMovePage('/meeting')}
          >
            벙 관리
          </div>
        </div>
        <div className={styles.auth} onClick={() => handleMovePage('/login')}>
          로그인
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
