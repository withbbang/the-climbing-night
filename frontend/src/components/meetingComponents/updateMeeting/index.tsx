import React, { useEffect, useState } from 'react';
import { PropState } from 'middlewares/configureReducer';
import { connect } from 'react-redux';
import { Action } from 'redux';
import {
  useChangeHook,
  useEnterKeyDownHook,
  useGetDataHook,
  usePostDataHook,
} from 'modules/customHooks';
import { DOMAIN, GRADE } from 'modules/constants';
import { GetAdminsType, GetDegreesType } from 'modules/apiTypes';
import { decrypt, encrypt } from 'modules/utils';
import PageTitle from 'components/pageTitle';
import CommonInput from 'components/commonInput';
import GridTable from 'components/gridTable';
import { levelCellRenderer } from 'components/gridTable/components';
import { Radio, RadioGroup } from 'components/radio';
import styles from './UpdateMeeting.module.scss';

function mapStateToProps(state: PropState) {
  return {};
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {};
}

function UpdateMeeting({}: TypeUpdateMeeting) {
  return (
    <div className={styles.wrap}>
      <h1>Update Meeting</h1>
    </div>
  );
}

interface TypeUpdateMeeting {}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateMeeting);
