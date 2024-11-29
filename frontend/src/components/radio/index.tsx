import React from 'react';
import styles from './Radio.module.scss';

export function Radio({
  children,
  selectedValue,
  value,
  name,
  defaultChecked,
  disabled,
  onClick,
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
        defaultChecked={defaultChecked}
        disabled={disabled}
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
  defaultChecked?: boolean;
  disabled?: boolean;
  onClick?: (grade: string) => void;
}

interface TypeRadioGroup {
  label: string;
  children: React.ReactNode;
}
