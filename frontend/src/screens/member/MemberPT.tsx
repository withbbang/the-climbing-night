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
  onClickRow,
  onKeyDown,
  onSearch,
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
                  onKeyDown={onKeyDown}
                />
              </div>
              <div className={styles.input}>
                <CommonInput
                  title="기수"
                  tagType="select"
                  name="degreeFk"
                  value={`${form.degreeFk}`}
                  options={degrees.map(({ id, degree }: GetDegreesType) => ({
                    id,
                    value: id,
                    label: degree,
                  }))}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className={styles.inputs}>
              <div className={styles.input}>
                <CommonInput
                  title="가입 날짜"
                  tagType="input"
                  name="startJoinDt"
                  subName="endJoinDt"
                  type="date"
                  value={`${form.startJoinDt}`}
                  subValue={`${form.endJoinDt}`}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div className={styles.btnBox}>
            <button onClick={onSearch}>찾기</button>
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
                '올해 참여 횟수': member.count_this_year,
                '최근 1년 참석 횟수': member.count_last_1_year,
                '최근 3개월 참석 횟수': member.count_last_3_months,
              }))}
              activeDefaultColDef
              onClickRow={onClickRow}
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
  onClickRow: (data: any) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export default MemberPT;
