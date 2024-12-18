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
import { DOMAIN, FOUNDING_YEAR } from 'modules/constants';
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
  const THIS_YEAR = new Date().getFullYear();
  const [memberDetail, setMemberDetail] = useState<GetMemberDetailType>();
  const [meetings, setMeetings] = useState<Array<GetMeetingOfMemberType[]>>([]);
  const { form, setForm, useChange } = useChangeHook({
    selectedYear: THIS_YEAR,
    title: '',
  });

  useEffect(() => {
    useGetMemberDetail();
  }, []);

  useEffect(() => {
    usePostMeetings({ id, year: form.selectedYear });
  }, [form.selectedYear]);

  // 회원 정보 가져오기
  const { useGetData: useGetMemberDetail } = useGetDataHook({
    url: `${DOMAIN}/api/get-member-detail/${id}`,
    successCb: (response) => {
      const { degree, grade, color, level } = response;
      const name = decrypt(response.name);
      const title = `${degree} ${grade} ${name}&nbsp<span style="background-color: ${color}; padding: 0 5px; border-radius: 8px;">${level}</span>`;

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
    successCb: (response) => setMeetings(handleMakeDoubleList(response)),
  });

  // 벙 리스트 이중배열화
  const handleMakeDoubleList = (response: GetMeetingOfMemberType[]) => {
    const monthlyList = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ];
    const doubleList: Array<GetMeetingOfMemberType[]> = [];

    monthlyList.forEach((month) => {
      const list: GetMeetingOfMemberType[] = [];

      response.forEach((meeting) => {
        const hostMonth = meeting.hostDt.substring(5, 7);

        if (hostMonth === month)
          list.push({ ...meeting, hostName: decrypt(meeting.hostName) || '' });
      });

      if (list.length) doubleList.push(list);
    });

    return doubleList;
  };

  return (
    <div className={styles.wrap}>
      <Header />
      <div className={styles.innerWrap}>
        <PageTitle title={`${form.title}`} />
        <div className={styles.contents}>
          <div className={styles.categories}>
            {Array.from(
              { length: THIS_YEAR - FOUNDING_YEAR + 1 },
              (_, idx) => FOUNDING_YEAR + idx,
            ).map((data) => (
              <button
                key={data}
                className={
                  form.selectedYear === data
                    ? [styles.category, styles.selected].join(' ')
                    : styles.category
                }
                onClick={() =>
                  setForm((prevState) => ({ ...prevState, selectedYear: data }))
                }
              >
                {data}
              </button>
            ))}
          </div>
          <div className={styles.grid}>
            {meetings.map((monthlyList) => (
              <div className={styles.row}>
                <div
                  key={monthlyList[0].hostDt.substring(5, 7)}
                  className={styles.item}
                >{`${+monthlyList[0].hostDt.substring(5, 7)}월`}</div>
                {monthlyList.map(
                  ({ id, climbingAreaName, hostDt, hostName, meetingName }) => (
                    <div key={id} className={styles.item}>
                      {`${+hostDt.substring(8, 10)}일`}
                      <br />
                      {climbingAreaName}
                      <br />
                      {meetingName}
                      <br />
                      {hostName}
                    </div>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface TypeMemberDetail {}

export default connect(mapStateToProps, mapDispatchToProps)(MemberDetail);
