import React, { useEffect, useState } from 'react';
import { PropState } from 'middlewares/configureReducer';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { useNavigate } from 'react-router-dom';
import {
  useChangeHook,
  useGetDataHook,
  usePostDataHook,
} from 'modules/customHooks';
import { DOMAIN } from 'modules/constants';
import { GetDegreesType, GetLevelsType } from 'modules/apiTypes';
import { encrypt } from 'modules/utils';
import PageTitle from 'components/pageTitle';
import styles from './InsertMember.module.scss';

function mapStateToProps(state: PropState) {
  return {};
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {};
}

function InsertMember({}: TypeInsertMember) {
  const navigate = useNavigate();
  const [levelOptions, setLevelOptions] = useState<GetLevelsType[]>([]);
  const [degreeOptions, setDegreeOptions] = useState<GetDegreesType[]>([]);
  const { form, setForm, useChange } = useChangeHook({
    name: '',
    birthDt: '',
    levelFk: '',
    degreeFk: '',
    phoneNo: '',
    winwinYn: 'N',
    sex: 'M',
    blackCnt: 0,
    dormancyYn: 'N',
    leaveYn: 'N',
    banYn: 'N',
    joinDt: '',
  });

  useEffect(() => {
    useGetLevels();
    useGetDegrees();
  }, []);

  // 레벨 가져오기
  const { useGetData: useGetLevels } = useGetDataHook({
    url: `${DOMAIN}/api/get-levels`,
    successCb: (response) => {
      setLevelOptions(response);
      setForm((prevState) => ({
        ...prevState,
        levelFk: response[0].id,
      }));
    },
  });

  // 기수 가져오기
  const { useGetData: useGetDegrees } = useGetDataHook({
    url: `${DOMAIN}/api/get-degrees`,
    successCb: (response) => {
      setDegreeOptions(response);
      setForm((prevState) => ({
        ...prevState,
        degreeFk: response[0].id,
      }));
    },
  });

  // 회원 등록
  const { usePostData } = usePostDataHook({
    url: `${DOMAIN}/api/insert-member`,
    beforeCb: () => {},
    successCb: () => {
      console.log('success');
    },
  });

  // blackCnt input onBlur
  const handleBlur = () => {
    setForm((prevState) => ({
      ...prevState,
      blackCnt: 3,
    }));
  };

  // 확인 버튼 콜백
  const useInsertMember = () => {
    usePostData({
      name: encrypt(`${form.name}`),
      birthDt: encrypt(`${form.birthDt}`),
      levelFk: form.levelFk,
      degreeFk: form.degreeFk,
      phoneNo: encrypt(`${form.phoneNo}`),
      winwinYn: form.winwinYn,
      sex: form.sex,
      blackCnt: form.blackCnt,
      dormancyYn: form.dormancyYn,
      leaveYn: form.leaveYn,
      banYn: form.banYn,
      joinDt: form.joinDt,
    });
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.innerWrap}>
        <PageTitle title="회원 추가" />
        <div className={styles.contents}>
          <div className={styles.content}>
            <div className={styles.title}>이름</div>
            <div className={styles.input}>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={useChange}
              />
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.title}>생년월일</div>
            <div className={styles.input}>
              <input
                name="birthDt"
                type="date"
                value={form.birthDt}
                onChange={useChange}
              />
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.title}>레벨</div>
            <div className={styles.input}>
              <select name="levelFk" value={form.levelFk} onChange={useChange}>
                {levelOptions.map(({ id, level, color }: GetLevelsType) => (
                  <option key={id} value={id}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.title}>기수</div>
            <div className={styles.input}>
              <select
                name="degreeFk"
                value={form.degreeFk}
                onChange={useChange}
              >
                {degreeOptions.map(({ id, degree }: GetDegreesType) => (
                  <option key={id} value={id}>
                    {degree}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.title}>휴대폰 번호</div>
            <div className={styles.input}>
              <input
                name="phoneNo"
                type="numeric"
                value={form.phoneNo}
                onChange={useChange}
              />
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.title}>상생 여부</div>
            <div className={styles.input}>
              <select
                name="winwinYn"
                value={form.winwinYn}
                onChange={useChange}
              >
                <option value="N">X</option>
                <option value="Y">O</option>
              </select>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.title}>성별</div>
            <div className={styles.input}>
              <select name="sex" value={form.sex} onChange={useChange}>
                <option value="M">남성</option>
                <option value="F">여성</option>
              </select>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.title}>블랙 카운트</div>
            <div className={styles.input}>
              <input
                name="blackCnt"
                type="number"
                value={form.blackCnt}
                max={3}
                min={0}
                onBlur={handleBlur}
                onChange={useChange}
              />
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.title}>휴면 여부</div>
            <div className={styles.input}>
              <select
                name="dormancyYn"
                value={form.dormancyYn}
                onChange={useChange}
              >
                <option value="N">X</option>
                <option value="Y">O</option>
              </select>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.title}>탈퇴 여부</div>
            <div className={styles.input}>
              <select name="leaveYn" value={form.leaveYn} onChange={useChange}>
                <option value="N">X</option>
                <option value="Y">O</option>
              </select>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.title}>강퇴 여부</div>
            <div className={styles.input}>
              <select name="banYn" value={form.banYn} onChange={useChange}>
                <option value="N">X</option>
                <option value="Y">O</option>
              </select>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.title}>가입 날짜</div>
            <div className={styles.input}>
              <input
                name="joinDt"
                type="date"
                value={form.joinDt}
                onChange={useChange}
              />
            </div>
          </div>
        </div>
        <div className={styles.btnBox}>
          <button onClick={useInsertMember}>확인</button>
        </div>
      </div>
    </div>
  );
}

interface TypeInsertMember {}

export default connect(mapStateToProps, mapDispatchToProps)(InsertMember);
