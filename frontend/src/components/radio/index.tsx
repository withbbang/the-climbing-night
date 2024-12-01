import React from 'react';
import styles from './Radio.module.scss';

export function Radio({
  children,
  selectedValue,
  value,
  name,
  disabled,
  onClick,
  onChange,
}: TypeRadio) {
  return (
    <label
      className={styles.radio}
      htmlFor={value}
      onClick={() => {
        if (onClick) onClick(value);
      }}
    >
      <input
        className={styles.radioInput}
        id={value}
        type="radio"
        value={value}
        name={name}
        checked={selectedValue === value}
        disabled={disabled}
        onChange={onChange}
        readOnly
      />
      {children}
    </label>
  );
}

export function RadioGroup({ label, children }: TypeRadioGroup) {
  return (
    <fieldset className={styles.radioGroup}>
      <legend className={styles.radioGroupLabel}>{label}</legend>
      {children}
    </fieldset>
  );
}

interface TypeRadio {
  children: React.ReactNode;
  selectedValue: string;
  value: string;
  name?: string;
  disabled?: boolean;
  onClick?: (grade: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface TypeRadioGroup {
  label: string;
  children: React.ReactNode;
}
