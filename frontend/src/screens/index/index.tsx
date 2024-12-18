import { connect } from 'react-redux';
import { PropState } from 'middlewares/configureReducer';
import { Action } from '@reduxjs/toolkit';
import {
  SidebarState,
  useSetSelectedSidebarToken,
} from 'middlewares/reduxToolkits/sidebar';
import IndexCT from './IndexCT';

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

export default connect(mapStateToProps, mapDispatchToProps)(IndexCT);
