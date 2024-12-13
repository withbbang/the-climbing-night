import React, { useEffect, useState } from 'react';
import { PropState } from 'middlewares/configureReducer';
import { connect } from 'react-redux';
import { Action } from 'redux';
import {
  useChangeHook,
  useEnterKeyDownHook,
  usePostDataHook,
} from 'modules/customHooks';
import { DOMAIN } from 'modules/constants';
import { handleReturnNumberWithCommas } from 'modules/utils';
import PageTitle from 'components/pageTitle';
import CommonInput from 'components/commonInput';
import UpdateInput from 'components/updateInput';
import GridTable from 'components/gridTable';
import styles from './UpdateClimbingArea.module.scss';

function mapStateToProps(state: PropState) {
  return {};
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {};
}

function UpdateClimbingArea({}: TypeUpdateClimbingArea) {
  const [climbingAreas, setClimbingAreas] = useState<any[]>([]);
  const { form, setForm, useChange } = useChangeHook({
    /* 검색 필드 */
    name: '',
    price: '',
    winwinYn: '',
    winPrice: '',
    address: '',
    closeYn: '',
    /* 수정 필드 */
    selectedId: '',
    selectedName: '',
    selectedPrice: '',
    selectedWinwinYn: '',
    selectedWinPrice: '',
    selectedAddress: '',
    selectedCloseYn: '',
    selectedDescription: '',
    /* 변수 필드 */
    isActive: 'N',
    isUpdated: false,
  });

  const columns = [
    { field: '이름' },
    { field: '가격' },
    { field: '상생 여부' },
    { field: '상생 가격' },
    { field: '폐업 여부' },
    { field: '주소', flex: 2 },
  ];

  useEffect(() => {
    usePostClimbingAreas();
  }, []);

  // FIXME: usePostUpdateClimbingArea의 successCb에서 usePostClimbingAreas 요청시 이전 accessToken으로 요청하여 대안으로 useEffect 사용
  useEffect(() => {
    if (form.isUpdated) {
      const { name, price, winwinYn, winPrice, address, closeYn } = form;

      usePostClimbingAreas({
        name,
        price,
        winwinYn,
        winPrice,
        address,
        closeYn,
      });

      setForm((prevState) => ({
        ...prevState,
        isUpdated: false,
      }));
    }
  }, [form.isUpdated]);

  // 암장 리스트 조회
  const { usePostData: usePostClimbingAreas } = usePostDataHook({
    url: `${DOMAIN}/api/get-climbing-areas`,
    successCb: (response) => setClimbingAreas(response),
  });

  // 리스트 클릭 후 암장 정보 가져오기
  const { usePostData: usePostClimbingAreaInfo } = usePostDataHook({
    url: `${DOMAIN}/api/get-climbing-area-info`,
    successCb: (response) => {
      const {
        id,
        name,
        price,
        winwinYn,
        winPrice,
        address,
        closeYn,
        description,
      } = response;

      setForm((prevState) => ({
        ...prevState,
        selectedId: id,
        selectedName: name,
        selectedPrice: price,
        selectedWinwinYn: winwinYn,
        selectedWinPrice: winPrice,
        selectedAddress: address,
        selectedCloseYn: closeYn,
        selectedDescription: description,
        isActive: 'Y',
      }));
    },
    failCb: () =>
      setForm((prevState) => ({
        ...prevState,
        isActive: 'N',
      })),
  });

  // 암장 정보 수정
  const { usePostData: usePostUpdateClimbingArea } = usePostDataHook({
    url: `${DOMAIN}/api/update-climbing-area`,
    beforeCb: () => {
      if (!form.selectedName) throw new Error('암장 이름를<br/>입력해주세요.');
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

  // 검색
  const handleSearch = () => usePostClimbingAreas(form);

  // 이름 입력 후 엔터 콜백
  const useEnterKeyDown = useEnterKeyDownHook(form, handleSearch);

  // 리스트 클릭 시 암장 수정 팝업
  const handleClickRow = (data: any) =>
    usePostClimbingAreaInfo({
      id: data.id,
    });

  // 수정 팝업 필드 초기화
  const handleInitUpdateFields = () =>
    setForm((prevState) => ({
      ...prevState,
      selectedId: '',
      selectedName: '',
      selectedPrice: '',
      selectedWinwinYn: '',
      selectedWinPrice: '',
      selectedAddress: '',
      selectedCloseYn: '',
      selectedDescription: '',
      isActive: 'N',
    }));

  // 암장 수정 버튼 콜백
  const handleSubmit = () =>
    usePostUpdateClimbingArea({
      id: form.selectedId,
      name: form.selectedName,
      price: form.selectedPrice,
      winwinYn: form.selectedWinwinYn,
      winPrice: form.selectedWinPrice,
      address: form.selectedAddress,
      closeYn: form.selectedCloseYn,
      description: form.selectedDescription,
    });

  return (
    <>
      {form.isActive === 'Y' && (
        <>
          <div className={styles.background} onClick={handleInitUpdateFields} />
          <div className={styles.modalBody}>
            <h3>암장 수정</h3>
            <div className={styles.modalInputBox}>
              <UpdateInput
                title="이름"
                tagType="input"
                name="selectedName"
                type="text"
                value={`${form.selectedName}`}
                onChange={useChange}
              />
              <UpdateInput
                title="가격"
                tagType="input"
                name="selectedPrice"
                type="text"
                value={`${form.selectedPrice}`}
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
              <UpdateInput
                title="상생 가격"
                tagType="input"
                name="selectedWinPrice"
                type="text"
                value={`${form.selectedWinPrice}`}
                onChange={useChange}
              />
              <UpdateInput
                title="주소"
                tagType="input"
                name="selectedAddress"
                type="text"
                value={`${form.selectedAddress}`}
                onChange={useChange}
              />
              <UpdateInput
                title="폐업 여부"
                tagType="select"
                name="selectedCloseYn"
                type="select"
                value={`${form.selectedCloseYn}`}
                options={[
                  { id: 'selectedCloseYnN', value: 'N', label: 'X' },
                  { id: 'selectedCloseYnY', value: 'Y', label: 'O' },
                ]}
                onChange={useChange}
              />
              <UpdateInput
                title="암장 설명"
                tagType="textarea"
                name="selectedDescription"
                value={`${form.selectedDescription}`}
                onChange={useChange}
              />
            </div>
            <button onClick={handleSubmit}>수정</button>
          </div>
        </>
      )}
      <div className={styles.wrap}>
        <div className={styles.innerWrap}>
          <PageTitle title="암장 수정" />
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
                    title="가격"
                    tagType="input"
                    name="price"
                    type="text"
                    value={`${form.price}`}
                    onChange={useChange}
                  />
                </div>
              </div>
              <div className={styles.inputs}>
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
                <div className={styles.input}>
                  <CommonInput
                    title="상생 가격"
                    tagType="input"
                    name="winPrice"
                    type="text"
                    value={`${form.winPrice}`}
                    onChange={useChange}
                  />
                </div>
              </div>
              <div className={styles.inputs}>
                <div className={styles.input}>
                  <CommonInput
                    title="주소"
                    tagType="input"
                    name="address"
                    type="text"
                    value={`${form.address}`}
                    onChange={useChange}
                  />
                </div>
                <div className={styles.input}>
                  <CommonInput
                    title="폐업 여부"
                    tagType="select"
                    name="closeYn"
                    value={`${form.closeYn}`}
                    options={[
                      { id: 'closeYn', value: '', label: '전체' },
                      { id: 'N', value: 'N', label: 'X' },
                      { id: 'Y', value: 'Y', label: 'O' },
                    ]}
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
                list={climbingAreas.map(
                  ({
                    id,
                    name,
                    price,
                    winwinYn,
                    winPrice,
                    address,
                    closeYn,
                  }) => ({
                    id,
                    이름: name,
                    가격: `${handleReturnNumberWithCommas(price)}원`,
                    '상생 여부': winwinYn,
                    '상생 가격': `${handleReturnNumberWithCommas(winPrice)}원`,
                    주소: address,
                    '폐업 여부': closeYn,
                  }),
                )}
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

interface TypeUpdateClimbingArea {}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateClimbingArea);
