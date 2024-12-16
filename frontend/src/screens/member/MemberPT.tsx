/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Header from 'components/header';
import PageTitle from 'components/pageTitle';
import CommonInput from 'components/commonInput';
import GridTable from 'components/gridTable';
import { GetDegreesType } from 'modules/apiTypes';
import { TypeKeyValueForm } from 'modules/types';
import styles from './Member.module.scss';

function MemberPT({
  degrees,
  form,
  columns,
  members,
  onChange,
}: MemberPTProps): React.JSX.Element {
  return (
    <div className={styles.wrap}>
      <Header />
      <div className={styles.innerWrap}>
        <PageTitle title="회원 조회" />
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
                  onChange={onChange}
                />
              </div>
              <div className={styles.input}>
                <CommonInput
                  title="기수"
                  tagType="select"
                  name="degreeFk"
                  value={`${form.degreeFk}`}
                  options={degrees}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div className={styles.btnBox}>
            <button onClick={() => {}}>찾기</button>
          </div>
          <div className={styles.listBox}>
            <GridTable
              columns={columns}
              list={members.map((member) => ({
                ...member,
                기수: member.degree,
                이름: member.name,
                분류: member.grade,
                레벨: `${member.level}&nbsp<span style="background-color: ${member.color}; padding: 0 10px;"/>`,
                '금년 참석 횟수': '취소',
                '분기 참석 횟수': '취소',
              }))}
              activeDefaultColDef
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface MemberPTProps {
  degrees: GetDegreesType[];
  form: TypeKeyValueForm;
  columns: any[];
  members: any[];
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => void;
}

export default MemberPT;
