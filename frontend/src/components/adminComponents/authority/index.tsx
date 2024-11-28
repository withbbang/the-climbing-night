import React, { useEffect, useState } from 'react';
import { PropState } from 'middlewares/configureReducer';
import { connect } from 'react-redux';
import { Action } from 'redux';
import {
  useChangeHook,
  useEnterKeyDownHook,
  useGetDataHook,
  usePostDataHook,
} from 'modules/customHooks';
import { DOMAIN, GRADE } from 'modules/constants';
import { GetAdminsType, GetDegreesType } from 'modules/apiTypes';
import { useSetSelectedSidebarToken } from 'middlewares/reduxToolkits/sidebar';
import { decrypt, encrypt } from 'modules/utils';
import PageTitle from 'components/pageTitle';
import CommonInput from 'components/commonInput';
import GridTable from 'components/gridTable';
import {
  levelCellRenderer,
  buttonCellRenderer,
} from 'components/gridTable/components';
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
  const [admins, setAdmins] = useState<GetAdminsType[]>([]);
  const [degreeOptions, setDegreeOptions] = useState<GetDegreesType[]>([
    { id: '', degree: '전체' },
  ]);
  const grade = [
    {
      value: '',
      label: '전체',
    },
    ...GRADE,
  ];
  const columns = [
    { field: '이름' },
    { field: '기수' },
    { field: '생년월일', flex: 2 },
    { field: '휴대폰 번호', flex: 2 },
    { field: '아이디', flex: 2 },
    { field: '레벨', cellRenderer: levelCellRenderer },
    {
      field: '권한',
      cellRenderer: (props: any) =>
        buttonCellRenderer(props, () => console.log('clicked')),
    },
  ];
  const { form, useChange } = useChangeHook({
    name: '',
    grade: '',
    phoneNo: '',
    degree: '',
  });

  useEffect(() => {
    useGetDegrees();
    usePostAdmins({
      ...form,
      name: encrypt(`${form.name}`),
      phoneNo: encrypt(`${form.phoneNo}`),
    });
  }, []);

  // 어드민 리스트 조회
  const { usePostData: usePostAdmins } = usePostDataHook({
    url: `${DOMAIN}/api/get-admins`,
    successCb: (response) => {
      const decryptedResponse = response.map((item: any) => ({
        ...item,
        name: decrypt(item.name),
        birthDt: decrypt(item.birthDt),
        phoneNo: decrypt(item.phoneNo),
      }));

      setAdmins(decryptedResponse);
    },
  });

  // 기수 가져오기
  const { useGetData: useGetDegrees } = useGetDataHook({
    url: `${DOMAIN}/api/get-degrees`,
    successCb: (response) => {
      setDegreeOptions([...degreeOptions, ...response]);
    },
  });

  // 검색
  const handleSearch = () => {
    usePostAdmins({
      ...form,
      name: encrypt(`${form.name}`),
      phoneNo: encrypt(`${form.phoneNo}`),
    });
  };

  // 이름 및 휴대폰 번호 입력 후 엔터 콜백
  const useEnterKeyDown = useEnterKeyDownHook(form, handleSearch);

  // 디테일 페이지로 이동
  const handleClickRow = (id: string) => {
    // TODO: move page
  };

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
                  onKeyDown={useEnterKeyDown}
                />
              </div>
              <div className={styles.input}>
                <CommonInput
                  title="등급"
                  tagType="select"
                  name="grade"
                  value={`${form.grade}`}
                  options={grade.map(({ value, label }) => ({
                    id: value,
                    value,
                    label,
                  }))}
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
                  onKeyDown={useEnterKeyDown}
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
            <button onClick={handleSearch}>확인</button>
          </div>
          <div className={styles.listBox}>
            <GridTable
              columns={columns}
              lists={admins.map((admin) => ({
                ...admin,
                이름: admin.name,
                기수: admin.degree,
                생년월일: admin.birthDt,
                '휴대폰 번호': admin.phoneNo,
                아이디: admin.memberId,
                레벨: `${admin.level}&nbsp<span style="background-color: ${admin.color}; padding: 0 10px;"/>`,
                권한: grade.find(({ value }) => value === admin.grade)?.label, // TODO: DB 테이블 만들까 고민
              }))}
              onClickRow={handleClickRow}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface TypeAuthority {
  handleSetSelectedSidebar: (selectedSidebar: string) => void;
}

export default connect(mapStateToProps, mapDispatchToProps)(Authority);
