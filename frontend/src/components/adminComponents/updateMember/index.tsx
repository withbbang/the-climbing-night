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
import { decrypt, encrypt } from 'modules/utils';
import PageTitle from 'components/pageTitle';
import CommonInput from 'components/commonInput';
import GridTable from 'components/gridTable';
import { levelCellRenderer } from 'components/gridTable/components';
import { Radio, RadioGroup } from 'components/radio';
import styles from './UpdateMember.module.scss';

function mapStateToProps(state: PropState) {
  return {};
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {};
}

function UpdateMember({}: TypeUpdateMember) {
  const columns = [{ field: '이름' }];
  const { form, setForm, useChange } = useChangeHook({
    isActive: 'N',
    selectedId: '',
    isUpdated: false,
  });

  useEffect(() => {}, []);

  // FIXME:
  useEffect(() => {
    if (form.isUpdated) {
      setForm((prevState) => ({
        ...prevState,
        isUpdated: false,
      }));
    }
  }, [form.isUpdated]);

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
            <button>수정</button>
          </div>
        </>
      )}
      <div className={styles.wrap}>
        <div className={styles.innerWrap}>
          <PageTitle title="회원 수정" />
          <div className={styles.contents}>
            <div className={styles.btnBox}>
              <button>확인</button>
            </div>
            <div className={styles.listBox}></div>
          </div>
        </div>
      </div>
    </>
  );
}

interface TypeUpdateMember {}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateMember);
