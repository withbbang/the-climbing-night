import React from 'react';
import styles from './CommonInput.module.scss';

function CommonInput({
  title,
  tagType,
  name,
  type,
  value,
  options,
  max,
  min,
  required,
  onChange,
  onBlur,
}: TypeCommonInput): React.JSX.Element {
  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        {title}&nbsp;{required && <span className={styles.required}>*</span>}
      </div>
      <div className={styles.input}>
        {tagType === 'input' ? (
          <input
            name={name}
            type={type}
            value={value}
            max={max}
            min={min}
            onChange={onChange}
            onBlur={onBlur}
          />
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
  options?: any[];
  required?: boolean;
  max?: number | string;
  min?: number | string;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  onBlur?: () => void;
}

export default CommonInput;
