export function Radio({
  children,
  value,
  name,
  defaultChecked,
  disabled,
}: TypeRadio) {
  return (
    <label>
      <input
        type="radio"
        value={value}
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled}
      />
      {children}
    </label>
  );
}

export function RadioGroup({ label, children }: TypeRadioGroup) {
  return (
    <fieldset>
      <legend>{label}</legend>
      {children}
    </fieldset>
  );
}

interface TypeRadio {
  children: React.ReactNode;
  value: string;
  name: string;
  defaultChecked?: boolean;
  disabled?: boolean;
}

interface TypeRadioGroup {
  label: string;
  children: React.ReactNode;
}
