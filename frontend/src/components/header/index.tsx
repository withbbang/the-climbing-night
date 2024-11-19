import React from 'react';
import { PropState } from 'middlewares/configureReducer';
import { AuthState, setAccessToken } from 'middlewares/reduxToolkits/authSlice';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePostDataHook } from 'modules/customHooks';
import TCN_LOGO from 'assets/images/TCN_LOGO.svg';
import { DOMAIN } from 'modules/constants';
import styles from './Header.module.scss';

function mapStateToProps(state: PropState): AuthState {
  return {
    ...state.auth,
  };
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {
    handleLogout: (): void => {
      dispatch(setAccessToken(''));
    },
  };
}

function Header({ accessToken, handleLogout }: TypeHeader) {
  const navigate = useNavigate();
  const location = useLocation();

  // 로그아웃
  const { usePostData: useLogout } = usePostDataHook({
    url: `${DOMAIN}/api/logout`,
    successCb: () => {
      handleLogout();
      navigate('/', { replace: true });
    },
  });

  // 페이지 이동
  const handleMovePage = (url: string) => {
    if (location.pathname === url) return;
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
        {accessToken ? (
          <div className={styles.auth} onClick={() => useLogout()}>
            로그아웃
          </div>
        ) : (
          <div className={styles.auth} onClick={() => handleMovePage('/login')}>
            로그인
          </div>
        )}
      </div>
    </div>
  );
}

interface TypeHeader extends AuthState {
  handleLogout: () => void;
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
