import { is } from 'immer/dist/internal';
import SVG from 'modules/SVG';
import React from 'react';
import styles from './CommonInput.module.scss';

function CommonInput({
  title,
  tagType,
  name,
  type,
  value,
  subName,
  subValue,
  options,
  max,
  min,
  required,
  disabled,
  isSearch,
  searchedName,
  onChange,
  onKeyDown,
  onBlur,
  onSearch,
}: TypeCommonInput): React.JSX.Element {
  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        {title}&nbsp;{required && <span className={styles.required}>*</span>}
      </div>
      <div className={styles.input}>
        {tagType === 'input' ? (
          <>
            {isSearch && searchedName && <span>{searchedName}</span>}
            <input
              name={name}
              type={type}
              value={value}
              max={max}
              min={min}
              disabled={disabled}
              onChange={onChange}
              onKeyDown={onKeyDown}
              onBlur={onBlur}
            />
            {subName !== null &&
              subName !== undefined &&
              subValue !== null &&
              subName !== undefined && (
                <input
                  name={subName}
                  type={type}
                  value={subValue}
                  max={max}
                  min={min}
                  disabled={disabled}
                  onChange={onChange}
                  onKeyDown={onKeyDown}
                  onBlur={onBlur}
                />
              )}
          </>
        ) : tagType === 'select' ? (
          <select name={name} value={value} onChange={onChange}>
            {options &&
              options.map(({ id, value, label }: any) => (
                <option key={id} value={value}>
                  {label}
                </option>
              ))}
          </select>
        ) : tagType === 'textarea' ? (
          <textarea name={name} value={value} onChange={onChange} />
        ) : null}
        {isSearch && (
          <div className={styles.search} onClick={onSearch}>
            <SVG type="search" width="15px" height="15px" />
          </div>
        )}
      </div>
    </div>
  );
}

interface TypeCommonInput {
  title: string;
  name: string;
  tagType: string;
  type?: string;
  value: string;
  subName?: string;
  subValue?: string;
  options?: any[];
  max?: number | string;
  min?: number | string;
  required?: boolean;
  disabled?: boolean;
  isSearch?: boolean;
  searchedName?: string;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onSearch?: () => void;
}

export default CommonInput;
