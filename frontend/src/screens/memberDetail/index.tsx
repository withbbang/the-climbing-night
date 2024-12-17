import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { PropState } from 'middlewares/configureReducer';
import {
  useEnterKeyDownHook,
  useChangeHook,
  usePostDataHook,
  useGetDataHook,
} from 'modules/customHooks';
import Header from 'components/header';
import { DOMAIN } from 'modules/constants';
import {
  decrypt,
  encrypt,
  handleCheckEmail,
  handleConvertDateFormat,
} from 'modules/utils';
import { GetMeetingOfMemberType, GetMemberDetailType } from 'modules/apiTypes';
import PageTitle from 'components/pageTitle';
import styles from './MemberDetail.module.scss';

function mapStateToProps(state: PropState) {
  return {};
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {};
}

function MemberDetail({}: TypeMemberDetail): React.JSX.Element {
  const { id } = useParams();
  const [memberDetail, setMemberDetail] = useState<GetMemberDetailType>();
  const [meetings, setMeetings] = useState<GetMeetingOfMemberType[]>([]);
  const { form, setForm, useChange } = useChangeHook({
    year: handleConvertDateFormat(new Date(), 'yyyy'),
    title: '',
  });

  useEffect(() => {
    useGetMemberDetail();
    usePostMeetings({ id, year: form.year });
  }, []);

  // 회원 정보 가져오기
  const { useGetData: useGetMemberDetail } = useGetDataHook({
    url: `${DOMAIN}/api/get-member-detail/${id}`,
    successCb: (response) => {
      const { degree, grade, color, level } = response;
      const name = decrypt(response.name);
      const title = `${degree} ${grade} ${name}&nbsp<span style="background-color: ${color}; padding: 0 5px;">${level}</span>`;

      setMemberDetail({ ...response, name });
      setForm((prevState) => ({
        ...prevState,
        title,
      }));
    },
  });

  // 참여 벙 리스트 조회
  const { usePostData: usePostMeetings } = usePostDataHook({
    url: `${DOMAIN}/api/get-meetings-of-member`,
    successCb: (response) => {
      const decryptedResponse = response.map(
        (meeting: GetMeetingOfMemberType) => ({
          ...meeting,
          hostName: decrypt(meeting.hostName),
        }),
      );

      setMeetings(decryptedResponse);
    },
  });

  return (
    <div className={styles.wrap}>
      <Header />
      <div className={styles.innerWrap}>
        <PageTitle title={`${form.title}`} />
        <div className={styles.contents}></div>
      </div>
    </div>
  );
}

interface TypeMemberDetail {}

export default connect(mapStateToProps, mapDispatchToProps)(MemberDetail);
