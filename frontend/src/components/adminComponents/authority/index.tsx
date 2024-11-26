import React, { useEffect, useState } from 'react';
import { PropState } from 'middlewares/configureReducer';
import { connect } from 'react-redux';
import { Action } from 'redux';
import {
  useChangeHook,
  useGetDataHook,
  usePostDataHook,
} from 'modules/customHooks';
import { DOMAIN } from 'modules/constants';
import { GetDegreesType, GetLevelsType } from 'modules/apiTypes';
import { useSetSelectedSidebarToken } from 'middlewares/reduxToolkits/sidebar';
import { encrypt } from 'modules/utils';
import PageTitle from 'components/pageTitle';
import CommonInput from 'components/commonInput';
import styles from './Authority.module.scss';

function mapStateToProps(state: PropState) {
  return {};
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {
    handleSetSelectedSidebar: (selectedSidebar: string): void => {
      dispatch(useSetSelectedSidebarToken({ selectedSidebar }));
    },
  };
}

function Authority({ handleSetSelectedSidebar }: TypeAuthority) {
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
    beforeCb: () => {
      if (!form.name) throw new Error('회원 이름을<br/>입력해주세요.');
      if (!form.joinDt) throw new Error('가입 날짜를<br/>입력해주세요.');
    },
    successCb: () => {
      handleSetSelectedSidebar('update-memeber');
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
  const useAuthority = () => {
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
          <div className={styles.inputBox}>
            <CommonInput
              title="이름"
              tagType="input"
              name="name"
              type="text"
              value={`${form.name}`}
              required
              onChange={useChange}
            />
            <CommonInput
              title="생년월일"
              tagType="input"
              name="birthDt"
              type="date"
              value={`${form.birthDt}`}
              onChange={useChange}
            />
            <CommonInput
              title="레벨"
              tagType="select"
              name="levelFk"
              value={`${form.levelFk}`}
              options={levelOptions.map(
                ({ id, level, color }: GetLevelsType) => ({
                  id,
                  value: id,
                  label: `${level} (${color})`,
                }),
              )}
              onChange={useChange}
            />
            <CommonInput
              title="기수"
              tagType="select"
              name="degreeFk"
              value={`${form.degreeFk}`}
              options={degreeOptions.map(({ id, degree }: GetDegreesType) => ({
                id,
                value: id,
                label: degree,
              }))}
              onChange={useChange}
            />
            <CommonInput
              title="휴대폰 번호"
              tagType="input"
              name="phoneNo"
              type="numeric"
              value={`${form.phoneNo}`}
              onChange={useChange}
            />
            <CommonInput
              title="상생 여부"
              tagType="select"
              name="winwinYn"
              value={`${form.winwinYn}`}
              options={[
                { id: 'N', value: 'N', label: 'X' },
                { id: 'Y', value: 'Y', label: 'O' },
              ]}
              onChange={useChange}
            />
            <CommonInput
              title="성별"
              tagType="select"
              name="sex"
              value={`${form.sex}`}
              options={[
                { id: 'M', value: 'M', label: '남성' },
                { id: 'F', value: 'F', label: '여성' },
              ]}
              onChange={useChange}
            />
            <CommonInput
              title="블랙 카운트"
              tagType="input"
              name="blackCnt"
              type="number"
              value={`${form.blackCnt}`}
              max={3}
              min={0}
              onChange={useChange}
              onBlur={handleBlur}
            />
            <CommonInput
              title="휴면 여부"
              tagType="select"
              name="dormancyYn"
              value={`${form.dormancyYn}`}
              options={[
                { id: 'N', value: 'N', label: 'X' },
                { id: 'Y', value: 'Y', label: 'O' },
              ]}
              onChange={useChange}
            />
            <CommonInput
              title="탈퇴 여부"
              tagType="select"
              name="leaveYn"
              value={`${form.leaveYn}`}
              options={[
                { id: 'N', value: 'N', label: 'X' },
                { id: 'Y', value: 'Y', label: 'O' },
              ]}
              onChange={useChange}
            />
            <CommonInput
              title="강퇴 여부"
              tagType="select"
              name="banYn"
              value={`${form.banYn}`}
              options={[
                { id: 'N', value: 'N', label: 'X' },
                { id: 'Y', value: 'Y', label: 'O' },
              ]}
              onChange={useChange}
            />
            <CommonInput
              title="가입 날짜"
              tagType="input"
              name="joinDt"
              type="date"
              value={`${form.joinDt}`}
              required
              onChange={useChange}
            />
          </div>
          <div className={styles.listBox}></div>
        </div>
      </div>
    </div>
  );
}

interface TypeAuthority {
  handleSetSelectedSidebar: (selectedSidebar: string) => void;
}

export default connect(mapStateToProps, mapDispatchToProps)(Authority);
