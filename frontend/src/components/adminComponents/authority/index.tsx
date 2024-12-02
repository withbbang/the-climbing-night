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
import { levelCellRenderer } from 'components/gridTable/components';
import { Radio, RadioGroup } from 'components/radio';
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
    },
  ];
  const { form, setForm, useChange } = useChangeHook({
    name: '',
    grade: '',
    phoneNo: '',
    degree: '',
    isActive: 'N',
    selectedId: '',
    selectedGrade: '',
    isUpdated: false,
  });

  useEffect(() => {
    useGetDegrees();
    usePostAdmins({
      ...form,
      name: encrypt(`${form.name}`),
      phoneNo: encrypt(`${form.phoneNo}`),
    });
  }, []);

  // FIXME: usePostUpdateAuthority의 successCb에서 usePostAdmins 요청시 이전 accessToken으로 요청하여 대안으로 useEffect 사용
  useEffect(() => {
    if (form.isUpdated) {
      usePostAdmins({
        ...form,
        name: encrypt(`${form.name}`),
        phoneNo: encrypt(`${form.phoneNo}`),
      });

      setForm((prevState) => ({
        ...prevState,
        isUpdated: false,
      }));
    }
  }, [form.isUpdated]);

  // 어드민 리스트 조회
  const { usePostData: usePostAdmins } = usePostDataHook({
    url: `${DOMAIN}/api/get-admins`,
    successCb: (response) => {
      const decryptedResponse = response.map((admin: GetAdminsType) => ({
        ...admin,
        name: decrypt(admin.name),
        birthDt: decrypt(admin.birthDt),
        phoneNo: decrypt(admin.phoneNo),
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

  // 권한 수정
  const { usePostData: usePostUpdateAuthority } = usePostDataHook({
    url: `${DOMAIN}/api/update-authority`,
    beforeCb: () => {
      const grade = admins.filter(
        (admin: GetAdminsType) => admin.id === form.selectedId,
      )[0]?.grade;

      if (grade === form.selectedGrade) throw new Error('동일한 권한입니다.');
    },
    successCb: () => {
      setForm((prevState) => ({
        ...prevState,
        isActive: 'N',
        selectedId: '',
        selectedGrade: '',
        isUpdated: true,
      }));
    },
    failCb: () => {
      setForm((prevState) => ({
        ...prevState,
        isActive: 'N',
        selectedId: '',
        selectedGrade: '',
      }));
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

  // 리스트 클릭 시 권한 수정 팝업
  const handleClickRow = (data: any) => {
    setForm((prevState) => ({
      ...prevState,
      isActive: 'Y',
      selectedId: data.id,
      selectedGrade: data.grade,
    }));
  };

  // 권한 변경 팝업 내 권한 클릭
  const handleClickAuthority = (grade: string) => {
    setForm((prevState) => ({
      ...prevState,
      selectedGrade: grade,
    }));
  };

  // 권한 수정 버튼 콜백
  const handleSubmit = () => {
    usePostUpdateAuthority({
      id: form.selectedId,
      grade: form.selectedGrade,
    });
  };

  return (
    <>
      {form.isActive === 'Y' && (
        <>
          <div
            className={styles.background}
            onClick={() =>
              setForm((prevState) => ({
                ...prevState,
                isActive: 'N',
                selectedId: '',
                selectedGrade: '',
              }))
            }
          />
          <div className={styles.modalBody}>
            <RadioGroup label="권한 변경">
              {grade
                .filter((item) => item.value !== '')
                .map((item) => (
                  <Radio
                    key={item.label}
                    selectedValue={`${form.selectedGrade}`}
                    value={item.value}
                    onClick={handleClickAuthority}
                  >
                    {item.label}
                  </Radio>
                ))}
            </RadioGroup>
            <button onClick={handleSubmit}>수정</button>
          </div>
        </>
      )}
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
    </>
  );
}

interface TypeAuthority {
  handleSetSelectedSidebar: (selectedSidebar: string) => void;
}

export default connect(mapStateToProps, mapDispatchToProps)(Authority);
