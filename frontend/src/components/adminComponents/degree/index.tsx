import React, { useEffect, useState } from 'react';
import { PropState } from 'middlewares/configureReducer';
import { connect } from 'react-redux';
import { Action } from 'redux';
import {
  useChangeHook,
  useGetDataHook,
  usePostDataHook,
} from 'modules/customHooks';
import { GetDegreesType } from 'modules/apiTypes';
import { DOMAIN } from 'modules/constants';
import PageTitle from 'components/pageTitle';
import GridTable from 'components/gridTable';
import CommonInput from 'components/commonInput';
import UpdateInput from 'components/updateInput';
import styles from './Degree.module.scss';

function mapStateToProps(state: PropState) {
  return {};
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {};
}

function Degree({}: TypeDegree) {
  const [degrees, setDegrees] = useState<GetDegreesType[]>([]);
  const { form, setForm, useChange } = useChangeHook({
    count: 0,
    degree: '',
    description: '',
    isActive: 'N',
    newDegree: '',
    newDecription: '',
    selectedId: '',
    isInserted: false,
    isUpdated: false,
  });
  const columns = [{ field: '기수' }, { field: '설명' }];

  useEffect(() => {
    usePostDegrees();
  }, []);

  // FIXME: usePostInsertDegree successCb에서 usePostDegrees 요청시 이전 accessToken으로 요청하여 대안으로 useEffect 사용
  useEffect(() => {
    if (form.isInserted) {
      usePostDegrees();
      setForm((prevState) => ({
        ...prevState,
        isInserted: false,
      }));
    }
  }, [form.isInserted]);

  // FIXME: usePostUpdateDegree successCb에서 usePostDegrees 요청시 이전 accessToken으로 요청하여 대안으로 useEffect 사용
  useEffect(() => {
    if (form.isUpdated) {
      usePostDegrees();
      setForm((prevState) => ({
        ...prevState,
        isUpdated: false,
      }));
    }
  }, [form.isUpdated]);

  // 기수 조회
  const { useGetData: usePostDegrees } = useGetDataHook({
    url: `${DOMAIN}/api/get-degrees-for-admin`,
    successCb: (response) => {
      setDegrees(response);

      const { count } = response[0];

      setForm((prevState) => ({
        ...prevState,
        count: count + 1,
        degree: `${count + 1}기`,
      }));
    },
  });

  // 기수 추가
  const { usePostData: usePostInsertDegree } = usePostDataHook({
    url: `${DOMAIN}/api/insert-degree`,
    successCb: () => {
      setForm((prevState) => ({
        ...prevState,
        description: '',
        isInserted: true,
      }));
    },
  });

  // 기수 수정
  const { usePostData: usePostUpdateDegree } = usePostDataHook({
    url: `${DOMAIN}/api/update-degree`,
    beforeCb: () => {
      const { degree, description } = degrees.filter(
        (degree: GetDegreesType) => degree.id === form.selectedId,
      )[0];

      if (degree === form.newDegree && description === form.newDescription)
        throw new Error('변경된 내용이<br/>없습니다.');
    },
    successCb: () => {
      setForm((prevState) => ({
        ...prevState,
        isActive: 'N',
        selectedId: '',
        newDegree: '',
        newDescription: '',
        isUpdated: true,
      }));
    },
    failCb: () => {
      setForm((prevState) => ({
        ...prevState,
        isActive: 'N',
        selectedId: '',
        newDegree: '',
        newDescription: '',
      }));
    },
  });

  // 추가 버튼
  const handleInsert = () => {
    usePostInsertDegree({
      id: form.count,
      degree: form.degree,
      description: form.description,
    });
  };

  // 리스트 클릭 시 기수 수정 팝업
  const handleClickRow = (data: any) => {
    setForm((prevState) => ({
      ...prevState,
      isActive: 'Y',
      selectedId: data.id,
      newDegree: data.기수,
      newDescription: data.설명,
    }));
  };

  // 기수 수정 버튼 콜백
  const handleSubmit = () => {
    usePostUpdateDegree({
      id: form.selectedId,
      degree: form.newDegree,
      description: form.newDescription,
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
                newDegree: '',
                newDescription: '',
              }))
            }
          />
          <div className={styles.modalBody}>
            <h3>기수 수정</h3>
            <div className={styles.modalInputBox}>
              <UpdateInput
                title="기수"
                tagType="input"
                name="newDegree"
                type="text"
                value={`${form.newDegree}`}
                onChange={useChange}
              />
              <UpdateInput
                title="설명"
                tagType="textarea"
                name="newDescription"
                value={`${form.newDescription}`}
                onChange={useChange}
              />
            </div>
            <button onClick={handleSubmit}>수정</button>
          </div>
        </>
      )}
      <div className={styles.wrap}>
        <div className={styles.innerWrap}>
          <PageTitle title="기수 관리" />
          <div className={styles.contents}>
            <div className={styles.inputBox}>
              <div className={styles.inputs}>
                <div className={styles.input}>
                  <CommonInput
                    title="기수"
                    tagType="input"
                    name="degree"
                    type="text"
                    value={`${form.degree}`}
                    disabled
                    onChange={useChange}
                  />
                </div>
                <div className={styles.input}>
                  <CommonInput
                    title="설명"
                    tagType="textarea"
                    name="description"
                    value={`${form.description}`}
                    onChange={useChange}
                  />
                </div>
              </div>
            </div>
            <div className={styles.btnBox}>
              <button onClick={handleInsert}>추가</button>
            </div>
            <div className={styles.listBox}>
              <GridTable
                columns={columns}
                lists={degrees.map(({ id, degree, description }) => ({
                  id,
                  기수: degree,
                  설명: description,
                }))}
                activeDefaultColDef
                onClickRow={handleClickRow}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface TypeDegree {}

export default connect(mapStateToProps, mapDispatchToProps)(Degree);
