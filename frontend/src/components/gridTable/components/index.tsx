import React from 'react';

export const levelCellRenderer = (props: any) => (
  <div dangerouslySetInnerHTML={{ __html: props.value }} />
);

export const buttonCellRenderer = (
  props: any,
  onClick: (param: any) => void,
) => <button onClick={() => onClick(props.data)}>{props.value}</button>;
