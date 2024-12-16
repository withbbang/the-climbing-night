import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useChangeHook,
  useEnterKeyDownHook,
  useGetDataHook,
  usePostDataHook,
} from 'modules/customHooks';
import { GetDegreesType, GetMemberType } from 'modules/apiTypes';
import { DOMAIN } from 'modules/constants';
import { decrypt, encrypt } from 'modules/utils';
import { levelCellRenderer } from 'components/gridTable/components';
import MemberPT from './MemberPT';

function MemberCT({}: MemberCTProps): React.JSX.Element {
  const navigate = useNavigate();
  const [members, setMembers] = useState<GetMemberType[]>([]);
  const [degrees, setDegrees] = useState<GetDegreesType[]>([
    { id: '', degree: '전체' },
  ]);
  const { form, useChange } = useChangeHook({
    name: '',
    degreeFk: '',
    startJoinDt: '',
    endJoinDt: '',
  });
  const columns = [
    { field: '기수' },
    { field: '이름' },
    { field: '분류' },
    { field: '레벨', cellRenderer: levelCellRenderer },
    { field: '올해 참여 횟수' },
    { field: '최근 1년 참석 횟수' },
    { field: '최근 3개월 참석 횟수' },
  ];

  useEffect(() => {
    useGetDegrees();
    usePostAdmins();
  }, []);

  // 기수 가져오기
  const { useGetData: useGetDegrees } = useGetDataHook({
    url: `${DOMAIN}/api/get-degrees-for-member`,
    successCb: (response) => setDegrees([...degrees, ...response]),
  });

  // 회원 리스트 조회
  const { usePostData: usePostAdmins } = usePostDataHook({
    url: `${DOMAIN}/api/get-members-for-member`,
    successCb: (response) => {
      const decryptedResponse = response.map((member: GetMemberType) => ({
        ...member,
        name: decrypt(member.name),
      }));

      setMembers(decryptedResponse);
    },
  });

  // 검색
  const handleSearch = () => {
    const { name, degreeFk, startJoinDt, endJoinDt } = form;

    usePostAdmins({
      name: encrypt(`${name}`),
      degreeFk,
      startJoinDt,
      endJoinDt,
    });
  };

  // 이름 및 휴대폰 번호 입력 후 엔터 콜백
  const useEnterKeyDown = useEnterKeyDownHook(form, handleSearch);

  // 리스트 클릭 시 상세 페이지 이동
  const handleClickRow = (data: any) => navigate(`/member/${data.id}`);

  return (
    <MemberPT
      degrees={degrees}
      form={form}
      columns={columns}
      members={members}
      onChange={useChange}
      onClickRow={handleClickRow}
      onKeyDown={useEnterKeyDown}
      onSearch={handleSearch}
    />
  );
}

interface MemberCTProps {}

export default MemberCT;
