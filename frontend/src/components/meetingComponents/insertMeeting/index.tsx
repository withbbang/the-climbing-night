import React, { useEffect, useState } from 'react';
import { PropState } from 'middlewares/configureReducer';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { useSetSelectedSidebarToken } from 'middlewares/reduxToolkits/sidebar';
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
import styles from './InsertMeeting.module.scss';

function mapStateToProps(state: PropState) {
  return {};
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {
    handleSetSelectedSidebar: (selectedSidebar: string): void =>
      dispatch(useSetSelectedSidebarToken({ selectedSidebar })),
  };
}

function InsertMeeting({}: TypeInsertMeeting) {
  const { form, setForm, useChange } = useChangeHook({
    name: '',
    memberFk: '',
    climbingAreaFk: '',
    hostDt: '',
    time: '',
    criticalMeetingYn: '',
    meetingStatusFk: '',
    isActive: 'N',
    isUpdated: false,
  });

  return (
    <>
      {form.isActive === 'Y' && (
        <>
          <div
            className={styles.background}
            onClick={() =>
              setForm((prevState) => ({
                ...prevState,
                isActive: 'N',
                selectedId: '',
                selectedGrade: '',
              }))
            }
          />
          <div className={styles.modalBody}>
            <button>수정</button>
          </div>
        </>
      )}
      <div className={styles.wrap}>
        <div className={styles.innerWrap}>
          <PageTitle title="벙 추가" />
          <div className={styles.inputBox}>
            <div className={styles.inputs}>
              <div className={styles.input}>
                <CommonInput
                  title="벙 이름"
                  tagType="input"
                  name="name"
                  type="text"
                  value={`${form.name}`}
                  required
                  onChange={useChange}
                />
              </div>
              <div className={styles.input}>
                <CommonInput
                  title="벙 주최자"
                  tagType="input"
                  name="memberFk"
                  type="text"
                  value={`${form.memberFk}`}
                  required
                  onChange={useChange}
                />
              </div>
            </div>
            <div className={styles.inputs}>
              <div className={styles.input}>
                <CommonInput
                  title="암장"
                  tagType="input"
                  name="climbingAreaFk"
                  type="text"
                  value={`${form.climbingAreaFk}`}
                  required
                  onChange={useChange}
                />
              </div>
              <div className={styles.input}>
                <CommonInput
                  title="주최 날짜"
                  tagType="input"
                  name="hostDt"
                  type="date"
                  value={`${form.hostDt}`}
                  required
                  onChange={useChange}
                />
              </div>
            </div>
            <div className={styles.inputs}>
              <div className={styles.input}>
                <CommonInput
                  title="주최 시간"
                  tagType="input"
                  name="time"
                  type="time"
                  value={`${form.time}`}
                  required
                  onChange={useChange}
                />
              </div>
              <div className={styles.input}>
                <CommonInput
                  title="정모 여부"
                  tagType="select"
                  name="criticalMeetingYn"
                  value={`${form.criticalMeetingYn}`}
                  options={[
                    { id: 'N', value: 'N', label: 'X' },
                    { id: 'Y', value: 'Y', label: 'O' },
                  ]}
                  onChange={useChange}
                />
              </div>
            </div>
            <div className={styles.inputs}>
              <div className={styles.input}>
                <CommonInput
                  title="벙 상태"
                  tagType="select"
                  name="meetingStatusFk"
                  value={`${form.meetingStatusFk}`}
                  options={[
                    { id: 'N', value: 'N', label: 'X' },
                    { id: 'Y', value: 'Y', label: 'O' },
                  ]}
                  onChange={useChange}
                />
              </div>
            </div>
          </div>
          <div className={styles.btnBox}>
            <button>확인</button>
          </div>
          <div className={styles.listBox}></div>
        </div>
      </div>
    </>
  );
}

interface TypeInsertMeeting {}

export default connect(mapStateToProps, mapDispatchToProps)(InsertMeeting);
