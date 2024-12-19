import React, { useEffect, useState } from 'react';
import { PropState } from 'middlewares/configureReducer';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { useNavigate } from 'react-router-dom';
import {
  useChangeHook,
  useEnterKeyDownHook,
  useGetDataHook,
  usePostDataHook,
  useSetInfoPopupHook,
} from 'modules/customHooks';
import { DOMAIN } from 'modules/constants';
import { GetMeetingType } from 'modules/apiTypes';
import { decrypt, encrypt, handleReturnNumberWithCommas } from 'modules/utils';
import PageTitle from 'components/pageTitle';
import CommonInput from 'components/commonInput';
import GridTable from 'components/gridTable';
import styles from './UpdateMeeting.module.scss';

function mapStateToProps(state: PropState) {
  return {};
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {};
}

function UpdateMeeting({}: TypeUpdateMeeting) {
  const useSetInfoPopup = useSetInfoPopupHook();
  const navigate = useNavigate();
  const [getStatuses, setGetStatuses] = useState<any[]>([
    { id: 'meetingStatusFk', value: '', label: '전체' },
  ]);
  const [meetings, setMeetings] = useState<GetMeetingType[]>([]);
  const { form, useChange } = useChangeHook({
    meetingName: '',
    hostName: '',
    climbingAreaName: '',
    winwinYn: '',
    startHostDt: '',
    endHostDt: '',
    criticalMeetingYn: '',
    meetingStatusFk: '',
    isUpdated: false,
  });
  const columns = [
    { field: '이름' },
    { field: '주최자' },
    { field: '암장' },
    { field: '주소' },
    { field: '상생 여부' },
    { field: '가격' },
    { field: '상생 가격' },
    { field: '주최 날짜' },
    { field: '진행 시간' },
    { field: '정모 여부' },
    { field: '상태' },
    { field: '수정한 관리자' },
  ];

  useEffect(() => {
    useGetStatuses();
    usePostMeetings();
  }, []);

  // 벙 상태 가져오기
  const { useGetData: useGetStatuses } = useGetDataHook({
    url: `${DOMAIN}/api/get-meeting-statuses`,
    successCb: (response) =>
      setGetStatuses([
        ...getStatuses,
        ...response.map(({ id, status }: any) => ({
          id: `meetingStatusFk${id}`,
          value: id,
          label: status,
        })),
      ]),
  });

  // 벙 리스트 조회
  const { usePostData: usePostMeetings } = usePostDataHook({
    url: `${DOMAIN}/api/get-meetings`,
    successCb: (response) => {
      const decryptedResponse = response.map((admin: GetMeetingType) => ({
        ...admin,
        hostName: decrypt(admin.hostName),
        updater: decrypt(admin.updater),
      }));

      setMeetings(decryptedResponse);
    },
  });

  // 상세 페이지 권한 검증
  const { usePostData: usePostDetailPageRedirect } = usePostDataHook({
    url: `${DOMAIN}/api/meeting-detail-page-redirect`,
    successCb: ({ path }) => {
      if (path) navigate(path);
      else useSetInfoPopup('권한이 없습니다.');
    },
  });

  // 검색
  const handleSearch = () => {
    const {
      meetingName,
      hostName,
      climbingAreaName,
      winwinYn,
      startHostDt,
      endHostDt,
      criticalMeetingYn,
      meetingStatusFk,
    } = form;

    usePostMeetings({
      meetingName,
      hostName: encrypt(`${hostName}`),
      climbingAreaName,
      winwinYn,
      startHostDt,
      endHostDt,
      criticalMeetingYn,
      meetingStatusFk,
    });
  };

  // 이름 및 휴대폰 번호 입력 후 엔터 콜백
  const useEnterKeyDown = useEnterKeyDownHook(form, handleSearch);

  return (
    <div className={styles.wrap}>
      <div className={styles.innerWrap}>
        <PageTitle title="벙 수정" />
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
                  onChange={useChange}
                  onKeyDown={useEnterKeyDown}
                />
              </div>
              <div className={styles.input}>
                <CommonInput
                  title="주최자"
                  tagType="input"
                  name="hostName"
                  type="text"
                  value={`${form.hostName}`}
                  onChange={useChange}
                  onKeyDown={useEnterKeyDown}
                />
              </div>
            </div>
            <div className={styles.inputs}>
              <div className={styles.input}>
                <CommonInput
                  title="암장"
                  tagType="input"
                  name="climbingAreaName"
                  type="numeric"
                  value={`${form.climbingAreaName}`}
                  onChange={useChange}
                  onKeyDown={useEnterKeyDown}
                />
              </div>
              <div className={styles.input}>
                <CommonInput
                  title="상생 여부"
                  tagType="select"
                  name="winwinYn"
                  value={`${form.winwinYn}`}
                  options={[
                    { id: 'winwinYn', value: '', label: '전체' },
                    { id: 'winwinYnN', value: 'N', label: 'X' },
                    { id: 'winwinYnY', value: 'Y', label: 'O' },
                  ]}
                  onChange={useChange}
                />
              </div>
            </div>
            <div className={styles.inputs}>
              <div className={styles.input}>
                <CommonInput
                  title="주최 날짜"
                  tagType="input"
                  name="startHostDt"
                  subName="endHostDt"
                  type="date"
                  value={`${form.startHostDt}`}
                  subValue={`${form.endHostDt}`}
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
                    { id: 'criticalMeetingYn', value: '', label: '전체' },
                    { id: 'criticalMeetingYnN', value: 'N', label: 'X' },
                    { id: 'criticalMeetingYnY', value: 'Y', label: 'O' },
                  ]}
                  onChange={useChange}
                />
              </div>
            </div>
            <div className={styles.inputs}>
              <div className={styles.input}>
                <CommonInput
                  title="상태"
                  tagType="select"
                  name="meetingStatusFk"
                  value={`${form.meetingStatusFk}`}
                  options={getStatuses}
                  onChange={useChange}
                />
              </div>
            </div>
          </div>
          <div className={styles.btnBox}>
            <button onClick={handleSearch}>확인</button>
          </div>
          <div className={styles.listBox}>
            <GridTable
              columns={columns}
              list={meetings.map(
                ({
                  id,
                  meetingName,
                  hostName,
                  climbingAreaName,
                  address,
                  winwinYn,
                  price,
                  winPrice,
                  hostDt,
                  startTime,
                  endTime,
                  criticalMeetingYn,
                  status,
                  updater,
                }: GetMeetingType) => ({
                  id,
                  이름: meetingName,
                  주최자: hostName,
                  암장: climbingAreaName,
                  주소: address,
                  '상생 여부': winwinYn,
                  가격: `${handleReturnNumberWithCommas(price)}원`,
                  '상생 가격': `${handleReturnNumberWithCommas(winPrice)}원`,
                  '주최 날짜': hostDt,
                  '진행 시간': `${startTime} ~ ${endTime}`,
                  '정모 여부': criticalMeetingYn,
                  상태: status,
                  '수정한 관리자': updater,
                }),
              )}
              onClickRow={(data: any) =>
                usePostDetailPageRedirect({ id: data.id })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface TypeUpdateMeeting {}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateMeeting);
