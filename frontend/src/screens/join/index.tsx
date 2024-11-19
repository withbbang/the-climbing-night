import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { PropState } from 'middlewares/configureReducer';
import {
  useEnterKeyDownHook,
  useChangeHook,
  usePostDataHook,
} from 'modules/customHooks';
import Header from 'components/header';
import AuthInput from 'components/authInput';
import { DOMAIN } from 'modules/constants';
import { GetMemberInfoByJoin } from 'modules/apiTypes';
import styles from './Join.module.scss';

function mapStateToProps(state: PropState) {
  return {};
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {};
}

function Join({}: TypeJoinIn): React.JSX.Element {
  const navigate = useNavigate();
  const [isPopupActive, setIsPopupActive] = useState<boolean>(false);
  const [memberInfos, setMemberInfos] = useState<Array<GetMemberInfoByJoin>>(
    [],
  );
  const { form, setForm, useChange } = useChangeHook({
    email: '',
    password: '',
    id: '',
    information: '',
    name: '',
  });

  // 회원 정보 가져오기
  const { usePostData: usePostGetMemberInfo } = usePostDataHook({
    url: `${DOMAIN}/api/get-member-info-by-join`,
    beforeCb: () => {
      if (!form.name) throw new Error('회원 이름을<br/>입력해주세요.');
    },
    successCb: (response) => {
      if (response.length === 1) {
        setForm((prevState) => ({
          ...prevState,
          id: response[0].id,
          information: `${response[0].degree} ${
            response[0].name
          } ${`${response[0].birthDt}`.substring(2, 4)}`,
        }));
      } else if (response.length > 1) {
        handleSetMemberInfos(response);
      }
    },
    failCb: () => {
      setForm((prevState) => ({
        ...prevState,
        id: '',
        information: '',
      }));
    },
  });

  // admin 등록
  const { usePostData: usePostJoin } = usePostDataHook({
    url: `${DOMAIN}/api/join`,
    beforeCb: () => {
      if (!form.email) throw new Error('이메일을<br/>입력해주세요.');
      if (!form.password) throw new Error('비밀번호를<br/>입력해주세요.');
      if (!form.id) throw new Error('회원을 선택해주세요.');
    },
    successCb: () => {
      navigate('/login', { replace: true });
    },
  });

  // 이메일, 비밀번호 입력 후 엔터 콜백
  const useJoinEnterKeyDown = useEnterKeyDownHook(form, () => handleJoin());

  // 회원 이름 입력 후 엔터 콜백
  const useFindMember = useEnterKeyDownHook(form, () =>
    usePostGetMemberInfo({ name: form.name }),
  );

  // 회원 정보 조회 콜백
  const handleSetMemberInfos = (response: Array<GetMemberInfoByJoin>) => {
    setMemberInfos(response);
    setIsPopupActive(true);
  };

  // 회원 정보 클릭 콜백
  const handleClickMemberInfo = (memberInfo: GetMemberInfoByJoin) => {
    setForm((prevState) => ({
      ...prevState,
      id: memberInfo.id,
      information: `${memberInfo.degree} ${
        memberInfo.name
      } ${`${memberInfo.birthDt}`.substring(2, 4)}`,
    }));
    setIsPopupActive(false);
    setMemberInfos([]);
  };

  // admin 등록
  const handleJoin = () => {
    usePostJoin({
      id: form.id,
      memberId: form.email,
      password: form.password,
    });
  };

  return (
    <div className={styles.wrap}>
      <Header />
      {isPopupActive && (
        <div
          className={styles.background}
          onClick={() => setIsPopupActive(false)}
        >
          <ul className={styles.modalBody}>
            {memberInfos.map((memberInfo: GetMemberInfoByJoin) => (
              <li
                key={memberInfo.id}
                onClick={() => handleClickMemberInfo(memberInfo)}
              >{`${memberInfo.degree} ${
                memberInfo.name
              } ${`${memberInfo.birthDt}`.substring(2, 4)}`}</li>
            ))}
          </ul>
        </div>
      )}
      <div className={styles.innerWrap}>
        <h2>Amdin 등록</h2>
        <AuthInput
          title={'이메일'}
          label={'email'}
          value={form.email as string}
          onChange={useChange}
          onKeyDown={useJoinEnterKeyDown}
        />
        <AuthInput
          title={'비밀번호'}
          label={'password'}
          value={form.password as string}
          onChange={useChange}
          onKeyDown={useJoinEnterKeyDown}
        />
        <AuthInput
          title={'회원 정보'}
          label={'information'}
          value={`${form.information}`}
          disabled
        />
        <AuthInput
          title={'회원 이름'}
          label={'name'}
          value={`${form.name}`}
          onChange={useChange}
          onKeyDown={useFindMember}
        />
        <button onClick={handleJoin}>확인</button>
      </div>
    </div>
  );
}

interface TypeJoinIn {}

export default connect(mapStateToProps, mapDispatchToProps)(Join);
