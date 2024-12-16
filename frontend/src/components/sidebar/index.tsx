import React, { useEffect } from 'react';
import { PropState } from 'middlewares/configureReducer';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { useLocation } from 'react-router-dom';
import { TypeSidebarItem } from 'modules/types';
import {
  SidebarState,
  useSetSelectedSidebarToken,
} from 'middlewares/reduxToolkits/sidebar';
import styles from './Sidebar.module.scss';

function mapStateToProps(state: PropState): SidebarState {
  return { ...state.sidebar };
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {
    handleSetSelectedSidebar: (selectedSidebar: string): void => {
      dispatch(useSetSelectedSidebarToken({ selectedSidebar }));
    },
  };
}

function Sidebar({
  selectedSidebar,
  sidebarItems,
  handleSetSelectedSidebar,
}: TypeSidebar) {
  const location = useLocation();

  useEffect(() => {
    if (selectedSidebar === '') {
      if (location.pathname === '/admin') {
        handleSetSelectedSidebar('authority');
        return;
      }

      if (location.pathname === '/meeting') {
        handleSetSelectedSidebar('insert-meeting');
        return;
      }

      if (location.pathname === '/member') {
        handleSetSelectedSidebar('test1');
        return;
      }
    }
  }, []);

  // 사이드바 클릭
  const handleClick = (nick: string) => {
    if (nick === selectedSidebar) return;
    handleSetSelectedSidebar(nick);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.innerWrap}>
        <div className={styles.menus}>
          {sidebarItems.map((item: TypeSidebarItem) => (
            <div
              key={item.nick}
              className={
                item.nick === selectedSidebar
                  ? [styles.menu, styles.selectedMenu].join(' ')
                  : styles.menu
              }
              onClick={() => handleClick(item.nick)}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface TypeSidebar extends SidebarState {
  sidebarItems: TypeSidebarItem[];
  handleSetSelectedSidebar: (selectedSidebar: string) => void;
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
