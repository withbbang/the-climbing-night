import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useChangeHook,
  useEnterKeyDownHook,
  useGetDataHook,
} from 'modules/customHooks';
import { DOMAIN } from 'modules/constants';
import { decrypt } from 'modules/utils';
import { GetParticipantType } from 'modules/apiTypes';
import MeetingDetailPT from './MeetingDetailPT';

function MeetingDetailCT({}: MeetingDetailCTProps): React.JSX.Element {
  const { id } = useParams();
  const [getStatuses, setGetStatuses] = useState<any[]>([]);
  const [participants, setParticipants] = useState<GetParticipantType[]>([]);
  const { form, setForm, useChange } = useChangeHook({
    meetingId: '',
    meetingName: '',
    hostName: '',
    climbingAreaName: '',
    winwinYn: '',
    hostDt: '',
    time: '',
    criticalMeetingYn: '',
    meetingStatusFk: '',
    isUpdated: false,
  });

  useEffect(() => {
    if (id) {
      useGetStatuses();
      useGetMeetingInfo();
      useGetParticipants();
    }
  }, []);

  // 벙 상태 가져오기
  const { useGetData: useGetStatuses } = useGetDataHook({
    url: `${DOMAIN}/api/get-meeting-statuses`,
    successCb: (response) =>
      setGetStatuses([
        ...response.map(({ id, status }: any) => ({
          id: `meetingStatusFk${id}`,
          value: id,
          label: status,
        })),
      ]),
  });

  // 벙 상세 가져오기
  const { useGetData: useGetMeetingInfo } = useGetDataHook({
    url: `${DOMAIN}/api/get-meeting-info/${id}`,
    successCb: (response) => {
      const {
        meetingId,
        meetingName,
        hostName,
        hostDt,
        time,
        criticalMeetingYn,
        meetingStatusFk,
        climbingAreaId,
        climbingAreaName,
        adminId,
      } = response;

      setForm((prevState) => ({
        ...prevState,
        meetingId,
        meetingName,
        hostName: decrypt(hostName),
        hostDt,
        time,
        criticalMeetingYn,
        meetingStatusFk,
        climbingAreaId,
        climbingAreaName,
        adminId,
      }));
    },
  });

  // 참가자 목록 가져오기
  const { useGetData: useGetParticipants } = useGetDataHook({
    url: `${DOMAIN}/api/get-participants/${id}`,
    successCb: (response) => {
      const decryptedResponse = response.map(
        (participant: GetParticipantType) => ({
          ...participant,
          name: decrypt(participant.name),
        }),
      );

      setParticipants(decryptedResponse);
    },
  });

  // 이름 및 휴대폰 번호 입력 후 엔터 콜백
  const useEnterKeyDown = useEnterKeyDownHook(form, () => {});

  return (
    <MeetingDetailPT
      form={form}
      getStatuses={getStatuses}
      onChange={useChange}
      onKeyDown={useEnterKeyDown}
    />
  );
}

interface MeetingDetailCTProps {}

export default MeetingDetailCT;
