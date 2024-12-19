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
import { DOMAIN } from 'modules/constants';
import { decrypt, encrypt } from 'modules/utils';
import PageTitle from 'components/pageTitle';
import CommonInput from 'components/commonInput';
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

function InsertMeeting({ handleSetSelectedSidebar }: TypeInsertMeeting) {
  const [getStatuses, setGetStatuses] = useState<any[]>([]);
  const [getAdmins, setGetAdmins] = useState<any[]>([]);
  const [getClimbingAreas, setGetClimbingAreas] = useState<any[]>([]);
  const { form, setForm, useChange } = useChangeHook({
    name: '',
    adminName: '',
    searchedAdminName: '',
    adminFk: '',
    memberFk: '',
    climbingAreaName: '',
    searchedClimbingAreaName: '',
    climbingAreaFk: '',
    hostDt: '',
    startTime: '',
    endTime: '',
    criticalMeetingYn: 'N',
    meetingStatusFk: '',
    isAdminModalActive: 'N',
    isClimbingAreaModalActive: 'N',
  });

  useEffect(() => {
    useGetStatuses();
  }, []);

  // 벙 상태 가져오기
  const { useGetData: useGetStatuses } = useGetDataHook({
    url: `${DOMAIN}/api/get-meeting-statuses`,
    successCb: (response) => {
      setGetStatuses(response);
      setForm((prevState) => ({
        ...prevState,
        meetingStatusFk: response[0].id,
      }));
    },
  });

  // 주최자 정보 가져오기
  const { usePostData: usePostAdmins } = usePostDataHook({
    url: `${DOMAIN}/api/get-admins-for-meeting`,
    successCb: (response) => {
      if (response.length === 1) {
        const [{ id, memberFk, name }] = response;

        const decryptedName = decrypt(name) || '';

        setForm((prevState) => ({
          ...prevState,
          adminFk: id,
          memberFk,
          adminName: decryptedName,
          searchedAdminName: decryptedName,
        }));
      } else if (response.length > 1) {
        handleSetAdmins(response);
      }
    },
  });

  // 암장 정보 가져오기
  const { usePostData: usePostClimbingAreas } = usePostDataHook({
    url: `${DOMAIN}/api/get-climbing-areas-for-meeting`,
    successCb: (response) => {
      if (response.length === 1) {
        const [{ id, name }] = response;

        setForm((prevState) => ({
          ...prevState,
          climbingAreaFk: id,
          climbingAreaName: name,
          searchedClimbingAreaName: name,
        }));
      } else if (response.length > 1) {
        handleSetClimbingAreas(response);
      }
    },
  });

  // 암장 정보 가져오기
  const { usePostData: usePostInsertMeeting } = usePostDataHook({
    url: `${DOMAIN}/api/insert-meeting`,
    beforeCb: () => {
      if (!form.name) throw new Error('벙 이름을<br/>입력해주세요.');
      if (!form.adminFk) throw new Error('주최자를<br/>입력해주세요.');
      if (!form.climbingAreaFk) throw new Error('암장을<br/>입력해주세요.');
      if (!form.hostDt) throw new Error('주최 날짜를<br/>입력해주세요.');
      if (!form.startTime) throw new Error('시작 시간을<br/>입력해주세요.');
      if (!form.endTime) throw new Error('종료 시간을<br/>입력해주세요.');
    },
    successCb: () => handleSetSelectedSidebar('update-meeting'),
  });

  // 주최자 정보 조회 콜백
  const handleSetAdmins = (response: Array<any>) => {
    const decryptedAdmins = response.map(({ id, name }) => ({
      id,
      name: decrypt(name),
    }));

    setGetAdmins(decryptedAdmins);
    setForm((prevState) => ({
      ...prevState,
      isAdminModalActive: 'Y',
    }));
  };

  // 암장 정보 조회 콜백
  const handleSetClimbingAreas = (response: Array<any>) => {
    setGetClimbingAreas(response);
    setForm((prevState) => ({
      ...prevState,
      isClimbingAreaModalActive: 'Y',
    }));
  };

  // 주최자 입력 후 엔터 콜백
  const useFindAdmin = useEnterKeyDownHook(form, () =>
    usePostAdmins({ name: encrypt(`${form.adminName}`) }),
  );

  // 암장 입력 후 엔터 콜백
  const useFindClimbingArea = useEnterKeyDownHook(form, () =>
    usePostClimbingAreas({ name: form.climbingAreaName }),
  );

  // 주최자 리스트 클릭 콜백
  const handleClickAdminInfo = (adminInfo: any) => {
    const { id, memberFk, name } = adminInfo;

    setForm((prevState) => ({
      ...prevState,
      adminFk: id,
      memberFk,
      adminName: name,
      searchedAdminName: name,
      isAdminModalActive: 'N',
    }));
    setGetAdmins([]);
  };

  // 암장 리스트 클릭 콜백
  const handleClickClimbingAreaInfo = (climbingAreaInfo: any) => {
    const { id, name } = climbingAreaInfo;

    setForm((prevState) => ({
      ...prevState,
      climbingAreaFk: id,
      climbingAreaName: name,
      searchedClimbingAreaName: name,
      isClimbingAreaModalActive: 'N',
    }));
    setGetAdmins([]);
  };

  // 모달창 끄기
  const handleOffModal = () => {
    setForm((prevState) => ({
      ...prevState,
      isAdminModalActive: 'N',
      isClimbingAreaModalActive: 'N',
    }));
    setGetAdmins([]);
    setGetClimbingAreas([]);
  };

  // 확인 버튼 콜백
  const useInsertMeeting = () =>
    usePostInsertMeeting({
      name: form.name,
      adminFk: form.adminFk,
      memberFk: form.memberFk,
      climbingAreaFk: form.climbingAreaFk,
      hostDt: form.hostDt,
      startTime: form.startTime,
      endTime: form.endTime,
      criticalMeetingYn: form.criticalMeetingYn,
      meetingStatusFk: form.meetingStatusFk,
    });

  return (
    <>
      {form.isAdminModalActive === 'Y' && (
        <>
          <div className={styles.background} onClick={handleOffModal} />
          <ul className={styles.modalBody}>
            {getAdmins.map(({ id, memberFk, name }) => (
              <li
                key={id}
                onClick={() => handleClickAdminInfo({ id, memberFk, name })}
              >
                {name}
              </li>
            ))}
          </ul>
        </>
      )}
      {form.isClimbingAreaModalActive === 'Y' && (
        <>
          <div className={styles.background} onClick={handleOffModal} />
          <ul className={styles.modalBody}>
            {getClimbingAreas.map(({ id, name }) => (
              <li
                key={id}
                onClick={() => handleClickClimbingAreaInfo({ id, name })}
              >
                {name}
              </li>
            ))}
          </ul>
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
                  name="adminName"
                  type="text"
                  value={`${form.adminName}`}
                  required
                  isSearch
                  searchedName={`${form.searchedAdminName}`}
                  onChange={useChange}
                  onKeyDown={useFindAdmin}
                  onSearch={() =>
                    usePostAdmins({ name: encrypt(`${form.adminName}`) })
                  }
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
                  required
                  isSearch
                  searchedName={`${form.searchedClimbingAreaName}`}
                  onChange={useChange}
                  onKeyDown={useFindClimbingArea}
                  onSearch={() =>
                    usePostClimbingAreas({ name: form.climbingAreaName })
                  }
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
                  name="startTime"
                  subName="endTime"
                  type="time"
                  value={`${form.startTime}`}
                  subValue={`${form.endTime}`}
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
                  options={getStatuses.map(({ id, status }) => ({
                    id,
                    value: id,
                    label: status,
                  }))}
                  onChange={useChange}
                />
              </div>
            </div>
          </div>
          <div className={styles.btnBox}>
            <button onClick={useInsertMeeting}>확인</button>
          </div>
        </div>
      </div>
    </>
  );
}

interface TypeInsertMeeting {
  handleSetSelectedSidebar: (selectedSidebar: string) => void;
}

export default connect(mapStateToProps, mapDispatchToProps)(InsertMeeting);
