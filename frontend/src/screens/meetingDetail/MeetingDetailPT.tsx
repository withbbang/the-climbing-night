/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Header from 'components/header';
import PageTitle from 'components/pageTitle';
import CommonInput from 'components/commonInput';
import GridTable from 'components/gridTable';
import { TypeKeyValueForm } from 'modules/types';
import { GetDegreesType, GetParticipantType } from 'modules/apiTypes';
import styles from './MeetingDetail.module.scss';

function MeetingDetailPT({
  form,
  statuses,
  degreeOptions,
  participants,
  admins,
  climbingAreas,
  members,
  columns,
  onFindAdmins,
  onFindClimbingAreas,
  onFindMembers,
  onSearchAdmins,
  onSearchClimbingAreas,
  onSearchMembers,
  onClickAdminInfo,
  onClickClimbingAreaInfo,
  onClickMemberInfo,
  onAddParticipants,
  onCloseModal,
  onChange,
  onUpdate,
}: MeetingDetailPTProps): React.JSX.Element {
  return (
    <>
      {form.isAdminModalActive === 'Y' && (
        <>
          <div className={styles.background} onClick={onCloseModal} />
          <ul className={styles.modalBody}>
            {admins.map((item) => (
              <li key={item.id} onClick={() => onClickAdminInfo(item)}>
                {item.name}
              </li>
            ))}
          </ul>
        </>
      )}
      {form.isClimbingAreaModalActive === 'Y' && (
        <>
          <div className={styles.background} onClick={onCloseModal} />
          <ul className={styles.modalBody}>
            {climbingAreas.map(({ id, name }) => (
              <li
                key={id}
                onClick={() => onClickClimbingAreaInfo({ id, name })}
              >
                {name}
              </li>
            ))}
          </ul>
        </>
      )}
      {form.isMembersModalActive === 'Y' && (
        <>
          <div className={styles.background} onClick={onCloseModal} />
          <ul className={styles.modalBody}>
            {members.map(({ id, name, level, color }) => (
              <li key={id}>
                <label htmlFor={id}>
                  <input
                    type="checkbox"
                    id={id}
                    value={`${id},${name},${level},${color}`}
                    onChange={(e) => onClickMemberInfo(e)}
                  />
                  {name}
                </label>
              </li>
            ))}
            <button onClick={onAddParticipants}>추가</button>
          </ul>
        </>
      )}
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
                    isSearch
                    searchedName={`${form.searchedAdminName}`}
                    onChange={onChange}
                    onKeyDown={onFindAdmins}
                    onSearch={onSearchAdmins}
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
                    isSearch
                    searchedName={`${form.searchedClimbingAreaName}`}
                    onChange={onChange}
                    onKeyDown={onFindClimbingAreas}
                    onSearch={onSearchClimbingAreas}
                  />
                </div>
                <div className={styles.input}>
                  <CommonInput
                    title="상태"
                    tagType="select"
                    name="meetingStatusFk"
                    value={`${form.meetingStatusFk}`}
                    options={statuses}
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
            <span>참가자 수정</span>
            <div className={styles.inputBox}>
              <div className={styles.inputs}>
                <div className={styles.input}>
                  <CommonInput
                    title="이름"
                    tagType="input"
                    name="memberName"
                    type="text"
                    value={`${form.memberName}`}
                    isSearch
                    onChange={onChange}
                    onKeyDown={onFindMembers}
                    onSearch={onSearchMembers}
                  />
                </div>
                <div className={styles.input}>
                  <CommonInput
                    title="기수"
                    tagType="select"
                    name="degreeFk"
                    value={`${form.degreeFk}`}
                    options={degreeOptions}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
            <div className={styles.btnBox}>
              <button onClick={onSearchMembers}>찾기</button>
            </div>
            <div className={styles.listBox}>
              <GridTable
                columns={columns}
                list={participants.map((participant) => ({
                  ...participant,
                  주최자:
                    form.searchedAdminName === participant.name ? '👑' : '-',
                  이름: participant.name,
                  레벨: `${participant.level}&nbsp<span style="background-color: ${participant.color}; padding: 0 10px;"/>`,
                  취소: '취소',
                }))}
                activeDefaultColDef
              />
            </div>
            <div className={styles.btnBox}>
              <button onClick={onUpdate}>수정</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface MeetingDetailPTProps {
  form: TypeKeyValueForm;
  statuses: any[];
  degreeOptions: GetDegreesType[];
  participants: GetParticipantType[];
  admins: any[];
  climbingAreas: any[];
  members: GetParticipantType[];
  columns: any[];
  onFindAdmins: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFindClimbingAreas: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFindMembers: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearchAdmins: () => void;
  onSearchClimbingAreas: () => void;
  onSearchMembers: () => void;
  onClickAdminInfo: (data: any) => void;
  onClickClimbingAreaInfo: (data: any) => void;
  onClickMemberInfo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddParticipants: () => void;
  onCloseModal: () => void;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => void;
  onUpdate: () => void;
}

export default MeetingDetailPT;
