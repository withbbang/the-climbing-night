import React, { useEffect } from 'react';
import { PropState } from 'middlewares/configureReducer';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { useChangeHook, usePostDataHook } from 'modules/customHooks';
import { DOMAIN } from 'modules/constants';
import { useSetSelectedSidebarToken } from 'middlewares/reduxToolkits/sidebar';
import PageTitle from 'components/pageTitle';
import CommonInput from 'components/commonInput';
import styles from './InsertClimbingArea.module.scss';

function mapStateToProps(state: PropState) {
  return {};
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {
    handleSetSelectedSidebar: (selectedSidebar: string): void =>
      dispatch(useSetSelectedSidebarToken({ selectedSidebar })),
  };
}

function InsertClimbingArea({
  handleSetSelectedSidebar,
}: TypeInsertClimbingArea) {
  const { form, useChange } = useChangeHook({
    name: '',
    price: '',
    winwinYn: 'N',
    winPrice: '',
    address: '',
    description: '',
  });

  useEffect(() => {}, []);

  // 암장 등록
  const { usePostData } = usePostDataHook({
    url: `${DOMAIN}/api/insert-climbing-area`,
    beforeCb: () => {
      if (!form.name) throw new Error('암장 이름을<br/>입력해주세요.');
      if (!form.price) throw new Error('암장 가격을<br/>입력해주세요.');
      if (!form.address) throw new Error('암장 주소를<br/>입력해주세요.');
    },
    successCb: () => handleSetSelectedSidebar('update-climbing-area'),
  });

  // 확인 버튼 콜백
  const useInsertClimbingArea = () => usePostData(form);

  return (
    <div className={styles.wrap}>
      <div className={styles.innerWrap}>
        <PageTitle title="암장 추가" />
        <div className={styles.inputBox}>
          <div className={styles.inputs}>
            <div className={styles.input}>
              <CommonInput
                title="암장 이름"
                tagType="input"
                name="name"
                type="text"
                value={`${form.name}`}
                required
                onChange={useChange}
              />
            </div>
            <div className={styles.input}>
              <CommonInput
                title="가격"
                tagType="input"
                name="price"
                type="text"
                value={`${form.price}`}
                required
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
                required
                onChange={useChange}
              />
            </div>
            <div className={styles.input}>
              <CommonInput
                title="암장 설명"
                tagType="textarea"
                name="description"
                value={`${form.description}`}
                onChange={useChange}
              />
            </div>
          </div>
        </div>
        <div className={styles.btnBox}>
          <button onClick={useInsertClimbingArea}>확인</button>
        </div>
      </div>
    </div>
  );
}

interface TypeInsertClimbingArea {
  handleSetSelectedSidebar: (selectedSidebar: string) => void;
}

export default connect(mapStateToProps, mapDispatchToProps)(InsertClimbingArea);
