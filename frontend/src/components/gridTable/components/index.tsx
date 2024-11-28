import React from 'react';

export const levelCellRenderer = (props: any) => (
  <div dangerouslySetInnerHTML={{ __html: props.value }} />
);

export const buttonCellRenderer = (props: any, callback: () => void) => (
  <button onClick={callback}>{props.value}</button>
);
