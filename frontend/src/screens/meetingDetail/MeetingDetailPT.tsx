/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Header from 'components/header';
import PageTitle from 'components/pageTitle';
import CommonInput from 'components/commonInput';
import { TypeKeyValueForm } from 'modules/types';
import styles from './MeetingDetail.module.scss';

function MeetingDetailPT({
  form,
  getStatuses,
  onChange,
  onKeyDown,
}: MeetingDetailPTProps): React.JSX.Element {
  return (
    <div className={styles.wrap}>
      <Header />
      <div className={styles.innerWrap}>
        <PageTitle title="벙 상세 수정" />
        <div className={styles.contents}>
          <div className={styles.inputBox}>
            <div className={styles.inputs}>
              <div className={styles.input}>
                <CommonInput
                  title="이름"
                  tagType="input"
                  name="meetingName"
                  type="text"
                  value={`${form.meetingName}`}
                  onChange={onChange}
                />
              </div>
              <div className={styles.input}>
                <CommonInput
                  title="주최자"
                  tagType="input"
                  name="hostName"
                  type="text"
                  value={`${form.hostName}`}
                  onChange={onChange}
                  onKeyDown={onKeyDown}
                />
              </div>
            </div>
            <div className={styles.inputs}>
              <div className={styles.input}>
                <CommonInput
                  title="암장"
                  tagType="input"
                  name="climbingAreaName"
                  type="text"
                  value={`${form.climbingAreaName}`}
                  onChange={onChange}
                />
              </div>
              <div className={styles.input}>
                <CommonInput
                  title="상태"
                  tagType="select"
                  name="meetingStatusFk"
                  value={`${form.meetingStatusFk}`}
                  options={getStatuses}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className={styles.inputs}>
              <div className={styles.input}>
                <CommonInput
                  title="주최 날짜"
                  tagType="input"
                  name="hostDt"
                  type="date"
                  value={`${form.hostDt}`}
                  onChange={onChange}
                />
              </div>
              <div className={styles.input}>
                <CommonInput
                  title="정모 여부"
                  tagType="select"
                  name="criticalMeetingYn"
                  value={`${form.criticalMeetingYn}`}
                  options={[
                    { id: 'criticalMeetingYnN', value: 'N', label: 'X' },
                    { id: 'criticalMeetingYnY', value: 'Y', label: 'O' },
                  ]}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MeetingDetailPTProps {
  form: TypeKeyValueForm;
  getStatuses: any[];
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default MeetingDetailPT;
