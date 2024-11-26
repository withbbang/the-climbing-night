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
  const [degreeOptions, setDegreeOptions] = useState<GetDegreesType[]>([
    { id: '', degree: '전체' },
  ]);
  const grade = [
    {
      id: '',
      value: '',
      label: '전체',
    },
    {
      id: '50',
      value: '50',
      label: '관리자 요청',
    },
    {
      id: '40',
      value: '40',
      label: '매니져',
    },
    {
      id: '30',
      value: '30',
      label: '운영진',
    },
    {
      id: '20',
      value: '20',
      label: '부회장',
    },
    {
      id: '10',
      value: '10',
      label: '회장',
    },
    {
      id: '0',
      value: '0',
      label: '관리자',
    },
  ];
  const { form, setForm, useChange } = useChangeHook({
    name: '',
    grade: '',
    phoneNo: '',
    degree: '',
  });

  useEffect(() => {
    useGetDegrees();
  }, []);

  // 기수 가져오기
  const { useGetData: useGetDegrees } = useGetDataHook({
    url: `${DOMAIN}/api/get-degrees`,
    successCb: (response) => {
      setDegreeOptions([...degreeOptions, ...response]);
    },
  });

  return (
    <div className={styles.wrap}>
      <div className={styles.innerWrap}>
        <PageTitle title="권한 관리" />
        <div className={styles.contents}>
          <div className={styles.inputBox}>
            <div className={styles.inputs}>
              <div className={styles.input}>
                <CommonInput
                  title="이름"
                  tagType="input"
                  name="name"
                  type="text"
                  value={`${form.name}`}
                  onChange={useChange}
                />
              </div>
              <div className={styles.input}>
                <CommonInput
                  title="등급"
                  tagType="select"
                  name="grade"
                  value={`${form.grade}`}
                  options={grade}
                  onChange={useChange}
                />
              </div>
            </div>
            <div className={styles.inputs}>
              <div className={styles.input}>
                <CommonInput
                  title="휴대폰 번호"
                  tagType="input"
                  name="phoneNo"
                  type="numeric"
                  value={`${form.phoneNo}`}
                  onChange={useChange}
                />
              </div>
              <div className={styles.input}>
                <CommonInput
                  title="기수"
                  tagType="select"
                  name="degreeFk"
                  value={`${form.degreeFk}`}
                  options={degreeOptions.map(
                    ({ id, degree }: GetDegreesType) => ({
                      id,
                      value: id,
                      label: degree,
                    }),
                  )}
                  onChange={useChange}
                />
              </div>
            </div>
          </div>
          <div className={styles.btnBox}>
            <button>확인</button>
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
