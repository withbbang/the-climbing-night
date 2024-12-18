import React, { useEffect, useState } from 'react';
import { PropState } from 'middlewares/configureReducer';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { useNavigate } from 'react-router-dom';
import { useChangeHook, usePostDataHook } from 'modules/customHooks';
import { DOMAIN, FOUNDING_YEAR } from 'modules/constants';
import { GetScheduleType } from 'modules/apiTypes';
import { decrypt } from 'modules/utils';
import PageTitle from 'components/pageTitle';
import styles from './Schedule.module.scss';

function mapStateToProps(state: PropState) {
  return {};
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {};
}

function Schedule({}: TypeSchedule) {
  const navigate = useNavigate();
  const CURRENT_DATE = new Date();
  const DAY_OF_THE_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const MONTH_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [schedules, setSchedules] = useState<Array<GetScheduleType[]>>();
  const { form, setForm, useChange } = useChangeHook({
    selectedYear: CURRENT_DATE.getFullYear(),
    selectedMonth: CURRENT_DATE.getMonth() + 1,
    selectedDayCnt: new Date(
      CURRENT_DATE.getFullYear(),
      CURRENT_DATE.getMonth() + 1,
      0,
    ).getDate(),
    frontEmptyCnt: 0,
    backEmptyCnt: 0,
  });

  useEffect(() => {
    usePostSchedules({
      year: form.selectedYear ? form.selectedYear : CURRENT_DATE.getFullYear(),
      month: form.selectedMonth
        ? form.selectedMonth
        : CURRENT_DATE.getMonth() + 1,
    });
  }, [form.selectedYear, form.selectedMonth]);

  // 벙 스케쥴 조회
  const { usePostData: usePostSchedules } = usePostDataHook({
    url: `${DOMAIN}/api/get-schedules`,
    successCb: (response: GetScheduleType[]) => {
      const newScheduleList: Array<GetScheduleType[]> = Array.from(
        { length: form.selectedDayCnt as number },
        () => [],
      );

      newScheduleList.forEach((_, idx) => {
        const newSchedule: GetScheduleType[] = [];

        response.forEach((schedule) => {
          const decryptedName = decrypt(schedule.hostName) || '';

          if (+schedule.hostDt === idx + 1)
            newSchedule.push({ ...schedule, hostName: decryptedName });
        });

        newScheduleList[idx] = newSchedule;
      });

      const [f, b] = handleEmptyCnt(
        new Date(`${form.selectedYear}-${form.selectedMonth}-01`),
      );

      const frontEmptyList: Array<GetScheduleType[]> = Array.from(
        { length: f },
        () => [],
      );
      const backEmptyList: Array<GetScheduleType[]> = Array.from(
        { length: b },
        () => [],
      );

      const newList = frontEmptyList
        .concat(newScheduleList)
        .concat(backEmptyList);

      setSchedules(newList);
      setForm((prevState) => ({
        ...prevState,
        frontEmptyCnt: f,
        backEmptyCnt: b,
      }));
    },
  });

  /**
   * 달력의 앞뒤 공백 개수 반환 함수
   * @param date 입력 날짜
   */
  const handleEmptyCnt = (date: Date) => {
    console.log('input date: ', date);
    const frontEmptyCnt = new Date(
      `${date.getFullYear()}-${date.getMonth() + 1}-01`,
    ).getDay();

    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
    ).getDate();

    const backEmptyCnt =
      6 -
      new Date(
        `${date.getFullYear()}-${date.getMonth() + 1}-${lastDay}`,
      ).getDay();

    return [frontEmptyCnt, backEmptyCnt];
  };

  // 달력에 일 표시하는 함수
  const handleReturnDate = (idx: number) => {
    const f = Number(form.frontEmptyCnt);
    const fAddD = f + Number(form.selectedDayCnt);

    if (idx + 1 > f && idx < fAddD) return <p>{idx - f + 1}</p>;
    return null;
  };

  // 년도 버튼 클릭 콜백
  const handleClickYear = (year: number) =>
    setForm((prevState) => ({
      ...prevState,
      selectedYear: year,
      selectedDayCnt: new Date(year, Number(form.selectedMonth), 0).getDate(),
    }));

  // 달 버튼 클릭 콜백
  const handleClickMonth = (month: number) =>
    setForm((prevState) => ({
      ...prevState,
      selectedMonth: month,
      selectedDayCnt: new Date(Number(form.selectedYear), month, 0).getDate(),
    }));

  // 스케쥴 클릭 콜백
  const handleClickSchedule = (meetingStatusFk: string, id: string) => {
    if (meetingStatusFk === '10') navigate(`/meeting-detail/${id}`);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.innerWrap}>
        <PageTitle title="Schedule" />
        <div className={styles.contents}>
          <div className={styles.yearBox}>
            {Array.from(
              { length: CURRENT_DATE.getFullYear() - FOUNDING_YEAR + 1 },
              (_, idx) => FOUNDING_YEAR + idx,
            ).map((year) => (
              <button
                key={year}
                className={
                  form.selectedYear === year
                    ? [styles.year, styles.selectedYear].join(' ')
                    : styles.year
                }
                onClick={() => handleClickYear(year)}
              >
                {year}
              </button>
            ))}
          </div>
          <div className={styles.monthBox}>
            {MONTH_LIST.map((month) => (
              <button
                key={`${month}월`}
                className={
                  form.selectedMonth === month
                    ? [styles.month, styles.selectedMonth].join(' ')
                    : styles.month
                }
                onClick={() => handleClickMonth(month)}
              >
                {month}월
              </button>
            ))}
          </div>
          <div className={styles.calendarBox}>
            <div className={styles.weekBox}>
              {DAY_OF_THE_WEEK.map((day) => (
                <div
                  className={
                    day === 'Sun'
                      ? [styles.day, styles.sun].join(' ')
                      : day === 'Sat'
                      ? [styles.day, styles.sat].join(' ')
                      : styles.day
                  }
                  key={day}
                >
                  {day}
                </div>
              ))}
            </div>
            <div className={styles.scheduleBox}>
              {schedules?.map((schedule, idx) => (
                <div
                  className={
                    idx % 7 === 6
                      ? [styles.sun, styles.box].join(' ')
                      : idx % 7 === 0
                      ? [styles.sat, styles.box].join(' ')
                      : styles.box
                  }
                >
                  {handleReturnDate(idx)}
                  {schedule.map(
                    ({
                      id,
                      meetingName,
                      time,
                      criticalMeetingYn,
                      meetingStatusFk,
                      winwinYn,
                      hostName,
                    }) => (
                      <div
                        className={styles.meeting}
                        onClick={() => handleClickSchedule(meetingStatusFk, id)}
                      >
                        <span
                          className={
                            criticalMeetingYn === 'Y' && winwinYn === 'Y'
                              ? [
                                  styles.critical,
                                  styles.winwin,
                                  styles.info,
                                ].join(' ')
                              : criticalMeetingYn === 'Y'
                              ? [styles.critical, styles.info].join(' ')
                              : winwinYn === 'Y'
                              ? [styles.winwin, styles.info].join(' ')
                              : styles.info
                          }
                        >
                          {meetingName}
                          <br />
                          {hostName}({time})
                        </span>
                      </div>
                    ),
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TypeSchedule {}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
