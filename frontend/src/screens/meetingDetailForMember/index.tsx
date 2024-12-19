import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { PropState } from 'middlewares/configureReducer';
import { useGetDataHook } from 'modules/customHooks';
import Header from 'components/header';
import { DOMAIN } from 'modules/constants';
import { decrypt } from 'modules/utils';
import PageTitle from 'components/pageTitle';
import {
  GetMeetingDetailType,
  GetParticipantForMeetingType,
} from 'modules/apiTypes';
import { levelCellRenderer } from 'components/gridTable/components';
import GridTable from 'components/gridTable';
import styles from './MeetingDetailForMember.module.scss';

function mapStateToProps(state: PropState) {
  return {};
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {};
}

function MeetingDetailForMember({}: TypeMeetingDetailForMember): React.JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();
  const [meetingDetail, setMeetingDetail] = useState<GetMeetingDetailType>();
  const [participants, setParticipants] = useState<
    GetParticipantForMeetingType[]
  >([]);
  const columns = [
    { field: '주최자', flex: 1 },
    { field: '기수', flex: 1 },
    { field: '이름', flex: 2 },
    { field: '레벨', cellRenderer: levelCellRenderer, flex: 2 },
  ];

  useEffect(() => {
    useGetMeetingDetail();
    useGetParticipants();
  }, []);

  // 벙 정보 가져오기
  const { useGetData: useGetMeetingDetail } = useGetDataHook({
    url: `${DOMAIN}/api/get-meeting-detail/${id}`,
    successCb: (response) =>
      setMeetingDetail({ ...response, hostName: decrypt(response.hostName) }),
  });

  // 참여자 리스트 가져오기
  const { useGetData: useGetParticipants } = useGetDataHook({
    url: `${DOMAIN}/api/get-participants-for-meeting/${id}`,
    successCb: (response) => {
      const decryptedResponse = response.map(
        (participant: GetParticipantForMeetingType) => ({
          ...participant,
          name: decrypt(participant.name),
        }),
      );

      setParticipants(decryptedResponse);
    },
  });

  // 리스트 클릭 시 회원이 참여한 벙 리스트 조회 페이지 이동
  const handleMovePage = (data: any) => navigate(`/member/${data.id}`);

  return (
    <div className={styles.wrap}>
      <Header />
      <div className={styles.innerWrap}>
        <PageTitle title={`${meetingDetail?.meetingName}`} />
        <div className={styles.contents}>
          <div className={styles.infoBox}>
            <p>주최: {meetingDetail?.hostName}</p>
            <p>암장: {meetingDetail?.climbingAreaName}</p>
            <p>
              일시: {meetingDetail?.hostDt} (
              {meetingDetail?.startTime.substring(0, 5)} ~{' '}
              {meetingDetail?.endTime.substring(0, 5)})
            </p>
            <p>상생: {meetingDetail?.winwinYn === 'Y' ? '🙆🏻‍♀️' : '🙅🏻‍♀️'}</p>
            <p>
              정모: {meetingDetail?.criticalMeetingYn === 'Y' ? '🙆🏻‍♂️' : '🙅🏻‍♂️'}
            </p>
          </div>
          <div className={styles.listBox}>
            <GridTable
              columns={columns}
              list={participants.map((particepant) => ({
                ...particepant,
                주최자: particepant.host === 'Y' ? '👑' : '',
                기수: particepant.degree,
                이름: particepant.name,
                레벨: `${particepant.level}&nbsp<span style="background-color: ${particepant.color}; padding: 0 10px;"/>`,
              }))}
              onClickRow={handleMovePage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface TypeMeetingDetailForMember {}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MeetingDetailForMember);
