import React, { useEffect } from 'react';
import { PropState } from 'middlewares/configureReducer';
import {
  AuthState,
  useSetAccessToken,
} from 'middlewares/reduxToolkits/authSlice';
import { useSetSelectedSidebarToken } from 'middlewares/reduxToolkits/sidebar';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useGetDataHook,
  usePostDataHook,
  useSetInfoPopupHook,
} from 'modules/customHooks';
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
      dispatch(useSetAccessToken({ accessToken: '' }));
    },
    handleSetSelectedSidebar: (selectedSidebar: string): void => {
      dispatch(useSetSelectedSidebarToken({ selectedSidebar }));
    },
  };
}

function Header({
  accessToken,
  handleLogout,
  handleSetSelectedSidebar,
}: TypeHeader) {
  const useSetInfoPopup = useSetInfoPopupHook();
  const navigate = useNavigate();
  const location = useLocation();

  // 관리자 페이지 권한 검증
  const { useGetData: useAdminPageRedirect } = useGetDataHook({
    url: `${DOMAIN}/api/admin-page-redirect`,
    successCb: (response) => {
      if (response) navigate(response.path);
      else useSetInfoPopup('권한이 없습니다.');
    },
  });

  // 벙관리 페이지 권한 검증
  const { useGetData: useMeetingPageRedirect } = useGetDataHook({
    url: `${DOMAIN}/api/meeting-page-redirect`,
    successCb: (response) => {
      if (response) navigate(response.path);
      else useSetInfoPopup('권한이 없습니다.');
    },
  });

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

    if (url === '/admin') {
      handleSetSelectedSidebar('authority');
      useAdminPageRedirect();
      return;
    }

    if (url === '/meeting') {
      handleSetSelectedSidebar('insert-meeting');
      useMeetingPageRedirect();
      return;
    }

    handleSetSelectedSidebar('');
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
            className={
              location.pathname === '/find-member'
                ? [styles.menu, styles.selectedMenu].join(' ')
                : styles.menu
            }
            onClick={() => handleMovePage('/find-member')}
          >
            회원 검색
          </div>
          <div
            className={
              location.pathname === '/admin'
                ? [styles.menu, styles.selectedMenu].join(' ')
                : styles.menu
            }
            onClick={() => handleMovePage('/admin')}
          >
            관리자
          </div>
          <div
            className={
              location.pathname === '/meeting'
                ? [styles.menu, styles.selectedMenu].join(' ')
                : styles.menu
            }
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
  handleSetSelectedSidebar: (selectedSidebar: string) => void;
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
