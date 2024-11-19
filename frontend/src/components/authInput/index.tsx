import React from 'react';
import { handleSetUpperCaseFirstCharacter } from 'modules/utils';
import styles from './AuthInput.module.scss';

function AuthInput({
  title,
  label,
  value,
  disabled,
  onChange,
  onKeyDown,
}: TypeAuthInput): React.JSX.Element {
  return (
    <div className={styles.inputDiv}>
      <span>{handleSetUpperCaseFirstCharacter(title)}</span>
      <input
        name={label.toLowerCase()}
        type={label.toLowerCase()}
        value={value}
        disabled={disabled}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

interface TypeAuthInput {
  title: string;
  label: string;
  value: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default AuthInput;
