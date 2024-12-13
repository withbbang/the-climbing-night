import { connect } from 'react-redux';
import { PropState } from 'middlewares/configureReducer';
import { Action } from '@reduxjs/toolkit';
import { useSetSelectedSidebarToken } from 'middlewares/reduxToolkits/sidebar';
import MeetingDetailCT from './MeetingDetailCT';

function mapStateToProps(state: PropState) {
  return {};
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {
    handleSetSelectedSidebar: (selectedSidebar: string): void =>
      dispatch(useSetSelectedSidebarToken({ selectedSidebar })),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingDetailCT);
