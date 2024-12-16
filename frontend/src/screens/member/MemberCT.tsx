import React, { useEffect, useState } from 'react';
import {
  useChangeHook,
  useGetDataHook,
  usePostDataHook,
} from 'modules/customHooks';
import { GetDegreesType, GetMemberType } from 'modules/apiTypes';
import { DOMAIN } from 'modules/constants';
import { decrypt } from 'modules/utils';
import { levelCellRenderer } from 'components/gridTable/components';
import MemberPT from './MemberPT';

function MemberCT({}: MemberCTProps): React.JSX.Element {
  const [members, setMembers] = useState<any[]>([]);
  const [degrees, setDegrees] = useState<GetDegreesType[]>([
    { id: '', degree: '전체' },
  ]);
  const { form, useChange } = useChangeHook({
    name: '',
    degreeFk: '',
  });
  const columns = [
    { field: '기수' },
    { field: '이름' },
    { field: '분류' },
    { field: '레벨', cellRenderer: levelCellRenderer },
    { field: '금년 참석 횟수' },
    { field: '분기 참석 횟수' },
  ];

  useEffect(() => {
    useGetDegrees();
    usePostAdmins();
  }, []);

  // 기수 가져오기
  const { useGetData: useGetDegrees } = useGetDataHook({
    url: `${DOMAIN}/api/get-degrees-for-member`,
    successCb: (response) => {
      setDegrees([...degrees, ...response]);
    },
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

  return (
    <MemberPT
      degrees={degrees}
      form={form}
      columns={columns}
      members={members}
      onChange={useChange}
    />
  );
}

interface MemberCTProps {}

export default MemberCT;
