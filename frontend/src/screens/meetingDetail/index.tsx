import { connect } from 'react-redux';
import { PropState } from 'middlewares/configureReducer';
import { Action } from '@reduxjs/toolkit';
import MeetingDetailCT from './MeetingDetailCT';

function mapStateToProps(state: PropState) {
  return {};
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingDetailCT);
