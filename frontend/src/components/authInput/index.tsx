import React from 'react';
import { handleSetUpperCaseFirstCharacter } from 'modules/utils';
import styles from './AuthInput.module.scss';

function AuthInput({
  label,
  value,
  onChange,
  onKeyDown,
}: TypeAuthInput): React.JSX.Element {
  return (
    <div className={styles.inputDiv}>
      <span>{handleSetUpperCaseFirstCharacter(label)}</span>
      <input
        name={label.toLowerCase()}
        type={label.toLowerCase()}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

interface TypeAuthInput {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default AuthInput;
