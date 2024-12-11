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
import { DOMAIN } from 'modules/constants';
import { GetAdminsType, GetDegreesType, GetLevelsType } from 'modules/apiTypes';
import { decrypt, encrypt } from 'modules/utils';
import PageTitle from 'components/pageTitle';
import CommonInput from 'components/commonInput';
import UpdateInput from 'components/updateInput';
import GridTable from 'components/gridTable';
import { levelCellRenderer } from 'components/gridTable/components';
import styles from './UpdateMember.module.scss';

function mapStateToProps(state: PropState) {
  return {};
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {};
}

function UpdateMember({}: TypeUpdateMember) {
  const [levelOptions, setLevelOptions] = useState<GetLevelsType[]>([]);
  const [degreeOptions, setDegreeOptions] = useState<GetDegreesType[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const { form, setForm, useChange } = useChangeHook({
    /* 검색 필드 */
    name: '',
    startBirthDt: '',
    endBirthDt: '',
    levelFk: '',
    degreeFk: '',
    phoneNo: '',
    winwinYn: '',
    sex: '',
    blackCnt: '',
    dormancyYn: '',
    leaveYn: '',
    banYn: '',
    startJoinDt: '',
    endJoinDt: '',
    startLeaveDt: '',
    endLeaveDt: '',
    startBanDt: '',
    endBanDt: '',
    /* 수정 필드 */
    selectedId: '',
    selectedName: '',
    selectedBirthDt: '',
    selectedLevelFk: '',
    selectedDegreeFk: '',
    selectedPhoneNo: '',
    selectedWinwinYn: '',
    selectedSex: '',
    selectedBlackCnt: '',
    selectedDormancyYn: '',
    selectedLeaveYn: '',
    selectedBanYn: '',
    selectedJoinDt: '',
    selectedLeaveDt: '',
    selectedBanDt: '',
    selectedImage: '',
    selectedUpdateReason: '',
    selectedDormancyReason: '',
    selectedLeaveReason: '',
    selectedBanReason: '',
    /* 변수 필드 */
    isActive: 'N',
    isUpdated: false,
  });

  const columns = [
    { field: '이름' },
    { field: '기수' },
    { field: '생년월일' },
    { field: '휴대폰 번호' },
    { field: '레벨', cellRenderer: levelCellRenderer },
    { field: '상생 여부' },
    { field: '성별' },
    { field: '블랙 카운트' },
    { field: '휴면 여부' },
    { field: '탈퇴 여부' },
    { field: '강퇴 여부' },
  ];

  useEffect(() => {
    useGetLevels();
    useGetDegrees();
    usePostMembers();
  }, []);

  // FIXME: usePostUpdateMember의 successCb에서 usePostMembers 요청시 이전 accessToken으로 요청하여 대안으로 useEffect 사용
  useEffect(() => {
    if (form.isUpdated) {
      usePostMembers({
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

  // 회원 리스트 조회
  const { usePostData: usePostMembers } = usePostDataHook({
    url: `${DOMAIN}/api/get-members`,
    successCb: (response) => {
      const decryptedResponse = response.map((admin: GetAdminsType) => ({
        ...admin,
        name: decrypt(admin.name),
        birthDt: decrypt(admin.birthDt),
        phoneNo: decrypt(admin.phoneNo),
      }));

      setMembers(decryptedResponse);
    },
  });

  // 레벨 가져오기
  const { useGetData: useGetLevels } = useGetDataHook({
    url: `${DOMAIN}/api/get-levels`,
    successCb: (response) => {
      setLevelOptions([{ id: '', level: '전체', color: '' }, ...response]);
    },
  });

  // 기수 가져오기
  const { useGetData: useGetDegrees } = useGetDataHook({
    url: `${DOMAIN}/api/get-degrees`,
    successCb: (response) => {
      setDegreeOptions([{ id: '', degree: '전체' }, ...response]);
    },
  });

  // 리스트 클릭 후 회원 정보 가져오기
  const { usePostData: useGetMemberInfo } = usePostDataHook({
    url: `${DOMAIN}/api/get-member-info`,
    successCb: (response) => {
      const {
        id,
        name,
        birthDt,
        levelFk,
        degreeFk,
        phoneNo,
        winwinYn,
        sex,
        blackCnt,
        dormancyYn,
        leaveYn,
        banYn,
        joinDt,
        leaveDt,
        banDt,
        image,
        updateReason,
        dormancyReason,
        leaveReason,
        banReason,
      } = response;

      setForm((prevState) => ({
        ...prevState,
        selectedId: id,
        selectedName: decrypt(name),
        selectedBirthDt: decrypt(birthDt),
        selectedLevelFk: levelFk,
        selectedDegreeFk: degreeFk,
        selectedPhoneNo: decrypt(phoneNo),
        selectedWinwinYn: winwinYn,
        selectedSex: sex,
        selectedBlackCnt: blackCnt,
        selectedDormancyYn: dormancyYn,
        selectedLeaveYn: leaveYn,
        selectedBanYn: banYn,
        selectedJoinDt: decrypt(joinDt),
        selectedLeaveDt: decrypt(leaveDt),
        selectedBanDt: decrypt(banDt),
        selectedImage: image,
        selectedUpdateReason: updateReason || '',
        selectedDormancyReason: dormancyReason || '',
        selectedLeaveReason: leaveReason || '',
        selectedBanReason: banReason || '',
        isActive: 'Y',
      }));
    },
    failCb: () => {
      setForm((prevState) => ({
        ...prevState,
        selectedId: '',
        isActive: 'N',
      }));
    },
  });

  // 회원 정보 수정
  const { usePostData: usePostUpdateMember } = usePostDataHook({
    url: `${DOMAIN}/api/update-member`,
    beforeCb: () => {
      if (!form.selectedName) throw new Error('회원 이름을<br/>입력해주세요.');
      if (!form.selectedUpdateReason)
        throw new Error('갱신 사유를<br/>입력해주세요.');
    },
    successCb: () => {
      handleInitUpdateFields();
      setForm((prevState) => ({
        ...prevState,
        isUpdated: true,
      }));
    },
    failCb: () => handleInitUpdateFields(),
  });

  // blackCnt input onBlur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const { value, name } = e.target;
    let blackCnt: number | string = 0;

    if (+value > 3) blackCnt = 3;
    else if (value === '') {
      if (name === 'blackCnt') blackCnt = '';
      else if (name === 'selectedBlackCnt') blackCnt = 0;
    } else if (Number.isNaN(+e.target.value)) blackCnt = 0;
    else blackCnt = +value;

    setForm((prevState) => ({
      ...prevState,
      [name]: blackCnt,
    }));
  };

  // 검색
  const handleSearch = () => {
    usePostMembers({
      ...form,
      name: encrypt(`${form.name}`),
      phoneNo: encrypt(`${form.phoneNo}`),
    });
  };

  // 이름 및 휴대폰 번호 입력 후 엔터 콜백
  const useEnterKeyDown = useEnterKeyDownHook(form, handleSearch);

  // 리스트 클릭 시 회원 수정 팝업
  const handleClickRow = (data: any) => {
    useGetMemberInfo({
      id: data.id,
    });
  };

  // 수정 팝업 필드 초기화
  const handleInitUpdateFields = () => {
    setForm((prevState) => ({
      ...prevState,
      selectedId: '',
      selectedName: '',
      selectedBirthDt: '',
      selectedLevelFk: '',
      selectedDegreeFk: '',
      selectedPhoneNo: '',
      selectedWinwinYn: '',
      selectedSex: '',
      selectedBlackCnt: '',
      selectedDormancyYn: '',
      selectedLeaveYn: '',
      selectedBanYn: '',
      selectedJoinDt: '',
      selectedLeaveDt: '',
      selectedBanDt: '',
      selectedImage: '',
      selectedUpdateReason: '',
      selectedDormancyReason: '',
      selectedLeaveReason: '',
      selectedBanReason: '',
      isActive: 'N',
    }));
  };

  // 회원 수정 버튼 콜백
  const handleSubmit = () => {
    usePostUpdateMember({
      id: form.selectedId,
      name: encrypt(`${form.selectedName}`),
      birthDt: encrypt(`${form.selectedBirthDt}`),
      levelFk: form.selectedLevelFk,
      degreeFk: form.selectedDegreeFk,
      phoneNo: encrypt(`${form.selectedPhoneNo}`),
      winwinYn: form.selectedWinwinYn,
      sex: form.selectedSex,
      blackCnt: form.selectedBlackCnt,
      dormancyYn: form.selectedDormancyYn,
      leaveYn: form.selectedLeaveYn,
      banYn: form.selectedBanYn,
      joinDt: form.selectedJoinDt,
      leaveDt: form.selectedLeaveDt,
      banDt: form.selectedBanDt,
      image: form.selectedImage,
      updateReason: form.selectedUpdateReason,
      dormancyReason: form.selectedDormancyReason,
      leaveReason: form.selectedLeaveReason,
      banReason: form.selectedBanReason,
    });
  };

  return (
    <>
      {form.isActive === 'Y' && (
        <>
          <div className={styles.background} onClick={handleInitUpdateFields} />
          <div className={styles.modalBody}>
            <h3>회원 수정</h3>
            <div className={styles.modalInputBox}>
              <div className={styles.updateInputs}>
                <UpdateInput
                  title="이름"
                  tagType="input"
                  name="selectedName"
                  type="text"
                  value={`${form.selectedName}`}
                  onChange={useChange}
                />
                <UpdateInput
                  title="레벨"
                  tagType="select"
                  name="selectedLevelFk"
                  value={`${form.selectedLevelFk}`}
                  options={levelOptions
                    .map(({ id, level }) => ({
                      id: `selectedLevelFk${id}`,
                      value: id,
                      label: level,
                    }))
                    .filter((_, idx) => idx !== 0)}
                  onChange={useChange}
                />
              </div>
              <div className={styles.updateInputs}>
                <UpdateInput
                  title="휴대폰 번호"
                  tagType="input"
                  name="selectedPhoneNo"
                  type="text"
                  value={`${form.selectedPhoneNo}`}
                  onChange={useChange}
                />
                <UpdateInput
                  title="기수"
                  tagType="select"
                  name="selectedDegreeFk"
                  type="select"
                  value={`${form.selectedDegreeFk}`}
                  options={degreeOptions
                    .map(({ id, degree }) => ({
                      id: `selectedDegreeFk${id}`,
                      value: id,
                      label: degree,
                    }))
                    .filter((_, idx) => idx !== 0)}
                  onChange={useChange}
                />
              </div>
              <div className={styles.updateInputs}>
                <UpdateInput
                  title="생년월일"
                  tagType="input"
                  name="selectedBirthDt"
                  type="date"
                  value={`${form.selectedBirthDt}`}
                  onChange={useChange}
                />
                <UpdateInput
                  title="상생 여부"
                  tagType="select"
                  name="selectedWinwinYn"
                  type="select"
                  value={`${form.selectedWinwinYn}`}
                  options={[
                    { id: 'selectedWinwinYnN', value: 'N', label: 'X' },
                    { id: 'selectedWinwinYnY', value: 'Y', label: 'O' },
                  ]}
                  onChange={useChange}
                />
              </div>
              <div className={styles.updateInputs}>
                <UpdateInput
                  title="성별"
                  tagType="select"
                  name="selectedSex"
                  type="select"
                  value={`${form.selectedSex}`}
                  options={[
                    { id: 'selectedM', value: 'M', label: '남성' },
                    { id: 'selectedF', value: 'F', label: '여성' },
                  ]}
                  onChange={useChange}
                />
                <UpdateInput
                  title="블랙 카운트"
                  tagType="input"
                  name="selectedBlackCnt"
                  type="number"
                  value={`${form.selectedBlackCnt}`}
                  max={3}
                  min={0}
                  onChange={useChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className={styles.updateInputs}>
                <UpdateInput
                  title="휴면 여부"
                  tagType="select"
                  name="selectedDormancyYn"
                  type="select"
                  value={`${form.selectedDormancyYn}`}
                  options={[
                    { id: 'selectedDormancyYnN', value: 'N', label: 'X' },
                    { id: 'selectedDormancyYnY', value: 'Y', label: 'O' },
                  ]}
                  onChange={useChange}
                />
                <UpdateInput
                  title="탈퇴 여부"
                  tagType="select"
                  name="selectedLeaveYn"
                  type="select"
                  value={`${form.selectedLeaveYn}`}
                  options={[
                    { id: 'selectedLeaveYnN', value: 'N', label: 'X' },
                    { id: 'selectedLeaveYnY', value: 'Y', label: 'O' },
                  ]}
                  onChange={useChange}
                />
              </div>
              <div className={styles.updateInputs}>
                <UpdateInput
                  title="강퇴 여부"
                  tagType="select"
                  name="selectedBanYn"
                  type="select"
                  value={`${form.selectedBanYn}`}
                  options={[
                    { id: 'selectedBanYnN', value: 'N', label: 'X' },
                    { id: 'selectedBanYnY', value: 'Y', label: 'O' },
                  ]}
                  onChange={useChange}
                />
                <UpdateInput
                  title="가입 날짜"
                  tagType="input"
                  name="selectedJoinDt"
                  type="date"
                  value={`${form.selectedJoinDt}`}
                  onChange={useChange}
                />
              </div>
              <div className={styles.updateInputs}>
                <UpdateInput
                  title="탈퇴 날짜"
                  tagType="input"
                  name="selectedLeaveDt"
                  type="date"
                  value={`${form.selectedLeaveDt}`}
                  onChange={useChange}
                />
                <UpdateInput
                  title="강퇴 날짜"
                  tagType="input"
                  name="selectedBanDt"
                  type="date"
                  value={`${form.selectedBanDt}`}
                  onChange={useChange}
                />
              </div>
              <div className={styles.updateInputs}>
                <UpdateInput
                  title="휴면 사유"
                  tagType="textarea"
                  name="selectedDormancyReason"
                  value={`${form.selectedDormancyReason}`}
                  onChange={useChange}
                />
                <UpdateInput
                  title="탈퇴 사유"
                  tagType="textarea"
                  name="selectedLeaveReason"
                  value={`${form.selectedLeaveReason}`}
                  onChange={useChange}
                />
              </div>
              <div className={styles.updateInputs}>
                <UpdateInput
                  title="강퇴 사유"
                  tagType="textarea"
                  name="selectedBanReason"
                  value={`${form.selectedBanReason}`}
                  onChange={useChange}
                />
                <UpdateInput
                  title="갱신 사유"
                  tagType="textarea"
                  name="selectedUpdateReason"
                  value={`${form.selectedUpdateReason}`}
                  required
                  onChange={useChange}
                />
              </div>
            </div>
            <button onClick={handleSubmit}>수정</button>
          </div>
        </>
      )}
      <div className={styles.wrap}>
        <div className={styles.innerWrap}>
          <PageTitle title="회원 수정" />
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
                    title="레벨"
                    tagType="select"
                    name="levelFk"
                    value={`${form.levelFk}`}
                    options={levelOptions.map(
                      ({ id, level }: GetLevelsType) => ({
                        id,
                        value: id,
                        label: level,
                      }),
                    )}
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
              <div className={styles.inputs}>
                <div className={styles.input}>
                  <CommonInput
                    title="생년월일"
                    tagType="input"
                    name="startBirthDt"
                    subName="endBirthDt"
                    type="date"
                    value={`${form.startBirthDt}`}
                    subValue={`${form.endBirthDt}`}
                    onChange={useChange}
                  />
                </div>
                <div className={styles.input}>
                  <CommonInput
                    title="상생 여부"
                    tagType="select"
                    name="winwinYn"
                    value={`${form.winwinYn}`}
                    options={[
                      { id: 'winwinYn', value: '', label: '전체' },
                      { id: 'N', value: 'N', label: 'X' },
                      { id: 'Y', value: 'Y', label: 'O' },
                    ]}
                    onChange={useChange}
                  />
                </div>
              </div>
              <div className={styles.inputs}>
                <div className={styles.input}>
                  <CommonInput
                    title="성별"
                    tagType="select"
                    name="sex"
                    value={`${form.sex}`}
                    options={[
                      { id: 'sex', value: '', label: '전체' },
                      { id: 'M', value: 'M', label: '남성' },
                      { id: 'F', value: 'F', label: '여성' },
                    ]}
                    onChange={useChange}
                  />
                </div>
                <div className={styles.input}>
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
                </div>
              </div>
              <div className={styles.inputs}>
                <div className={styles.input}>
                  <CommonInput
                    title="휴면 여부"
                    tagType="select"
                    name="dormancyYn"
                    value={`${form.dormancyYn}`}
                    options={[
                      { id: 'dormancyYn', value: '', label: '전체' },
                      { id: 'N', value: 'N', label: 'X' },
                      { id: 'Y', value: 'Y', label: 'O' },
                    ]}
                    onChange={useChange}
                  />
                </div>
                <div className={styles.input}>
                  <CommonInput
                    title="탈퇴 여부"
                    tagType="select"
                    name="leaveYn"
                    value={`${form.leaveYn}`}
                    options={[
                      { id: 'leaveYn', value: '', label: '전체' },
                      { id: 'N', value: 'N', label: 'X' },
                      { id: 'Y', value: 'Y', label: 'O' },
                    ]}
                    onChange={useChange}
                  />
                </div>
              </div>
              <div className={styles.inputs}>
                <div className={styles.input}>
                  <CommonInput
                    title="강퇴 여부"
                    tagType="select"
                    name="banYn"
                    value={`${form.banYn}`}
                    options={[
                      { id: 'banYn', value: '', label: '전체' },
                      { id: 'N', value: 'N', label: 'X' },
                      { id: 'Y', value: 'Y', label: 'O' },
                    ]}
                    onChange={useChange}
                  />
                </div>
                <div className={styles.input}>
                  <CommonInput
                    title="가입 날짜"
                    tagType="input"
                    name="startJoinDt"
                    subName="endJoinDt"
                    type="date"
                    value={`${form.startJoinDt}`}
                    subValue={`${form.endJoinDt}`}
                    onChange={useChange}
                  />
                </div>
              </div>
              <div className={styles.inputs}>
                <div className={styles.input}>
                  <CommonInput
                    title="탈퇴 날짜"
                    tagType="input"
                    name="startLeaveDt"
                    subName="endLeaveDt"
                    type="date"
                    value={`${form.startLeaveDt}`}
                    subValue={`${form.endLeaveDt}`}
                    onChange={useChange}
                  />
                </div>
                <div className={styles.input}>
                  <CommonInput
                    title="강퇴 날짜"
                    tagType="input"
                    name="startBanDt"
                    subName="endBanDt"
                    type="date"
                    value={`${form.startBanDt}`}
                    subValue={`${form.endBanDt}`}
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
                lists={members.map((member) => ({
                  ...member,
                  이름: member.name,
                  기수: member.degree,
                  생년월일: member.birthDt,
                  '휴대폰 번호': member.phoneNo,
                  레벨: `${member.level}&nbsp<span style="background-color: ${member.color}; padding: 0 10px;"/>`,
                  '상생 여부': member.winwinYn,
                  성별: member.sex,
                  '블랙 카운트': member.blackCnt,
                  '휴면 여부': member.dormancyYn,
                  '탈퇴 여부': member.leaveYn,
                  '강퇴 여부': member.banYn,
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

interface TypeUpdateMember {}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateMember);
