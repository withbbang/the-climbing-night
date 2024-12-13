import React, { useEffect, useState } from 'react';
import { replace, useNavigate, useParams } from 'react-router-dom';
import {
  useChangeHook,
  useEnterKeyDownHook,
  useGetDataHook,
  usePostDataHook,
  useSetInfoPopupHook,
} from 'modules/customHooks';
import { DOMAIN } from 'modules/constants';
import { decrypt, encrypt } from 'modules/utils';
import { GetDegreesType, GetParticipantType } from 'modules/apiTypes';
import {
  buttonCellRenderer,
  levelCellRenderer,
} from 'components/gridTable/components';
import MeetingDetailPT from './MeetingDetailPT';

function MeetingDetailCT({
  handleSetSelectedSidebar,
}: MeetingDetailCTProps): React.JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const useSetInfoPopup = useSetInfoPopupHook();
  const [statuses, setStatuses] = useState<any[]>([]);
  const [degreeOptions, setDegreeOptions] = useState<GetDegreesType[]>([]);
  const [participants, setParticipants] = useState<GetParticipantType[]>([]);
  const [admins, setAdmins] = useState<any[]>([]);
  const [climbingAreas, setClimbingAreas] = useState<any[]>([]);
  const [members, setMembers] = useState<GetParticipantType[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<GetParticipantType[]>(
    [],
  );
  const { form, setForm, useChange } = useChangeHook({
    meetingId: '',
    meetingName: '',
    hostName: '',
    hostDt: '',
    time: '',
    criticalMeetingYn: '',
    meetingStatusFk: '',
    climbingAreaFk: '',
    climbingAreaName: '',
    adminId: '',
    memberName: '',
    degreeFk: '',
    isUpdated: false,
    searchedAdminName: '',
    searchedClimbingAreaName: '',
    isAdminModalActive: 'N',
    isClimbingAreaModalActive: 'N',
    isMembersModalActive: 'N',
  });
  const columns = [
    { field: '주최자', flex: 1 },
    { field: '이름', flex: 2 },
    { field: '레벨', flex: 2, cellRenderer: levelCellRenderer },
    {
      field: '취소',
      flex: 1,
      cellRenderer: (props: any) =>
        buttonCellRenderer(props, handleDeleteParticipants),
    },
  ];

  useEffect(() => {
    if (id) {
      useGetStatuses();
      useGetDegrees();
      useGetMeetingInfo();
      useGetParticipants();
    }
  }, []);

  // 벙 상태 가져오기
  const { useGetData: useGetStatuses } = useGetDataHook({
    url: `${DOMAIN}/api/get-meeting-statuses`,
    successCb: (response) =>
      setStatuses([
        ...response.map(({ id, status }: any) => ({
          id: `meetingStatusFk${id}`,
          value: id,
          label: status,
        })),
      ]),
  });

  // 기수 가져오기
  const { useGetData: useGetDegrees } = useGetDataHook({
    url: `${DOMAIN}/api/get-degrees`,
    successCb: (response) =>
      setDegreeOptions([
        { id: 'degreeFk', value: '', label: '전체' },
        ...response.map(({ id, degree }: GetDegreesType) => ({
          id: `degreeFk${id}`,
          value: id,
          label: degree,
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
        climbingAreaFk,
        climbingAreaName,
        adminId,
      } = response;

      const decryptedName = decrypt(hostName) || '';

      setForm((prevState) => ({
        ...prevState,
        meetingId,
        meetingName,
        hostName: decryptedName,
        hostDt,
        time,
        criticalMeetingYn,
        meetingStatusFk,
        climbingAreaFk,
        climbingAreaName,
        adminId,
        searchedAdminName: decryptedName,
        searchedClimbingAreaName: climbingAreaName,
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

  // 주최자 정보 가져오기
  const { usePostData: usePostAdmins } = usePostDataHook({
    url: `${DOMAIN}/api/get-admins-for-meeting`,
    successCb: (response) => {
      if (response.length === 1) {
        const [{ id, memberFk, name, level, color }] = response;

        const decryptedName = decrypt(name) || '';

        setForm((prevState) => ({
          ...prevState,
          adminId: id,
          hostName: decryptedName,
          searchedAdminName: decryptedName,
        }));

        if (!participants.some(({ id }: GetParticipantType) => id === memberFk))
          setParticipants([
            { id: memberFk, name: decryptedName, level, color },
            ...participants,
          ]);
      } else if (response.length > 1) {
        handleSetApiList(response, 'isAdminModalActive');
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
        handleSetApiList(response, 'isClimbingAreaModalActive');
      }
    },
  });

  // 회원 정보 가져오기
  const { usePostData: usePostMembers } = usePostDataHook({
    url: `${DOMAIN}/api/get-members-for-update-meeting`,
    successCb: (response) => {
      if (response.length > 0)
        handleSetApiList(response, 'isMembersModalActive');
      else useSetInfoPopup('회원 정보가 없습니다.');
    },
  });

  // 벙 상세 수정 요청
  const { usePostData: usePostUpdateMeeting } = usePostDataHook({
    url: `${DOMAIN}/api/update-meeting`,
    beforeCb: () => {
      if (!form.meetingName) throw new Error('벙 이름을<br/>입력해주세요.');
    },
    successCb: () => {
      handleSetSelectedSidebar('update-meeting');
      navigate('/meeting');
    },
  });

  // API 리스트 조회 콜백
  const handleSetApiList = (response: Array<any>, type: string) => {
    switch (type) {
      case 'isAdminModalActive':
        const decryptedAdmins = response.map((item) => ({
          ...item,
          id: item.memberFk,
          name: decrypt(item.name),
        }));

        setAdmins(decryptedAdmins);
        break;
      case 'isClimbingAreaModalActive':
        setClimbingAreas(response);
        break;
      case 'isMembersModalActive':
        const decryptedMembers = response.map((member) => ({
          ...member,
          name: decrypt(member.name),
        }));

        setMembers(decryptedMembers);
        break;
      default:
        break;
    }

    setForm((prevState) => ({
      ...prevState,
      [type]: 'Y',
    }));
  };

  // 주최자 입력 후 엔터 콜백
  const useFindAdmins = useEnterKeyDownHook(form, () =>
    usePostAdmins({ name: encrypt(`${form.hostName}`) }),
  );

  // 암장 입력 후 엔터 콜백
  const useFindClimbingAreas = useEnterKeyDownHook(form, () =>
    usePostClimbingAreas({ name: form.climbingAreaName }),
  );

  // 참가자 이름 입력 후 엔터 콜백
  const useFindMembers = useEnterKeyDownHook(form, () =>
    usePostMembers({
      name: encrypt(`${form.memberName}`),
      degreeFk: form.degreeFk,
    }),
  );

  // 주최자 이름 검색 클릭
  const handleSearchAdmins = () =>
    usePostAdmins({ name: encrypt(`${form.hostName}`) });

  // 암장 검색 클릭
  const handleSearchClimbingAreas = () =>
    usePostClimbingAreas({ name: form.climbingAreaName });

  // 회원 이름 검색 클릭
  const handleSearchMembers = () =>
    usePostMembers({
      name: encrypt(`${form.memberName}`),
      degreeFk: form.degreeFk,
    });

  // 주최자 리스트 클릭 콜백
  const handleClickAdminInfo = (adminInfo: any) => {
    const { id, memberFk, name, level, color } = adminInfo;

    if (!participants.some(({ id }: GetParticipantType) => id === memberFk))
      setParticipants([{ id: memberFk, name, level, color }, ...participants]);

    setForm((prevState) => ({
      ...prevState,
      adminId: id,
      hostName: name,
      searchedAdminName: name,
      isAdminModalActive: 'N',
    }));
    setAdmins([]);
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
    setAdmins([]);
  };

  // 회원 리스트 클릭 콜백
  const handleClickMemberInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    const [id, name, level, color] = value.split(',');

    if (checked)
      setSelectedMembers([...selectedMembers, { id, name, level, color }]);
    else
      setSelectedMembers(
        selectedMembers.filter(({ id: selectedId }) => selectedId !== id),
      );
  };

  // 참가자 추가 팝업 내에 버튼 콜백
  const handleAddParticipants = () => {
    const newParticipants = [...participants];

    selectedMembers.forEach((member) => {
      if (!participants.some(({ id }) => id === member.id))
        newParticipants.push(member);
    });

    setParticipants(newParticipants);
    setSelectedMembers([]);
    setForm((prevState) => ({
      ...prevState,
      isMembersModalActive: 'N',
    }));
  };

  // 모달창 끄기
  const handleCloseModal = () => {
    setForm((prevState) => ({
      ...prevState,
      isAdminModalActive: 'N',
      isClimbingAreaModalActive: 'N',
      isMembersModalActive: 'N',
    }));
    setAdmins([]);
    setClimbingAreas([]);
    setMembers([]);
    setSelectedMembers([]);
  };

  // 리스트 내에 취소 버튼 콜백
  const handleDeleteParticipants = ({ id, name }: any) => {
    if (name === form.searchedAdminName) {
      useSetInfoPopup('주최자는<br/>삭제할 수 없습니다.');
      return;
    }

    const newParticipants = participants.filter(
      (participant) => participant.id !== id,
    );
    setParticipants(newParticipants);
  };

  const handleUpdate = () => {
    const {
      meetingId,
      meetingName,
      adminId,
      climbingAreaFk,
      hostDt,
      time,
      criticalMeetingYn,
      meetingStatusFk,
    } = form;

    usePostUpdateMeeting({
      id: meetingId,
      name: meetingName,
      adminFk: adminId,
      climbingAreaFk,
      hostDt,
      time,
      criticalMeetingYn,
      meetingStatusFk,
      memberFks: participants.map(({ id }) => id),
    });
  };

  return (
    <MeetingDetailPT
      form={form}
      statuses={statuses}
      degreeOptions={degreeOptions}
      participants={participants}
      admins={admins}
      climbingAreas={climbingAreas}
      members={members}
      columns={columns}
      onFindAdmins={useFindAdmins}
      onFindClimbingAreas={useFindClimbingAreas}
      onFindMembers={useFindMembers}
      onSearchAdmins={handleSearchAdmins}
      onSearchClimbingAreas={handleSearchClimbingAreas}
      onSearchMembers={handleSearchMembers}
      onClickAdminInfo={handleClickAdminInfo}
      onClickClimbingAreaInfo={handleClickClimbingAreaInfo}
      onClickMemberInfo={handleClickMemberInfo}
      onAddParticipants={handleAddParticipants}
      onCloseModal={handleCloseModal}
      onChange={useChange}
      onUpdate={handleUpdate}
    />
  );
}

interface MeetingDetailCTProps {
  handleSetSelectedSidebar: (selectedSidebar: string) => void;
}

export default MeetingDetailCT;
